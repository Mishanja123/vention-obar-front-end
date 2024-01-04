import { PATHS } from '@/constants/paths';
import { IconContext } from 'react-icons';
import { SiIfood } from 'react-icons/si';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './AuthPage.module.css';
// import { LoginForm, RegistrationForm } from '@/components/molecules';
const AuthPage = () => {
  return (
    <section className={styles.auth_section}>
      <NavLink to={PATHS.ROOT} className={styles.logo_link}>
        OBar
        <IconContext.Provider value={{ className: styles.logo_img }}>
          <SiIfood />
        </IconContext.Provider>
      </NavLink>
      <div className={styles.auth_wrapper}>
        <Outlet />
      </div>
    </section>
  );
};

export default AuthPage;
