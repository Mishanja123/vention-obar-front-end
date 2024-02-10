import { NavLink } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { PATHS } from '@/constants/paths';

import MainSectionSkeleton from '@/components/molecules/MainSectionSkeleton/MainSectionSkeleton';
import { ReservationForm } from '@/components/molecules';
import MainMenuSection from '../MainMenuSection/MainMenuSection';
import { Button } from '@/components/atoms';

import styles from './MainSection.module.css';

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
