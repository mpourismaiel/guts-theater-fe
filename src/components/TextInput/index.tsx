import styles from "./TextInput.module.css";

type Props = {
  label: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  type?: "text" | "number";
  value: string | number;
  setValue: (value: string) => void;
};

const TextInput = ({
  label,
  name,
  disabled,
  placeholder,
  type = "text",
  value,
  setValue,
}: Props): JSX.Element => {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
