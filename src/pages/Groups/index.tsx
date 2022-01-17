import GroupsList from "../../components/GroupsList";
import Layout from "../../components/Layout";
import { triggerSeating } from "../../mutations";
import styles from "./Groups.module.css";

const Groups = (): JSX.Element => {
  const handleTrigger = () => triggerSeating();

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Customer groups</h1>
          <button className={styles.triggerSeating} onClick={handleTrigger}>
            Trigger seating algorithm
          </button>
        </div>
        <GroupsList />
      </div>
    </Layout>
  );
};

export default Groups;
