import { NavLink } from 'react-router-dom';

import { PATHS } from '@/constants/paths';

import Button from '../../atoms/Button/Button';

import notFound from '@/assets/images/404.png';
import styles from './NotFoundPageSection.module.css';

const NotFoundPageSection = () => {
  return (
    <>
      <section className={styles.not_found_section}>
        <img
          className={styles.not_found_img}
          width={600}
          src={notFound}
          alt="404 Not found"
        />
        <p className={styles.not_found_paragraph}>
          Looks like this page is off exploring the digital cosmos.
        </p>
        <p className={styles.not_found_paragraph}>
          Meanwhile, how about you navigate back to the home base or grab a
          virtual snack while we search?
        </p>
        <NavLink className={styles.not_found_link} to={PATHS.ROOT}>
          <Button variant="contained">Main Page</Button>
        </NavLink>
      </section>
    </>
  );
};

export default NotFoundPageSection;
