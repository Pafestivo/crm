import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import userEvent from '@testing-library/user-event';
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

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => server.close())

  test('should render customers', async () => {
    render(<MockApp />);

    const customersDiv = await screen.findAllByTestId(/^customer-.*$/);
    expect(customersDiv).toHaveLength(3);
  });

  test('should find the proper customers when searching', async () => {
    render(<MockApp />);

    const searchInput = await screen.findByPlaceholderText('Search customer');

    // search for 'j'
    await waitFor( async () => {
      await userEvent.type(searchInput, 'j');
    })
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.queryByText('fella Doe')).not.toBeInTheDocument();
  });

  test('should return all customers when deleting the search query', async () => {
    render(<MockApp />);

    const searchInput = await screen.findByPlaceholderText('Search customer');

    // search for search and delete
    await waitFor( async () => {
      await userEvent.type(searchInput, 'j');
      await userEvent.type(searchInput, '{backspace}')
    })
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('fella Doe')).toBeInTheDocument();
  });

  test('should find by email', async () => {
    render(<MockApp />);

    const searchInput = await screen.findByPlaceholderText('Search customer');

    // search for email
    await waitFor( async () => {
      await userEvent.type(searchInput, 'jane@gmail.com');
    })
    
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  test('should find by status', async () => {
    render(<MockApp />);

    const searchInput = await screen.findByPlaceholderText('Search customer');

    // search for status
    await waitFor( async () => {
      await userEvent.type(searchInput, 'call later');
    })
    
    expect(screen.getByText('fella Doe')).toBeInTheDocument();
  });

  test('should find by mobile', async () => {
    render(<MockApp />);

    const searchInput = await screen.findByPlaceholderText('Search customer');

    // search for mobile
    await waitFor( async () => {
      await userEvent.type(searchInput, '0545687455');
    })
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});