import styles from "./Modal.module.css";

type Props = {
  children: JSX.Element | (JSX.Element | null)[] | null;
  title: string;
};

const Modal = ({ children, title }: Props): JSX.Element => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Modal;
