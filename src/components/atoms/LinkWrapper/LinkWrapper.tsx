import { NavLink } from 'react-router-dom';

import styles from './LinkWrapper.module.css';

type Props = {
  to: string;
  children: React.ReactNode;
};

const LinkWrapper = ({ to, children }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? styles.active : styles.header_link_item
      }>
      {children}
    </NavLink>
  );
};

export default LinkWrapper;
