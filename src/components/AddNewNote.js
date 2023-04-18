import React, { useState } from "react";
import '../styles/add-new-note.css'

const AddNewNote = ({ addNote, toggleAddNewNote }) => {

  const [description, setDescription] = useState('')

  // update the state of the input fields
  const updateDescription = (e) => {
    setDescription(e.target.value);
  }

  // handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if(!description) {
      alert('Note cannot be empty');
      return;
    }

    toggleAddNewNote();
    addNote(description);
  }

  
  return (
    <div className="note-form-container">
      <form>
        <textarea onInput={updateDescription} name="note-description" placeholder="Write your note here..." />
        <button className="success" onClick={handleSubmit} type="submit">Add Note</button>
        <button className="danger" onClick={toggleAddNewNote}>Cancel</button>
      </form>
    </div>
  );
}

export default AddNewNote;