import { Button as MUIButton, ButtonProps } from '@mui/material';

type Props = {
  variant: ButtonProps['variant'];
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  isValid?: boolean;
  action?: () => void;
};

const Button = ({ variant, children, type, isValid, action }: Props) => {
  return (
    <MUIButton
      variant={variant}
      type={type}
      disabled={isValid}
      onClick={action}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
