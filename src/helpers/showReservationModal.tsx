import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { ReservationForm } from '@/components/molecules';

const mySwal = withReactContent(Swal);

const showReservationModal = () => {
  mySwal.fire({
    title: 'Make a reservation',
    html: <ReservationForm />,
    confirmButtonText: 'Close',
  });
};

export default showReservationModal;
