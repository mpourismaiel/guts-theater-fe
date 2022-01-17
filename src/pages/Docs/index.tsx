import classNames from "classnames";
import Layout from "../../components/Layout";
import styles from "./Docs.module.css";

const Docs = (): JSX.Element => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.h1}>Project documentation</h1>
        <p className={classNames(styles.p, styles.info)}>
          Please note that this is the description of the project and describes
          how you can use this application. For more information, please refer
          to project <b>README.md</b> available on the{" "}
          <a href="https://github.com/mpourismaiel/guts-theater">
            Github repository
          </a>
          .
        </p>
        <h2 className={styles.h2}>What is this?</h2>
        <p className={styles.p}>
          This application is a simple client to allow access to the API, which
          is an assessment project developed for Guts Ticket.
        </p>
        <p className={styles.p}>
          The purpose of the application is primarily allow seating groups of
          customers in a theater hall which is devided into sections and ranks.
        </p>
        <p className={styles.p}>
          Each customer group can request a rank, a section and may request an
          aisle seat and the program, upon triggering the algorithm in{" "}
          <a href="/groups">Groups</a> page, will try and allocate seats to the
          customers.
        </p>
        <h2 className={styles.h2}>How it works</h2>
        <p className={styles.p}>
          In order to test the functionality of the application, you need to
          first add sections, rows and seats to the hall. You can do so by
          visiting <a href="/stage">Stage</a> page.
        </p>
        <p className={styles.p}>
          After arranging the stage, you will need to create a few groups in the{" "}
          <a href="/groups">Groups</a> page, defining their preferences and then
          clicking on the "Trigger seating algorithm" button.
        </p>
        <p className={styles.p}>
          The algorithm works in a new thread, meaning you would not receive the
          result immediately but the process is quite fast. So after a short
          while you will be seing assigned tickets if you click and expand each
          group, or copying their group id and receiving their ticket in the
          home page.
        </p>
        <p className={styles.p}>
          The algorithm works by going through each sections and assigning seats
          to each group by the order in which they were added. When a group is
          retreived, the algorithm will try to assign aisle seats to those who
          want them and in that process will also check the rank of each seat
          and if a group of seats is found that has the same properties as the
          group's preferences, it assigns that group of seats to the customers,
          creating a ticket for them in the database.
        </p>
        <p className={styles.p}>
          You can see assigned seats in the <a href="/stage">Stage</a> page and
          clicking on the "Assigned seats" button.
        </p>
      </div>
    </Layout>
  );
};

export default Docs;
