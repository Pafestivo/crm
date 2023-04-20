const customersURL = 'http://localhost:3000/customers/';
const notesURL = 'http://localhost:3000/notes/';
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

const addScheduleToServer = async (customerName, date, time, customerUrl) => {

  const randomId = crypto.randomUUID();
  const response = await fetch(schedulesUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: randomId,
      customerUrl: customerUrl,
      date: date,
      time: time,
      customer: customerName,
    })
  });
  const schedule = await response.json();
  return schedule;
}


export { getCustomers, getCustomer, addCustomerToServer, deleteCustomerFromServer, updateCustomerOnServer, getCustomerNotes, getSingleNote, addNoteToServer,deleteNoteFromServer, updateNoteOnServer, addScheduleToServer,  }