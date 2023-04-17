import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomer } from "../server-requests";
import { Link } from "react-router-dom";
import AddNewNote from "./AddNewNote";
import { deleteNoteFromServer } from "../server-requests";

const CustomerPage = ({ addNoteToServer }) => {

  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [showAddNewNote, setShowAddNewNote] = useState(false);
  const { id } = useParams();

  const updateCustomer = async () => {
    const currentCustomer = await getCustomer(id);
    setCustomer(currentCustomer);
    setLoading(false);
  }

  useEffect(() => {
    updateCustomer();
    // eslint-disable-next-line
  }, []);

  const toggleAddNewNote = () => {
    setShowAddNewNote(!showAddNewNote);
  }

  const addNote = async (description) => {
    setLoading(true);
    await addNoteToServer(customer.id, description, customer);
    updateCustomer();
  }

  const deleteNote = async (noteId) => {
    setLoading(true);
    await deleteNoteFromServer(customer.id, noteId, customer);
    updateCustomer();
  }
    

  return (
    <div style={{margin: "100px auto" , width: "max-content"}}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Customer: {customer.name}</h1>
          <Link to={`/customers/${customer.id}/edit`}>
          <button className="btn btn-primary">Edit</button>
          </Link>
          <p>Email: {customer.email}</p>
          <p>Phone: {customer.phone}</p>
          <p>Status: {customer.status}</p>
          <p>Last modified: {customer.lastChange}</p>
          <div>
            <h2>Notes</h2>
            {customer.notes ? 
            customer.notes.map((note) => (
              <div key={note.id}>
                <p>{note.date} - {note.description}</p>
                <Link to={`/customers/${customer.id}/${note.id}/edit`}>
                <button className="btn btn-primary">Edit</button>
                </Link>
                <button className="btn btn-danger" onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            )) : <p>No notes yet...</p>
            }

            {showAddNewNote ? (
              <div>
                <AddNewNote addNote={addNote} toggleAddNewNote={toggleAddNewNote} />
              </div>
            ) : (
              <div>
                <button className="btn btn-success" onClick={toggleAddNewNote}>Add New Note</button>
                <Link to={`/`}>
                <button className="btn btn-secondary">Go Back</button>
                </Link>
              </div>
              
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerPage;