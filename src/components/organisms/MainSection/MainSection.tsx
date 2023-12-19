import styles from './MainSection.module.css';
import ReservationForm from '../../molecules/ReservationForm/ReservationForm';
import Button from '../../atoms/Button/Button';
import { NavLink } from 'react-router-dom';
import { PATHS } from '@/constants/paths';

const MainSection = () => {
  return (
    <>
      <section className={styles.welcomeBanner}>
        <div className={styles.welcomeBanner_welcomeContainer}>
          <img src="" alt="Ocean bar logo" />
          <h1>Your Culinary Adventure Starts Here</h1>
          <NavLink to={PATHS.MENU}>
            <Button variant="outlined">Menu</Button>
          </NavLink>
        </div>
      </section>
      <div className={styles.form_container}>
        <ReservationForm />
      </div>
      <section id="menu" className={styles.menu_container}>
        <h2>Menu</h2>
      </section>
    </>
  );
};

export default MainSection;
