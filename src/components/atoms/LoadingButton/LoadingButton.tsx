import { LoadingButton } from '@mui/lab';
import { CloudUpload } from '@mui/icons-material';
import styles from './LoadingButton.module.css';

interface ILoadingButton {
  uploading: any;
  editMode: boolean;
  handleChange: (e: any) => void;
}

const LoadingButtonFC = ({
  uploading,
  editMode = false,
  handleChange,
}: ILoadingButton) => {
  return (
    <LoadingButton
      className={styles.button}
      component="label"
      variant="contained"
      startIcon={<CloudUpload />}
      loading={uploading}
      disabled={!editMode}>
      Change
      <input
        className={styles.hidden_input}
        onChange={handleChange}
        type="file"
      />
    </LoadingButton>
  );
};

export default LoadingButtonFC;
