const customersURL = 'https://crm-server-2ja0.onrender.com/customers/';
const notesURL = 'https://crm-server-2ja0.onrender.com/notes/';
const schedulesUrl = 'https://crm-server-2ja0.onrender.com/schedules';
const timeFormat = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23'
}


const getCustomers = async () => {
  const response = await fetch(customersURL);
  const customers = await response.json();
  return customers;
}

const getCustomer = async (id) => {
  const response = await fetch(`${customersURL}/${id}`);
  const customer = await response.json();
  return customer;
}

const addCustomerToServer = async (name, email, phone) => {
  const response = await fetch(customersURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      status: 'Select a status'
    })
  });
  const customer = await response.json();
  return customer;
}

const deleteCustomerFromServer = async (id) => {
  const response = await fetch(`${customersURL}/${id}`, {
    method: 'DELETE'
  });
  const customer = await response.json();
  return customer;
}

const updateCustomerOnServer = async (customer, id, name, email, phone, status) => {
  const response = await fetch(`${customersURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...customer,
      name: name,
      email: email,
      phone: phone,
      status: status,
    })
  });
  const updatedCustomer = await response.json();
  return updatedCustomer;
}

const getCustomerNotes = async (id) => {
  const response = await fetch(`${notesURL}?customer_id=${id}`);
  const notes = await response.json();
  return notes;
}

const getSingleNote = async (id) => {
  const response = await fetch(`${notesURL}/${id}`);
  const note = await response.json();
  return note;
}

const updateNoteOnServer = async (noteId, newDescription) => {
  const response = await fetch(`${notesURL}${noteId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: newDescription,
      date: new Date().toLocaleString(undefined, timeFormat)
    })
  });
  const note = await response.json();
  return note;
}

const addNoteToServer = async (customerId, noteDescription) => {
  const response = await fetch(notesURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      customer_id: customerId,
      description: noteDescription,
    })
  });
  const customer = await response.json();
  return customer;
}

const deleteNoteFromServer = async (noteId) => {
  const response = await fetch(`${notesURL}/${noteId}`, {
    method: 'DELETE',
  });
  const note = await response.json();
  return note;
}

const getCustomerScheduleFromServer = async (customerId) => {
  const response = await fetch(`${schedulesUrl}?customer_id=${customerId}`);
  const schedule = await response.json();
  return schedule;
}

const getSingleSchedule = async (scheduleId) => {
  const response = await fetch(`${schedulesUrl}/${scheduleId}`);
  const schedule = await response.json();
  return schedule;
}

const updateScheduleOnServer = async (scheduleId, newDate, newTime) => {
  const response = await fetch(`${schedulesUrl}/${scheduleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      date: newDate,
      time: newTime,
    })
  });
  const schedule = await response.json();
  return schedule;
}

const addScheduleToServer = async (customerUrl, date, time, customerName, customer_id) => {

  const response = await fetch(schedulesUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      customerUrl: customerUrl,
      date: date,
      time: time,
      customerName: customerName,
      customer_id: customer_id
    })
  });
  const schedule = await response.json();
  return schedule;
}

const deleteScheduleFromServer = async (scheduleId) => {
  const response = await fetch(`${schedulesUrl}/${scheduleId}`, {
    method: 'DELETE',
  });
  const schedule = await response.json();
  return schedule;
}


export { getCustomers, getCustomer, addCustomerToServer, deleteCustomerFromServer, updateCustomerOnServer, getCustomerNotes, getSingleNote, addNoteToServer,deleteNoteFromServer, updateNoteOnServer, getCustomerScheduleFromServer, addScheduleToServer, deleteScheduleFromServer, updateScheduleOnServer, getSingleSchedule}