import styles from "./TextInput.module.css";

type Props = {
  label: string;
  name: string;
  options: Record<string, string>;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
};

const SelectInput = ({
  label,
  name,
  options,
  placeholder,
  value,
  setValue,
}: Props): JSX.Element => {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {Object.keys(options).map((option) => (
          <option key={option} value={option}>
            {options[option]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
