import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import AddNewNote from '../components/AddNewNote';
import userEvent from '@testing-library/user-event';


describe('Add new note', () => {

  const user = userEvent.setup();


  test('should add note when form submitted', async () => {
    const addNote = jest.fn();
    const toggleAddNewNote = jest.fn();
    render(<AddNewNote addNote={addNote} toggleAddNewNote={toggleAddNewNote} />);
    
    await waitFor( async () => {
      const noteDescription = screen.getByPlaceholderText(/Write your note here.../i);
  
      
      await user.type(noteDescription, 'This is a test note');
    });
    

    const submitBtn = screen.getByRole('button', { name: /Add Note/i });
    await user.click(submitBtn);
    
    expect(addNote).toHaveBeenCalledWith('This is a test note');
  });

  test('should not add empty note', async () => {
    global.alert = jest.fn();
    const addNote = jest.fn();
    const toggleAddNewNote = jest.fn();
    render(<AddNewNote addNote={addNote} toggleAddNewNote={toggleAddNewNote} />);

    const submitBtn = screen.getByRole('button', { name: /Add Note/i });
    await user.click(submitBtn);
    
    expect(addNote).not.toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalled();
  });
});
