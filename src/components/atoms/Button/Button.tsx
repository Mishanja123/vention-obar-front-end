import { Button as MUIButton, ButtonProps } from '@mui/material';

type Props = {
  variant: ButtonProps['variant'];
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  isValid: boolean;
};

const Button = ({ variant, children, type, isValid }: Props) => {
  return (
    <MUIButton variant={variant} type={type} disabled={isValid}>
      {children}
    </MUIButton>
  );
};

export default Button;
