import styles from './Footer.module.css';

const Footer = () => {
  return (
    <>
      <div className={styles.contact_box}>
        <h3 className={styles.footer_heading}>Contacts</h3>
        <p className={styles.address}>Prosta 67, 00-838 Warszawa</p>
        <span>Icon</span>
        <p className={styles.phone_number}>+48 60 503 62 26 </p>
        <span>Icon</span>
        <p className={styles.time}>Mon - Sun 08:00 - 23:00</p>
        <button className={styles.reservation_btn}>Make a reservation</button>
      </div>
      <div className={styles.map_box}>here gonna be map</div>
    </>
  );
};

export default Footer;
