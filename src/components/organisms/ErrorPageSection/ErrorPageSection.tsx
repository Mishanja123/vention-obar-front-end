import Button from '../../atoms/Button/Button';

import styles from './ErrorPageSection.module.css';

type ErrorPageSectionProps = {
  errorCode?: number;
  errorMessage?: string;
};

const ErrorPageSection: React.FC<ErrorPageSectionProps> = ({
  errorCode,
  errorMessage,
}) => {
  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <section className={styles.error_section}>
      <img
        className={styles.error_img}
        src="https://placehold.jp/180x150.png"
        alt="Error"
      />
      <h1 className={styles.error_heading}>
        Whoops, something went wrong with status: {errorCode}
      </h1>
      <p className={styles.error_paragraph}>
        error message: Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quibusdam, duc{errorMessage}
      </p>
      <Button variant="contained" onClick={handleRefreshClick}>
        Refresh
      </Button>
    </section>
  );
};

export default ErrorPageSection;
