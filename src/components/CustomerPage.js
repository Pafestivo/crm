import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomer } from "../server-requests";
import { Link } from "react-router-dom";
import AddNewNote from "./AddNewNote";
import { deleteNoteFromServer } from "../server-requests";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import "../styles/customer-page.css";
import CustomerRow from "./CustomerRow";

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
    <div className="container">

      {loading ? <LoadingScreen /> : null}

      {customer ? (
          <div className="customer-page-container">

          <Header title={`Viewing: ${customer.name}`} />

          <div className="customer-details">
            <CustomerRow customer={customer} />
          </div>
        
          <div className="notes">
            <h1>Notes</h1>
            {customer.notes ? 
            customer.notes.map((note) => (
              <div key={note.id} className="note-row">
                <p className="bold">{note.date}</p>
                <p>{note.description}</p>
                <Link to={`/customers/${customer.id}/${note.id}/edit`}>
                <button className="primary">Edit</button>
                </Link>
                <button className="danger" onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            )) : <p>No notes yet...</p>
            }

            {showAddNewNote ? (
                <AddNewNote addNote={addNote} toggleAddNewNote={toggleAddNewNote} />
            ) : (
              <div className="notes-actions">
                <button className="success" onClick={toggleAddNewNote}>Add New Note</button>
                <Link to={`/`}>
                  <button className="danger">Go Back</button>
                </Link>
              </div>
              
            )}
          </div>
        </div>
      ) : (
        null
      )}
    </div>
  )
}

export default CustomerPage;