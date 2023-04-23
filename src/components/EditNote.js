import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleNote, updateNoteOnServer } from "../server-requests";
import '../styles/edit-note.css'
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [noteDescription, setNoteDescription] = useState('');
  const [note, setNote] = useState(null);

  const getNote = useCallback(async () => {
    try {
      const currentNote = await getSingleNote(id);
      setNote(currentNote);
      setLoading(false);
      
    } catch(error) {
      console.log(error)
      setLoading(false);
    }
    
  }, [id])

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
  }, [getNote])
    

  return(
    <div className="container">

      <Header title={'Edit Note'} />

      {loading ? <LoadingScreen /> : null}

      {note ? (
        <div>
          <form className="edit-note">
            <textarea defaultValue={note.description} onChange={updateNote} />
            <button type="submit" className="btn success" onClick={handleSubmit}>Save</button>
            <button onClick={() => navigate(`/customers/${note.customer_id}`)} className="btn danger">Cancel</button>
          </form>
        </div>
        ) : (
          null
        )}
    </div>

  )
}

export default EditNote;