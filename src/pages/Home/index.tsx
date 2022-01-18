import { useCallback, useState } from "react";
import Layout from "../../components/Layout";
import TextInput from "../../components/TextInput";
import Ticket from "../../components/Ticket";
import styles from "./Home.module.css";

const Home = (): JSX.Element => {
  const [groupId, setGroupId] = useState("");
  const [searching, setSearching] = useState("");

  const handleGroupIdChange = (value: string) => setGroupId(value);

  const fetchTicket = useCallback(
    (e) => {
      e.preventDefault();
      setSearching(groupId);
    },
    [setSearching, groupId]
  );

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.card}>
          <form onSubmit={fetchTicket}>
            <TextInput
              label="Group token"
              name="token"
              setValue={handleGroupIdChange}
              value={groupId}
              placeholder="You can use tokens from Groups page"
            />
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
          {searching && <Ticket groupId={`group:${groupId}`} />}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
