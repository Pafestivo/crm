import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteScheduleFromServer, getCustomer, getCustomerScheduleFromServer, getSingleSchedule } from "../server-requests";
import { Link } from "react-router-dom";
import AddNewNote from "./AddNewNote";
import { deleteNoteFromServer, getCustomerNotes } from "../server-requests";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import "../styles/customer-page.css";
import CustomerRow from "./CustomerRow";
import CallLaterPopUp from "./CallLaterPopUp";

const CustomerPage = ({ addNoteToServer }) => {

  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showAddNewNote, setShowAddNewNote] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [editEvent, setEditEvent] = useState(false);
  const { id } = useParams();

  const updateCustomer = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        const currentCustomer = await getCustomer(id);
        const customerNotes = await getCustomerNotes(id);
        const customerSchedules = await getCustomerScheduleFromServer(id);
        setCustomer(currentCustomer);
        setNotes(customerNotes);
        setSchedules(customerSchedules);
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

  const deleteSchedule = async (scheduleId) => {
    setLoading(true);
    await deleteScheduleFromServer(scheduleId);
    updateCustomer();
  }

  const openEditPopUp = async(scheduleId) => {
    setLoading(true);
    const currentSchedule = await getSingleSchedule(scheduleId);
    setSchedule(currentSchedule);
    setEditEvent(true);
    setLoading(false);
  }

  // to get the day of the given date
  const getTheDay = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = new Date(date).getDay();
    return days[day];
  }

  return (
    <div className="container">

      {loading ? <LoadingScreen /> : null}

      {editEvent ? (
        <CallLaterPopUp setLoading={setLoading} customer={customer} setCallLater={setEditEvent} setSchedules={setSchedules} edit={true} schedule={schedule} />
      ) : null}

      {customer ? (
          <div className="customer-page-container">

          <Header title={customer.name} />

          <div className="customer-details">
            <CustomerRow customer={customer} setSchedules={setSchedules} />
          </div>

          <div className="customer-page-section">
            <h1>Events</h1>
            {schedules.length > 0 ? (
              schedules.map(schedule => (
                <div key={schedule.id} className="section-row">
                  <p>{customer.name} has requested a call on {getTheDay(schedule.date)}<span className="inserted-date">({schedule.date})</span> at {schedule.time}.</p>
                  <div className="buttons-container">
                    <button className="btn primary" onClick={() => openEditPopUp(schedule.id)}>Edit Event</button>
                    <button className="btn danger" onClick={() => deleteSchedule(schedule.id)}>Cancel Event</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No events for this customer yet.</p>
            )}
          </div>
        
          <div className="customer-page-section">
            <h1>Notes</h1>
            {notes.length > 0 ? 
            notes.map((note) => (
              <div key={note.id} className="section-row">
                <p className="bold">{note.date}</p>
                <p>{note.description}</p>
                <div className="buttons-container">
                  <Link to={`/notes/${note.id}`}>
                  <button className="primary">Edit</button>
                  </Link>
                  <button className="danger" onClick={() => deleteNote(note.id)}>Delete</button>
                </div>
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