import { AxiosError } from "axios";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { createRow, deleteRow } from "../../mutations";

import Modal from "../Modal";
import TextInput from "../TextInput";
import styles from "./CreateRow.module.css";

type Props = {
  section: string;
  rowName?: string;
  handleClose: (submitted: boolean) => void;
  isCreating: boolean;
};

const CreateRow = ({
  rowName,
  section,
  isCreating,
  handleClose,
}: Props): JSX.Element => {
  const [error, setError] = useState("");
  const [name, setName] = useState(rowName || "");

  const handleChangeName = (value: string) => setName(value);

  const handleDelete = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      try {
        await deleteRow({ section, row: name });
        handleClose(true);
      } catch (err) {
        setError((err as AxiosError).response?.data.error);
      }
    },
    [handleClose, setError, section, name]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      if (!name) {
        setError("Please provide a name");
        return;
      }

      try {
        await createRow({ section, row: name });
        handleClose(true);
      } catch (err) {
        setError((err as AxiosError).response?.data.error);
      }
    },
    [handleClose, setError, section, name]
  );

  return (
    <Modal title="Create new seat">
      <div className={styles.details}>
        <h3 className={styles.detail}>
          <span className={styles.label}>Section:</span>
          <span className={styles.value}>{section}</span>
        </h3>
      </div>
      {error ? <p className={styles.error}>{error}</p> : null}
      <form className={styles.container} onSubmit={handleSubmit}>
        <TextInput
          label="Row name"
          name="name"
          disabled={!isCreating}
          value={name}
          setValue={handleChangeName}
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
          {isCreating && (
            <button
              className={classNames(styles.button, styles.submit)}
              type="submit"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default CreateRow;
