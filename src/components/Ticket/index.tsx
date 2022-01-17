import useSWR from "swr";
import type { TicketApi } from "../../@types";
import styles from "./Ticket.module.css";

type Props = {
  groupId: string;
};

const Ticket = ({ groupId }: Props): JSX.Element => {
  const { data, error } = useSWR<TicketApi>(`/ticket/${groupId}`);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!data) {
    return <p className={styles.loading}>Loading...</p>;
  }

  return (
    <>
      <h3 className={styles.title}>Tickets</h3>
      <div className={styles.ticket}>
        {data.seats === null && (
          <p className={styles.noTickets}>No tickets have been generated</p>
        )}
        {(data.seats || []).map((seat) => (
          <div className={styles.seat} key={seat}>
            <div className={styles.info}>
              <span className={styles.label}>Row</span>
              <span className={styles.value}>
                {seat.match(/^section:[^:]+:row:([^:]+):seat:([^:]+)$/)?.[1]}
              </span>
            </div>
            <div className={styles.info}>
              <span className={styles.label}>Seat</span>
              <span className={styles.value}>
                {seat.match(/^section:[^:]+:row:([^:]+):seat:([^:]+)$/)?.[2]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Ticket;
