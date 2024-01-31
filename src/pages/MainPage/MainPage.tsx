import MenuProvider from '@/context/menuContext';

import MainSection from '../../components/organisms/MainSection/MainSection';
import { Footer } from '@/components/molecules';

import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <>
      <MenuProvider>
        <div className={styles.main_section_wrapper}>
          <MainSection />
          <Footer />
        </div>
      </MenuProvider>
    </>
  );
};

export default MainPage;
