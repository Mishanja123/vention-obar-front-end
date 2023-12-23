import { PATHS } from '@/constants/paths';
import { NavLink } from 'react-router-dom';
import ReservationForm from '../../molecules/ReservationForm/ReservationForm';
import MainMenuSection from '../MainMenuSection/MainMenuSection';
import Button from '../../atoms/Button/Button';

import styles from './MainSection.module.css';

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
      <MainMenuSection />
    </>
  );
};

export default MainSection;
