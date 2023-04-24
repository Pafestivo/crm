import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Header from '../components/Header';

describe('Header', () => {
  test('should render same text passed into title prop', () => {
    render(<Header title="My Header" />);
    const headingElement = screen.getByText(/my header/i);
    expect(headingElement).toBeInTheDocument();
  });
});