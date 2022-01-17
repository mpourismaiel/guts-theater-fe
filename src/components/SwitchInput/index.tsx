import classNames from "classnames";
import { useCallback } from "react";
import styles from "./SwitchInput.module.css";

type Props = {
  name: string;
  label: string;
  value: boolean;
  setValue: (v: boolean) => void;
};

const SwitchInput = ({ name, label, value, setValue }: Props): JSX.Element => {
  const handleChange = useCallback(() => setValue(!value), [value, setValue]);

  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <input
        type="checkbox"
        name={name}
        onChange={handleChange}
        checked={value}
      />
    </div>
  );
};

export default SwitchInput;
