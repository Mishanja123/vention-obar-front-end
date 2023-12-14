import ReservationForm from "../../components/molecules/ReservationForm/ReservationForm";
import Button from "../../components/atoms/Button/Button";
import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <>
      {/* Header (OB-24 Ticket) */}
      <section className={styles.welcomeBanner}>
        <div className={styles.welcomeBanner_welcomeContainer}>
          <img src="" alt="Ocean bar logo" />
          <h1>Your Culinary Adventure Starts Here</h1>
          <Button variant="outlined">Menu</Button>
        </div>
      </section>
      <div className={styles.form_container}>
        <ReservationForm />
      </div>
      <section id="menu" className={styles.menu_container}>
        <h2>Menu</h2>
      </section>
      {/* Footer (OB-25 Ticket) */}
    </>
  );
};

export default MainPage;
