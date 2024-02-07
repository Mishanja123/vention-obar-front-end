import { render, fireEvent } from '@testing-library/react';
import Footer from './Footer';
import * as Helpers from '@/helpers';

describe('Footer component', () => {
  test('renders component correctly', () => {
    const { getByText, getByTitle } = render(<Footer />);

    expect(getByText('Contacts')).toBeInTheDocument();
    expect(getByText('Prosta 67, 00-838 Warszawa')).toBeInTheDocument();
    expect(getByText('+48 60 503 62 26')).toBeInTheDocument();
    expect(getByText('Mon - Sun 08:00 - 23:00')).toBeInTheDocument();
    expect(getByText('Make a reservation')).toBeInTheDocument();
    expect(getByTitle('map')).toBeInTheDocument();
  });

  test('clicking reservation button calls scrollToReservationForm', () => {
    const scrollToReservationForm = jest.fn();
    jest
      .spyOn(Helpers, 'scrollToReservationForm')
      .mockImplementation(scrollToReservationForm);
    const { getByText } = render(<Footer />);
    const reservationButton = getByText('Make a reservation');

    fireEvent.click(reservationButton);

    expect(scrollToReservationForm).toHaveBeenCalled();
  });
});
