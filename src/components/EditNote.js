import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleNote, updateNoteOnServer } from "../server-requests";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [noteDescription, setNoteDescription] = useState('');
  const [note, setNote] = useState(null);

  const getNote = async () => {
    const currentNote = await getSingleNote(id);
    setNote(currentNote);
    setLoading(false);
  }

  const updateNote = (e) => {
    setNoteDescription(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if(!noteDescription) {
      alert('Note description cannot be empty');
      return;
    }

    updateNoteOnServer(id, noteDescription);
    navigate(`/customers/${note.customer_id}`);
  }

  useEffect(() => {
    getNote();
  }, [])
    

  return(
    <div className="container">
      {loading ? (
        <h1>Loading...</h1>
        ) : (
          <div>
            <form>
              <input type="textarea" defaultValue={note.description} onChange={updateNote} />
              <button type="submit" className="btn btn-success" onClick={handleSubmit}>Save</button>
            </form>
            <button onClick={() => navigate(`/customers/${note.customer_id}`)} className="btn btn-danger">Cancel</button>
          </div>
        )}
    </div>

  )
}

export default EditNote;