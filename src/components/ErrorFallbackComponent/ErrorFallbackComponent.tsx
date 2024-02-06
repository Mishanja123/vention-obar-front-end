import styles from './ErrorFallBackComponent.module.css';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import ErrorImage from '../../assets/images/error-state.png';
import { Button } from '../atoms';
//@ts-ignore
const ErrorFallbackComponent = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  const handleReset = () => {
    navigate(PATHS.ROOT);
    resetErrorBoundary();
  };

  return (
    <div className={styles.container}>
      <img src={ErrorImage} alt="unexpected error" />
      <h1>Ooops! Something went wrong...</h1>
      <p>
        Our team is already notified and working hard to solve the issue.
        Please, be patient
      </p>
      <Button variant="contained" onClick={handleReset}>
        Home
      </Button>
    </div>
  );
};

export default ErrorFallbackComponent;
