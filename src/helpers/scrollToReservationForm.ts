const scrollToReservationForm = () => {
  const reservationForm = document.getElementById('reservationForm');

  if (reservationForm) {
    reservationForm.scrollIntoView({
      behavior: 'smooth',
    });
  }
};

export default scrollToReservationForm;
