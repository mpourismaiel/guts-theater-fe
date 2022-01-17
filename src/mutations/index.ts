import axiosGlobal, { AxiosResponse } from "axios";

import type { SeatData } from "../@types";

const axios = axiosGlobal.create({
  baseURL: "http://localhost:4000",
});

type SeatMutationData = SeatData & {
  section: string;
  row: string;
};

type RowMutationData = {
  section: string;
  row: string;
};

type SectionMutationData = {
  section: string;
  elevation: number;
  curved: boolean;
};

export const deleteSeat = ({
  section,
  row,
  name,
}: Pick<
  SeatMutationData,
  "section" | "row" | "name"
>): Promise<AxiosResponse> =>
  axios.delete(`/section/${section}/row/${row}/seat/${name}`);

export const createSeat = ({
  section,
  row,
  ...data
}: SeatMutationData): Promise<AxiosResponse> =>
  axios.post(`/section/${section}/row/${row}/seat`, [data]);

export const updateSeat = ({
  section,
  row,
  ...data
}: SeatMutationData): Promise<AxiosResponse> =>
  axios.put(`/section/${section}/row/${row}/seat/${data.name}`, data);

export const deleteRow = ({
  section,
  row,
}: RowMutationData): Promise<AxiosResponse> =>
  axios.delete(`/section/${section}/row/${row}`);

export const createRow = ({
  section,
  row,
}: RowMutationData): Promise<AxiosResponse> =>
  axios.post(`/section/${section}/row`, { name: row });

export const createSection = ({
  curved,
  elevation,
  section,
}: SectionMutationData): Promise<AxiosResponse> =>
  axios.post(`/section`, { name: section, elevation, curved });

export const deleteSection = ({
  section,
}: Pick<SectionMutationData, "section">): Promise<AxiosResponse> =>
  axios.delete(`/section/${section}`);

export const updateSection = ({
  elevation,
  section,
  curved,
}: SectionMutationData): Promise<AxiosResponse> =>
  axios.put(`/section/${section}`, { name: section, elevation, curved });
