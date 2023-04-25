import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import App from '../App';
import { server } from '../mocks/server'

describe('App', () => {

  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  test('should render customers', async () => {
    render(<App />);

    await new Promise(resolve => setTimeout(resolve, 1000));

    await waitFor(() => {
      const customerDiv = screen.getByTestId('customer-0')
      expect(customerDiv).toBeInTheDocument();
    }) 
  });
});