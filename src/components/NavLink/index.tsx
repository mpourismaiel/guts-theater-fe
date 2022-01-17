import classNames from "classnames";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

import styles from "./NavLink.module.css";

const NavLink = ({ children, to, ...props }: LinkProps): JSX.Element => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      className={classNames(styles.link, { [styles.active]: match })}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
