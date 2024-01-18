import { Button as MUIButton, ButtonProps } from '@mui/material';

import styles from './Button.module.css';

type Props = {
  variant: ButtonProps['variant'];
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  isValid?: boolean;
  onClick?: () => void;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
};

const Button = ({ variant, children, type, isValid, onClick, ref }: Props) => {
  return (
    <MUIButton
      ref={ref}
      onClick={onClick}
      variant={variant}
      type={type}
      className={styles.button}
      disabled={isValid}>
      {children}
    </MUIButton>
  );
};

export default Button;
