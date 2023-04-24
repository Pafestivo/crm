import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import AddNewCustomer from '../components/AddNewCustomer';


describe('AddNewCustomer', () => {
  test('should render input elements', () => {
    render(
      <AddNewCustomer />
    )
    const customerName = screen.getByPlaceholderText(/Customer Name/i);
    const customerEmail = screen.getByPlaceholderText(/Customer Email/i);
    const customerPhone = screen.getByPlaceholderText(/Customer Phone/i);
    expect(customerName).toBeInTheDocument();
    expect(customerEmail).toBeInTheDocument();
    expect(customerPhone).toBeInTheDocument();
  });

  test('should be able to type in inputs', () => {
    render(
      <AddNewCustomer />
    )

    const customerName = screen.getByPlaceholderText(/Customer Name/i);
    const customerEmail = screen.getByPlaceholderText(/Customer Email/i);
    const customerPhone = screen.getByPlaceholderText(/Customer Phone/i);

    fireEvent.change(customerName, { target: { value: 'John Doe'}});
    fireEvent.change(customerEmail, { target: { value: 'john.doe@gmail.com'}});
    fireEvent.change(customerPhone, { target: { value: '0524568957'}});

    expect(customerName.value).toBe('John Doe');
    expect(customerEmail.value).toBe('john.doe@gmail.com');
    expect(customerPhone.value).toBe('0524568957');
  });
});
