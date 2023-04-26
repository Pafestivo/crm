import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import AddNewCustomer from '../components/AddNewCustomer';
import userEvent from '@testing-library/user-event';


describe('AddNewCustomer', () => {

  const user = userEvent.setup();


  test('should add customer when form submitted', async () => {
    const addCustomer = jest.fn();
    render(<AddNewCustomer addCustomer={addCustomer} />);
    
    await waitFor( async () => {
      const customerName = screen.getByPlaceholderText(/Customer Name/i);
      const customerEmail = screen.getByPlaceholderText(/Customer Email/i);
      const customerPhone = screen.getByPlaceholderText(/Customer Phone/i);
  
      
      await user.type(customerName, 'John Doe');
      await user.type(customerEmail, 'john.doe@gmail.com');
      await user.type(customerPhone, '0524568957');
    });
    

    const submitBtn = screen.getByRole('button', { name: /Add Customer/i });
    await user.click(submitBtn);
    
    expect(addCustomer).toHaveBeenCalledWith('John Doe', 'john.doe@gmail.com', '0524568957');
  });

  test('should not add when fields are empty', async () => {
    global.alert = jest.fn();
    const addCustomer = jest.fn();
    render(<AddNewCustomer addCustomer={addCustomer} />);

    const submitBtn = screen.getByRole('button', { name: /Add Customer/i });
    await user.click(submitBtn);
    
    expect(addCustomer).not.toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalled();
  });
});
