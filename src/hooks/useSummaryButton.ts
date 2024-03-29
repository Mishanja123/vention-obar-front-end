import { PATHS } from '@/constants/paths';
import { useCheckoutContext } from '@/context/checkoutContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from './useAuth';
import { useCartContext } from '@/context/cartContext';
type ButtonConfig = {
  [key: string]: {
    firstButton: string;
    secondButton: string;
    firstButtonLink: string;
    secondButtonLink: string;
    onClickFirstButton: () => void;
    onClickSecondButton: () => void;
    disabled?: boolean;
  };
};

const useSummaryButton = ({ path }: { path: string }) => {
  const { handleDeleteOrder, handlePaymentOrder } = useCheckoutContext();
  const { cartItems } = useCartContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  const paymentCardExist =
    !localStorage.getItem('paymentId') && path.includes(PATHS.ORDER_PAYMENT);

  const buttonConfig: ButtonConfig = {
    [PATHS.ORDER_CONFIRMATION]: {
      firstButton: 'Confirm',
      secondButton: 'Change order type',
      firstButtonLink: PATHS.ORDER_PAYMENT,
      secondButtonLink: PATHS.CHECKOUT,
      onClickFirstButton: () => {},
      onClickSecondButton: () => {
        Swal.fire({
          title: 'Are you sure?',
          html: '<p>Are you sure you want to change your order type?</p>',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: '#182715',
          confirmButtonText: 'Yes, take me to change order page',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancel',
          background: '#fff5e1',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(PATHS.CHECKOUT);
            handleDeleteOrder();
          }
        });
      },
      disabled: false, // Always enabled
    },
    [PATHS.ORDER_PAYMENT]: {
      firstButton: `Pay ${cartItems?.total} online`,
      secondButton: 'I’ll pay on the spot',
      firstButtonLink: PATHS.ORDER_PAYMENT,
      secondButtonLink: PATHS.ORDER_PAYMENT,
      onClickFirstButton: () => {
        handlePaymentOrder('online');
        Swal.fire({
          title: `Dear ${user.firstName}`,
          html: `
            <p>Big thanks for choosing us! We're really grateful you stopped by. Your support means a lot, and we're thrilled to have you dine with us. Looking forward to serving you again soon and making your experience even better.</p>
            <p>Cheers, OceanBar Team</p>
          `,
          confirmButtonColor: '#182715',
          confirmButtonText: 'Main Page',
          background: '#fff5e1',
        }).then(() => {
          navigate(PATHS.ROOT);
          window.location.reload();
        });
      },
      onClickSecondButton: () => {
        handlePaymentOrder('offline');
        Swal.fire({
          title: `Dear ${user.firstName}`,
          html: `
            <p>Big thanks for choosing us! We're really grateful you stopped by. Your support means a lot, and we're thrilled to have you dine with us. Looking forward to serving you again soon and making your experience even better.</p>
            <p>Cheers, OceanBar Team</p>
          `,
          confirmButtonColor: '#182715',
          confirmButtonText: 'Main Page',
        }).then(() => {
          navigate(PATHS.ROOT);
          window.location.reload();
        });
      },
      disabled: paymentCardExist,
    },
    default: {
      firstButton: 'Proceed',
      secondButton: 'Cancel',
      firstButtonLink: PATHS.ORDER_CONFIRMATION,
      secondButtonLink: PATHS.CART,
      onClickFirstButton: () => {},
      onClickSecondButton: () => {
        handleDeleteOrder();
      },
      disabled: false, // Always enabled
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
    onClickFirstButton: config.onClickFirstButton,
    onClickSecondButton: config.onClickSecondButton,
    disabled: config.disabled,
  };
};

export default useSummaryButton;
