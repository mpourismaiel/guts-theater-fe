import Layout from "../Layout";
import NavLink from "../NavLink";
import styles from "./Header.module.css";

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <Layout>
        <div className={styles.wrapper}>
          <h1 className={styles.logo}>Guts Test Project</h1>
          <ul className={styles.links}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/docs">Docs</NavLink>
            <NavLink to="/stage">Stage</NavLink>
            <NavLink to="/groups">Groups</NavLink>
          </ul>
        </div>
      </Layout>
    </header>
  );
};

export default Header;
