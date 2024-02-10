import { NavLink, Outlet } from 'react-router-dom';

import { PATHS } from '@/constants/paths';
import { Button } from '@/components/atoms/index.ts';

import styles from './AdminPage.module.css';
import logo from '@/assets/images/logo.svg';
import { logout } from '@/store/auth/operations';

import { RootState, TypedDispatch } from '@/store/store';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

const AdminPage = () => {
  const dispatch = useDispatch<TypedDispatch<RootState>>();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#182715',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
      }
    });
  };
  return (
    <section className={styles.admin_section}>
      <header>
        <nav className={styles.admin_navigation}>
          <NavLink to={PATHS.ROOT}>
            <img
              src={logo}
              alt="logo"
              width={100}
              style={{ borderRadius: 20 }}
            />
          </NavLink>
          <ul className={styles.admin_navigation_list}>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : '')}
                to={PATHS.DISHMANAGEMENT}>
                Dish management
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : '')}
                to={PATHS.USERMANAGEMENT}>
                User management
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : '')}
                to={PATHS.ORDERSMANAGEMENT}>
                Orders management
              </NavLink>
            </li>
            <li>
              <Button variant="contained" onClick={handleLogout}>
                Log out
              </Button>
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
