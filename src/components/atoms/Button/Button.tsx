import { Button as MUIButton, ButtonProps } from "@mui/material";

type Props = {
  variant: ButtonProps["variant"];
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button = ({ variant, children, type }: Props) => {
  return (
    <MUIButton variant={variant} type={type}>
      {children}
    </MUIButton>
  );
};

export default Button;
