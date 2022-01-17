import classNames from "classnames";
import { useCallback, useState } from "react";
import useSWR from "swr";

import type { SeatData, SeatsApi, SeatType } from "../../@types";
import CreateRow from "../CreateRow";
import CreateSeat from "../CreateSeat";
import CreateSection from "../CreateSection";
import styles from "./Seats.module.css";

type CreatingSeatInfo = {
  section: string;
  row: string;
  isCreating: boolean;
  seatData?: SeatData;
};

type CreatingRowInfo = {
  section: string;
  rowName?: string;
  isCreating: boolean;
};

type CreatingSectionInfo = {
  section?: string;
  elevation?: number;
  curved?: boolean;
  isCreating: boolean;
};

const Seats = (): JSX.Element => {
  const [creatingSeat, setCreatingSeat] = useState<CreatingSeatInfo | null>(
    null
  );
  const [creatingRow, setCreatingRow] = useState<CreatingRowInfo | null>(null);
  const [creatingSection, setCreatingSection] =
    useState<CreatingSectionInfo | null>(null);
  const { data, error, mutate } = useSWR<SeatsApi>("/seats");

  const handleCreatedRow = useCallback(
    (submitted: boolean) => {
      setCreatingRow(null);

      if (submitted) {
        mutate([]);
      }
    },
    [setCreatingRow, mutate]
  );

  const handleCreatedSection = useCallback(
    (submitted: boolean) => {
      setCreatingSection(null);

      if (submitted) {
        mutate([]);
      }
    },
    [setCreatingSection, mutate]
  );

  const handleCreatedSeat = useCallback(
    (submitted: boolean) => {
      setCreatingSeat(null);

      if (submitted) {
        mutate([]);
      }
    },
    [setCreatingSeat, mutate]
  );

  const handleCreateSection = useCallback(() => {
    setCreatingSection({ isCreating: true });
  }, [setCreatingSection]);

  const handleUpdateSection = useCallback(
    (section: string, elevation: number, curved: boolean) => () => {
      setCreatingSection({ section, elevation, curved, isCreating: false });
    },
    [setCreatingSection]
  );

  const handleCreateRow = useCallback(
    (section: string) => () => {
      setCreatingRow({ section, isCreating: true });
    },
    [setCreatingRow]
  );

  const handleUpdateRow = useCallback(
    (section: string, row: string) => () => {
      setCreatingRow({ section, rowName: row, isCreating: false });
    },
    [setCreatingRow]
  );

  const handleCreateSeat = useCallback(
    (section: string, row: string) => () => {
      setCreatingSeat({ row, section, isCreating: true });
    },
    [setCreatingSeat]
  );

  const handleUpdateSeat = useCallback(
    (section: string, row: string, seat: SeatType) => () => {
      setCreatingSeat({
        row,
        section,
        isCreating: false,
        seatData: {
          aisle: seat.aisle,
          broken: seat.broken,
          name: seat.name,
          rank: seat.rank,
        },
      });
    },
    [setCreatingSeat]
  );

  if (error) {
    return <h2>Could not load data</h2>;
  }

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.container}>
      {data.map(({ section, rows }) => (
        <div
          className={classNames(styles.section, {
            [styles.curved]: section.curved,
          })}
          key={`section-${section.name}`}
        >
          <div className={styles.sectionTitleContainer}>
            <h4 className={styles.sectionTitle}>
              {`${section.name} (Elevation: ${section.elevation})`}
            </h4>
            <button
              className={styles.editSection}
              onClick={handleUpdateSection(
                section.name,
                section.elevation,
                section.curved
              )}
            >
              (edit)
            </button>
          </div>
          {Object.values(rows).map(({ row, seats }) => (
            <div className={styles.row} key={`row-${row.name}`}>
              <button
                className={styles.editRow}
                onClick={handleUpdateRow(section.name, row.name)}
              >
                {row.name}
              </button>
              <div className={styles.seats}>
                {(seats || []).length === 0 && (
                  <span className={styles.noSeats}>No seats</span>
                )}
                {(seats || []).map((seat) => (
                  <div
                    key={`seat-${seat.name}`}
                    onClick={handleUpdateSeat(section.name, row.name, seat)}
                    className={classNames(
                      styles.seat,
                      styles[`${seat.rank}Rank`],
                      {
                        [styles.blocked]: seat.broken,
                        [styles.aisle]: seat.aisle,
                      }
                    )}
                  >
                    {seat.name}
                  </div>
                ))}
              </div>
              <button
                className={styles.createSeat}
                onClick={handleCreateSeat(section.name, row.name)}
              >
                +
              </button>
            </div>
          ))}
          <button
            className={styles.createRow}
            onClick={handleCreateRow(section.name)}
          >
            + Create new row
          </button>
        </div>
      ))}
      <button className={styles.createSection} onClick={handleCreateSection}>
        + Create new section
      </button>
      {!!creatingSeat && (
        <CreateSeat handleClose={handleCreatedSeat} {...creatingSeat} />
      )}
      {!!creatingRow && (
        <CreateRow handleClose={handleCreatedRow} {...creatingRow} />
      )}
      {!!creatingSection && (
        <CreateSection
          handleClose={handleCreatedSection}
          {...creatingSection}
        />
      )}
    </div>
  );
};

export default Seats;
