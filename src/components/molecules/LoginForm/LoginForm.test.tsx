import { render } from '@testing-library/react';
import LoginForm from './LoginForm';

// Mocking react-router-dom's useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mocking useDispatch
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

// Mocking useFormik
jest.mock('formik', () => ({
  useFormik: jest.fn(),
}));

describe('LoginForm component', () => {
  test('renders component correctly', () => {
    // Mocking the formik object

    const { getByText, getByLabelText } = render(<LoginForm />);

    expect(getByText('Login')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });
});
