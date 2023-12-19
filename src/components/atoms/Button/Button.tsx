import { Button as MUIButton, ButtonProps } from '@mui/material';

type Props = {
  variant: ButtonProps['variant'];
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  isValid?: boolean;
  onClick?: () => void;
};

const Button = ({ variant, children, type, isValid, onClick }: Props) => {
  return (
    <MUIButton
      onClick={onClick}
      variant={variant}
      type={type}
      disabled={isValid}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
