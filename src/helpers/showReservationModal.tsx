import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { ReservationForm } from '@/components/molecules';
import { BrowserRouter } from 'react-router-dom';

const mySwal = withReactContent(Swal);

const showReservationModal = () => {
  mySwal.fire({
    title: 'Make a reservation',
    html: (
      <BrowserRouter>
        <ReservationForm />
      </BrowserRouter>
    ),
    confirmButtonText: 'Close',
  });
};

export default showReservationModal;
