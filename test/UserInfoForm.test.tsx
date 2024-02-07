import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserInfoForm from '../src/components/molecules/UserInfoForm/UserInfoForm';
import { act } from 'react-dom/test-utils'; // Import act from react-dom/test-utils

// Mocking dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('UserInfoForm', () => {
  test('renders user information form', async () => {
    // Mock user data
    const userData = {
      user: {
        id: 1,
        avatar: 'avatar.jpg',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '+48578098947',
      },
    };

    // Mock fetchData function to return user data
    jest.mock('../src/components/molecules/UserInfoForm/userInfo', () => ({
      fetchData: jest.fn(() => userData),
    }));

    // Render UserInfoForm component
    const { getByPlaceholderText, getByText } = render(<UserInfoForm />);

    // Simulate async data fetch
    await act(async () => {});

    // Assert on rendered form elements
    expect(getByPlaceholderText('First Name')).toHaveValue('');
    expect(getByPlaceholderText('Last Name')).toHaveValue('');
    expect(getByPlaceholderText('Email')).toHaveValue('');
    // assert on other form fields...

    // Simulate form submission
    fireEvent.submit(getByText('Edit'));

    // Assert on any side effects or expected behavior after form submission
  });
});
