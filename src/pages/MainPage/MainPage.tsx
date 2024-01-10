import { Footer } from '@/components/molecules';
import MainSection from '../../components/organisms/MainSection/MainSection';

import styles from './MainPage.module.css';
const MainPage = () => {
  return (
    <>
      <div className={styles.main_section_wrapper}>
        <MainSection />
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
