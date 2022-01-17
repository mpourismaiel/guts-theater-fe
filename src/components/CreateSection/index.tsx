import { AxiosError } from "axios";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { createSection, deleteSection, updateSection } from "../../mutations";

import Modal from "../Modal";
import SwitchInput from "../SwitchInput";
import TextInput from "../TextInput";
import styles from "./CreateSection.module.css";

type Props = {
  section?: string;
  elevation?: number;
  curved?: boolean;
  handleClose: (submitted: boolean) => void;
  isCreating: boolean;
};

const CreateSection = ({
  section,
  elevation: sectionElevation,
  curved: sectionCurved,
  isCreating,
  handleClose,
}: Props): JSX.Element => {
  const [error, setError] = useState("");
  const [name, setName] = useState(section || "");
  const [elevation, setElevation] = useState(sectionElevation || 0);
  const [curved, setCurved] = useState(sectionCurved || false);

  const handleChangeName = (value: string) => setName(value);
  const handleChangeElevation = (value: string) =>
    setElevation(parseInt(value));
  const handleChangeCurved = (value: boolean) => setCurved(value);

  const handleDelete = useCallback(
    async (e) => {
      e.preventDefault();
      if (!section) {
        return;
      }

      setError("");

      try {
        await deleteSection({ section });
        handleClose(true);
      } catch (err) {
        setError((err as AxiosError).response?.data.error);
      }
    },
    [handleClose, setError, section]
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
        if (isCreating) {
          await createSection({ section: name, elevation, curved });
        } else {
          await updateSection({ section: name, elevation, curved });
        }
        handleClose(true);
      } catch (err) {
        setError((err as AxiosError).response?.data.error);
      }
    },
    [handleClose, setError, name, elevation, isCreating, curved]
  );

  return (
    <Modal title="Create new seat">
      {error ? <p className={styles.error}>{error}</p> : null}
      <form className={styles.container} onSubmit={handleSubmit}>
        <TextInput
          label="Section name"
          name="name"
          disabled={!isCreating}
          value={name}
          setValue={handleChangeName}
        />
        <TextInput
          label="Elevation"
          name="elevation"
          value={elevation}
          setValue={handleChangeElevation}
        />
        <SwitchInput
          label="Curved"
          name="curved"
          value={curved}
          setValue={handleChangeCurved}
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

export default CreateSection;
