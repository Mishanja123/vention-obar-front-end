import { PATHS } from '@/constants/paths';
import { NavLink } from 'react-router-dom';
import ReservationForm from '../../molecules/ReservationForm/ReservationForm';
import MainMenuSection from '../MainMenuSection/MainMenuSection';
import Button from '../../atoms/Button/Button';

import styles from './MainSection.module.css';
import { useAuth } from '@/hooks/useAuth';
import MainSectionSkeleton from '@/components/molecules/MainSectionSkeleton/MainSectionSkeleton';

const MainSection = () => {
  const { isFetching } = useAuth();

  if (isFetching) {
    return <MainSectionSkeleton />;
  }

  return (
    <>
      <section className={styles.welcome_section}>
        <div className={styles.welcome_wrapper}>
          <h1 className={styles.welcome_title}>
            Your Culinary Adventure Starts Here
          </h1>
          <NavLink to={PATHS.MENU}>
            <Button variant="outlined">Menu</Button>
          </NavLink>
        </div>
      </section>
      <div id="reservationForm" className={styles.form_container}>
        <ReservationForm />
      </div>
      <MainMenuSection />
    </>
  );
};

export default MainSection;
