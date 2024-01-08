import { PATHS } from '@/constants/paths';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './AuthPage.module.css';
import logo from '@/assets/images/logo.svg';

const AuthPage = () => {
  return (
    <section className={styles.auth_section}>
      <NavLink to={PATHS.ROOT} className={styles.logo_link}>
        <img src={logo} alt="logo" width={400} style={{ borderRadius: 20 }} />
      </NavLink>
      <div className={styles.auth_wrapper}>
        <Outlet />
      </div>
    </section>
  );
};

export default AuthPage;
