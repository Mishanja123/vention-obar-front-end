import MainSection from '../../components/organisms/MainSection/MainSection';
import Header from '../../components/molecules/Header/Header.tsx';
import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <>
      {/* Header (OB-24 Ticket) */}
      <Header />
      <MainSection />
      {/* Footer (OB-25 Ticket) */}
    </>
  );
};

export default MainPage;
