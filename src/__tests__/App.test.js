// import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom'; 
// import App from '../App';
// import * as serverRequests from '../server-requests';

// describe('App', () => {

//   test('should show form when add new customer clicked', () => {
//     render(<App />);
//     const addNewCustomerBtn = screen.getByRole('button', { name: /add new customer/i });
//     fireEvent.click(addNewCustomerBtn);


//     const customerName = screen.getByPlaceholderText(/Customer Name/i);
//     const customerEmail = screen.getByPlaceholderText(/Customer Email/i);
//     const customerPhone = screen.getByPlaceholderText(/Customer Phone/i);

//     expect(customerName).toBeInTheDocument();
//     expect(customerEmail).toBeInTheDocument();
//     expect(customerPhone).toBeInTheDocument();
//   });

//   test('should add customer when form submitted', async () => {
//     const addCustomerToServerMock = jest.spyOn(serverRequests, 'addCustomerToServer');
//     addCustomerToServerMock.mockResolvedValue();
  
//     render(<App />);
  
//     const addNewCustomerBtn = screen.getByRole('button', { name: /add new customer/i });
//     fireEvent.click(addNewCustomerBtn);
  
//     const customerName = screen.getByPlaceholderText(/Customer Name/i);
//     const customerEmail = screen.getByPlaceholderText(/Customer Email/i);
//     const customerPhone = screen.getByPlaceholderText(/Customer Phone/i);
//     const submitBtn = screen.getByRole('button', { name: /Add Customer/i });
  
//     fireEvent.change(customerName, { target: { value: 'John Doe'}});
//     fireEvent.change(customerEmail, { target: { value: 'john.doe@gmail.com'}});
//     fireEvent.change(customerPhone, { target: { value: '0524568957'}});
    
//     act(() => {
//       fireEvent.click(submitBtn);
//     });
  
//     const customersContainer = screen.getByTestId('customers-container');
//     await waitFor(() => expect(customersContainer.children.length).toBe(11));
  
//     expect(addCustomerToServerMock).toHaveBeenCalledWith('John Doe', 'john.doe@gmail.com', '0524568957');
//     addCustomerToServerMock.mockRestore();
//   });
// });