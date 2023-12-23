import Button from '../../atoms/Button/Button';
import { NavLink } from 'react-router-dom';
import { PATHS } from '@/constants/paths';

import styles from './NotFoundPageSection.module.css';
const NotFoundPageSection = () => {
  return (
    <>
      <section className={styles.not_found_section}>
        <img
          className={styles.not_found_img}
          src="https://placehold.jp/150x150.png"
          alt="404 Not found"
        />
        <h1 className={styles.not_found_heading}>PAGE NOT FOUND</h1>
        <p className={styles.not_found_paragraph}>
          Looks like this page is off exploring the digital cosmos. Meanwhile,
          how about you navigate back to the home base or grab a virtual snack
          while we search?
        </p>
        <NavLink className={styles.not_found_link} to={PATHS.ROOT}>
          <Button variant="contained">Main Page</Button>
        </NavLink>
      </section>
    </>
  );
};

export default NotFoundPageSection;
