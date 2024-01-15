import { FaPhone } from 'react-icons/fa6';
import { BsClockHistory } from 'react-icons/bs';
import { scrollToReservationForm } from '@/helpers/scrollToReservation';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contact_box}>
        <h3 className={styles.footer_heading}>Contacts</h3>
        <p className={styles.address}>Prosta 67, 00-838 Warszawa</p>
        <p className={styles.footer_paragraph}>
          <span className={styles.icon_span}>
            <FaPhone />
          </span>
          +48 60 503 62 26
        </p>
        <p className={styles.footer_paragraph}>
          <span className={styles.icon_span}>
            <BsClockHistory />
          </span>
          Mon - Sun 08:00 - 23:00
        </p>
        <button
          className={styles.reservation_btn}
          onClick={scrollToReservationForm}>
          Make a reservation
        </button>
      </div>
      <div className={styles.map_box}>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2443.7609971178063!2d20.9812698!3d52.2295599!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc9b0da23989%3A0x8b99449491e81456!2sProsta%2067%2C%2000-838%20Warszawa!5e0!3m2!1sru!2spl!4v1703200549259!5m2!1sru!2spl"
          className={styles.map}
          loading="lazy"></iframe>
      </div>
    </footer>
  );
};

export default Footer;
