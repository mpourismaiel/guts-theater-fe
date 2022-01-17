import { AxiosError } from "axios";
import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
import { createGroup } from "../../mutations";

import Modal from "../Modal";
import SelectInput from "../SelectInput";
import SwitchInput from "../SwitchInput";
import TextInput from "../TextInput";
import styles from "./CreateGroup.module.css";

type Props = {
  sections: string[];
  handleClose: (submitted: boolean) => void;
};

const CreateGroup = ({ sections, handleClose }: Props): JSX.Element => {
  const [error, setError] = useState("");
  const [aisle, setAisle] = useState(false);
  const [count, setCount] = useState(0);
  const [rank, setRank] = useState("");
  const [section, setSection] = useState("");

  const handleChangeAisle = (value: boolean) => setAisle(value);
  const handleChangeCount = (value: string) => setCount(parseInt(value));
  const handleChangeRank = (value: string) => setRank(value);
  const handleChangeSection = (value: string) => setSection(value);

  const sectionsMemo = useMemo(
    () =>
      sections.reduce((acc, section) => ({ ...acc, [section]: section }), {
        "": "----",
      }),
    [sections]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      if (!section) {
        setError("Please select a section");
        return;
      }

      if (count === 0) {
        setError("Please choose a count higher that 0");
        return;
      }

      try {
        await createGroup({ aisle, count, rank, section });
        handleClose(true);
      } catch (err) {
        setError((err as AxiosError).response?.data.error);
      }
    },
    [handleClose, setError, section, count, aisle, rank]
  );

  return (
    <Modal title="Create new seat">
      {error ? <p className={styles.error}>{error}</p> : null}
      <form className={styles.container} onSubmit={handleSubmit}>
        <SelectInput
          label="Section"
          name="section"
          value={section}
          setValue={handleChangeSection}
          options={sectionsMemo}
        />
        <SelectInput
          label="Rank"
          name="rank"
          value={rank}
          setValue={handleChangeRank}
          options={{
            "": "----",
            plat: "Platinum",
            gold: "Gold",
            silver: "Silver",
          }}
        />
        <TextInput
          label="Count"
          name="number"
          value={count}
          setValue={handleChangeCount}
        />
        <SwitchInput
          label="Requests aisle"
          name="aisle"
          setValue={handleChangeAisle}
          value={aisle}
        />
        <div className={styles.actions}>
          <button
            className={classNames(styles.button, styles.close)}
            onClick={() => handleClose(false)}
          >
            Close
          </button>
          <button
            className={classNames(styles.button, styles.submit)}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateGroup;
