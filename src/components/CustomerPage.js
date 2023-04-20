import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomer } from "../server-requests";
import { Link } from "react-router-dom";
import AddNewNote from "./AddNewNote";
import { deleteNoteFromServer, getCustomerNotes } from "../server-requests";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import "../styles/customer-page.css";
import CustomerRow from "./CustomerRow";

const CustomerPage = ({ addNoteToServer }) => {

  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [notes, setNotes] = useState([]); 
  const [showAddNewNote, setShowAddNewNote] = useState(false);
  const { id } = useParams();

  const updateCustomer = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        const currentCustomer = await getCustomer(id);
        const customerNotes = await getCustomerNotes(id);
        setCustomer(currentCustomer);
        setNotes(customerNotes)
        setLoading(false);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }, [id]);
  

  useEffect(() => {
    updateCustomer();
  }, [updateCustomer]);

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
    await deleteNoteFromServer(noteId);
    updateCustomer();
  }
    

  return (
    <div className="container">

      {loading ? <LoadingScreen /> : null}

      {customer ? (
          <div className="customer-page-container">

          <Header title={customer.name} />

          <div className="customer-details">
            <CustomerRow customer={customer} />
          </div>
        
          <div className="notes">
            <h1>Notes</h1>
            {notes.length > 0 ? 
            notes.map((note) => (
              <div key={note.id} className="note-row">
                <p className="bold">{note.date}</p>
                <p>{note.description}</p>
                <Link to={`/notes/${note.id}`}>
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