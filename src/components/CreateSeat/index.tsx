import { AxiosError } from "axios";
import classNames from "classnames";
import { useCallback, useState } from "react";

import type { SeatData } from "../../@types";
import { createSeat, deleteSeat, updateSeat } from "../../mutations";
import Modal from "../Modal";
import SelectInput from "../SelectInput";
import SwitchInput from "../SwitchInput";
import TextInput from "../TextInput";
import styles from "./CreateSeat.module.css";

type Props = {
  section: string;
  row: string;
  handleClose: (submitted: boolean) => void;
  isCreating: boolean;
  seatData?: SeatData;
};

const CreateSeat = ({
  row,
  section,
  seatData,
  isCreating,
  handleClose,
}: Props): JSX.Element => {
  const [error, setError] = useState("");
  const [name, setName] = useState(seatData?.name || "");
  const [rank, setRank] = useState(seatData?.rank || "");
  const [aisle, setAisle] = useState(seatData?.aisle || false);
  const [broken, setBroken] = useState(seatData?.broken || false);

  const handleChangeName = (value: string) => setName(value);
  const handleChangeRank = (value: string) => setRank(value);
  const handleChangeAisle = (value: boolean) => setAisle(value);
  const handleChangeBroken = (value: boolean) => setBroken(value);

  const handleDelete = useCallback(async () => {
    try {
      await deleteSeat({ section, row, name });
      handleClose(true);
    } catch (err) {
      setError((err as AxiosError).response?.data.error);
    }
  }, [handleClose, setError, section, row, name]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      if (!name) {
        setError("Please provide a name");
        return;
      }

      try {
        if (isCreating) {
          await createSeat({ section, row, name, rank, broken, aisle });
        } else {
          await updateSeat({ section, row, name, rank, broken, aisle });
        }
        handleClose(true);
      } catch (err) {
        setError((err as AxiosError).response?.data.error);
      }
    },
    [handleClose, setError, row, section, name, rank, aisle, broken, isCreating]
  );

  return (
    <Modal title="Create new seat">
      <div className={styles.details}>
        <h3 className={styles.detail}>
          <span className={styles.label}>Section:</span>
          <span className={styles.value}>{section}</span>
        </h3>
        <h3 className={styles.detail}>
          <span className={styles.label}>Row:</span>
          <span className={styles.value}>{row}</span>
        </h3>
      </div>
      {error ? <p className={styles.error}>{error}</p> : null}
      <form className={styles.container} onSubmit={handleSubmit}>
        <TextInput
          label="Seat name"
          name="name"
          disabled={!isCreating}
          value={name}
          setValue={handleChangeName}
        />
        <SelectInput
          label="Seat rank"
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
        <SwitchInput
          label="Aisle"
          name="aisle"
          value={aisle}
          setValue={handleChangeAisle}
        />
        <SwitchInput
          label="Broken"
          name="broken"
          value={broken}
          setValue={handleChangeBroken}
        />
        <div className={styles.actions}>
          <button
            className={classNames(styles.button, styles.close)}
            onClick={() => handleClose(false)}
          >
            Close
          </button>
          {!isCreating && (
            <button
              className={classNames(styles.button, styles.delete)}
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
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

export default CreateSeat;
