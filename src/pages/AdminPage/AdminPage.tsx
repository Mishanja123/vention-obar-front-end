import { NavLink, Outlet } from 'react-router-dom';

import { PATHS } from '@/constants/paths';
import { Button } from '@/components/atoms/index.ts';

import styles from './AdminPage.module.css';
import logo from '@/assets/images/logo.svg';

const AdminPage = () => {
  return (
    <section className={styles.admin_section}>
      <header>
        <nav className={styles.admin_navigation}>
          <img src={logo} alt="logo" width={100} style={{ borderRadius: 20 }} />
          <ul className={styles.admin_navigation_list}>
            <li>
              <NavLink to={PATHS.DISHMANAGEMENT}>Dish management</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.USERMANAGEMENT}>User management</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.ORDERSMANAGEMENT}>Orders management</NavLink>
            </li>
            <li>
              <Button variant="contained">Log out</Button>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles.admin_wrapper}>
        <Outlet />
      </div>
    </section>
  );
};

export default AdminPage;
