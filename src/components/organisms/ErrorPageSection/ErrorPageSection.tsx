import Button from '../../atoms/Button/Button';

import styles from './ErrorPageSection.module.css';
import error from '@/assets/images/error.png';

const ErrorPageSection: React.FC = () => {
  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <section className={styles.error_section}>
      <img className={styles.error_img} src={error} alt="Error" width={400} />
      <h1 className={styles.error_heading}>Oops! Something went wrong.</h1>
      <p className={styles.error_paragraph}>
        We encountered an issue while processing your request. Don't worry, our
        team is already on it. Please try again later.
      </p>
      <Button variant="contained" onClick={handleRefreshClick}>
        Refresh
      </Button>
    </section>
  );
};

export default ErrorPageSection;
