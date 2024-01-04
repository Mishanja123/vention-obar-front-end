import { PATHS } from '@/constants/paths';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

type ButtonConfig = {
  [key: string]: {
    firstButton: string;
    secondButton: string;
    firstButtonLink: string;
    secondButtonLink: string;
    onClick?: () => void;
  };
};

const useSummaryButton = ({ path }: { path: string }) => {
  const navigate = useNavigate();

  const buttonConfig: ButtonConfig = {
    [PATHS.ORDER_CONFIRMATION]: {
      firstButton: 'Confirm',
      secondButton: 'Change order type',
      firstButtonLink: PATHS.ORDER_PAYMENT,
      secondButtonLink: PATHS.CHECKOUT,
    },
    [PATHS.ORDER_PAYMENT]: {
      firstButton: 'Pay $200 online',
      secondButton: 'I’ll pay on the spot',
      firstButtonLink: PATHS.ORDER_PAYMENT,
      secondButtonLink: PATHS.ORDER_PAYMENT,
      onClick: () => {
        Swal.fire({
          title: 'Dear First Name!',
          html: `
            <p>Big thanks for choosing us! We're really grateful you stopped by. Your support means a lot, and we're thrilled to have you dine with us. Looking forward to serving you again soon and making your experience even better.</p>
            <p>Cheers, OceanBar Team</p>
          `,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Main Page',
        }).then(() => {
          navigate(PATHS.ROOT);
        });
      },
    },
    default: {
      firstButton: 'Proceed',
      secondButton: 'Cancel',
      firstButtonLink: PATHS.ORDER_CONFIRMATION,
      secondButtonLink: PATHS.CART,
    },
  };

  const matchingPaths = Object.keys(buttonConfig).filter((key) =>
    path.includes(key),
  );
  const config = buttonConfig[matchingPaths[0]] || buttonConfig.default;

  return {
    firstButton: config.firstButton,
    secondButton: config.secondButton,
    firstButtonLink: config.firstButtonLink,
    secondButtonLink: config.secondButtonLink,
    onClick: config.onClick,
  };
};

export default useSummaryButton;
