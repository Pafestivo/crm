import React, { useState } from "react";

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
    <div>
      <form>
        <input onInput={updateDescription} type="textArea" name="note-description" placeholder="Write your note here..." />
        <button onClick={handleSubmit} type="submit">Add Note</button>
        <button onClick={toggleAddNewNote}>Cancel</button>
      </form>
    </div>
  );
}

export default AddNewNote;