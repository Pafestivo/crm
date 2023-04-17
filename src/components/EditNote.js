import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCustomer, updateNoteOnServer } from "../server-requests";

const EditNote = () => {
  const location = useLocation();
  const urlString = location.pathname;
  const splitUrl = urlString.split('/');
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [noteIndex, setNoteIndex] = useState(null);
  const [noteDescription, setNoteDescription] = useState('')
  const [loading, setLoading] = useState(true);

  const customerId = splitUrl[splitUrl.length - 3];
  const noteId = splitUrl[splitUrl.length - 2];
  
  const updateNote = (e) => {
    setNoteDescription(e.target.value);
  }

  const updateCustomer = async () => {
    const currentCustomer = await getCustomer(customerId);
    setCustomer(currentCustomer);
    setNoteIndex(currentCustomer.notes.findIndex(note => note.id === noteId));
    setLoading(false);
  }

  useEffect(() => {
    updateCustomer();
    // eslint-disable-next-line
  }, []);

  // update the state of the input fields after customer was set
  useEffect(() => {
    if(customer) {
      setNoteDescription(customer.notes[noteIndex].description);
    }
    // eslint-disable-next-line
  }, [customer])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if(noteDescription === '') {
      alert('Please fill out all fields');
      return;
    }
    setLoading(true);
    await updateNoteOnServer(customer, noteId, noteDescription)
    setLoading(false);
    navigate(`/customers/${customer.id}`);
  }
    

  return(
    <div>
      {loading ? (
        <h1>Loading...</h1>
        ) : (
          <div>
            <form>
              <input type="textarea" defaultValue={customer.notes[noteIndex].description} onChange={updateNote} />
              <button type="submit" className="btn btn-success" onClick={handleSubmit}>Save</button>
            </form>
            <button onClick={() => navigate(`/customers/${customer.id}`)} className="btn btn-danger">Cancel</button>
          </div>
        )}
    </div>

  )
}

export default EditNote;