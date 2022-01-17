export type SeatsApi = {
  rows: Record<
    string,
    {
      row: RowType;
      seats: SeatType[];
    }
  >;
  section: SectionType;
}[];

export type SeatType = {
  aisle: boolean;
  broken: boolean;
  name: string;
  rank: string;
  row: string;
  section: string;
};

export type SeatData = {
  name: string;
  rank: string;
  aisle: boolean;
  broken: boolean;
};

export type RowType = {
  name: string;
  section: string;
};

export type SectionType = {
  curved: boolean;
  elevation: number;
  name: string;
};
