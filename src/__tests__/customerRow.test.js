import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import CustomerRow from '../components/CustomerRow';
import { BrowserRouter } from 'react-router-dom';

describe('Customer Row', () => {

  const MockRow = ({ customer, isMainPage}) => {
    return (
      <BrowserRouter>
        <CustomerRow customer={customer} isMainPage={isMainPage} />
      </BrowserRouter>
    )
  }

  const customer = { 
    id: 1, 
    name: 'Test Customer', 
    email: 'test@example.com', 
    phone: '0523453336', 
    status: 'Pick a status',
    lastChange: '04/26/23, 06:09'
  };


  test('should render correct customer information', async () => {
    render(<MockRow customer={customer} />);
    expect(await screen.findByText('Test Customer')).toBeInTheDocument();
    expect(await screen.findByText('test@example.com')).toBeInTheDocument();
    expect(await screen.findByText('0523453336')).toBeInTheDocument();
    expect(await screen.findByText('Pick a status')).toBeInTheDocument();
    expect(await screen.findByText('04/26/23, 06:09')).toBeInTheDocument();
  });

  test('should render correct buttons for main page', async () => {
    render(<MockRow customer={customer} isMainPage={true} />);
    expect(screen.getByRole('button', { name: 'View Customer' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete Customer' })).toBeInTheDocument();
  });

  test('should render correct buttons for customer page', async () => {
    render(<MockRow customer={customer} isMainPage={false} />);
    expect(screen.getByRole('button', { name: 'Edit Customer' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();
  });
});