import axios, { AxiosResponse } from "axios";

export const fetcher = (url: string): Promise<AxiosResponse["data"]> =>
  axios.get(`${process.env.REACT_APP_API_URL}${url}`).then((res) => res.data);
