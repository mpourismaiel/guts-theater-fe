import Layout from "../../components/Layout";
import Seats from "../../components/Seats";
import styles from "./Stage.module.css";

const Stage = (): JSX.Element => {
  return (
    <Layout>
      <div className={styles.hall}>
        <h1 className={styles.title}>Stage</h1>
        <Seats />
      </div>
    </Layout>
  );
};

export default Stage;
