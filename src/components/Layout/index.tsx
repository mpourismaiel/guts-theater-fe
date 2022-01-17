import { Props } from "./@types";
import styles from "./Layout.module.css";

const Layout = ({ children }: Props): JSX.Element => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
