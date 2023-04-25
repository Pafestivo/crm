import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import App from '../App';
import { server } from '../mocks/server'
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {

  const MockApp = () => {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  }

  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  test('should render customers', async () => {
    render(<MockApp />);

    const customerDiv = await screen.findByTestId('customer-0')
    expect(customerDiv).toBeInTheDocument();
  });
});