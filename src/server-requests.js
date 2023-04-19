const customersURL = 'https://crm-server-2ja0.onrender.com/customers';
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
      status: 'Pick a status',
      lastChange: new Date().toLocaleString(undefined, timeFormat)

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
      lastChange: new Date().toLocaleString(undefined, timeFormat)

    })
  });
  const updatedCustomer = await response.json();
  return updatedCustomer;
}

const addNoteToServer = async (customerId, noteDescription, currentCustomer) => {
  const response = await fetch(`${customersURL}/${customerId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...currentCustomer,
      lastChange: new Date().toLocaleString(undefined, timeFormat)
,
      notes: currentCustomer.notes ? [
        ...currentCustomer.notes,
        {
          id: crypto.randomUUID(),
          description: noteDescription,
          date: new Date().toLocaleString(undefined, timeFormat)

        }
      ] : [{
          id: crypto.randomUUID(),
          description: noteDescription,
          date: new Date().toLocaleString(undefined, timeFormat)

        }]
    })
  });
  const customer = await response.json();
  return customer;
}

const deleteNoteFromServer = async (customerId, noteId, currentCustomer) => {
  const response = await fetch(`${customersURL}/${customerId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...currentCustomer,
      notes: currentCustomer.notes.filter((note) => note.id !== noteId)
    })
  });
  const customer = await response.json();
  return customer;
}


const updateNoteOnServer = async (customer, noteId, newNote) => {
  const updatedNotes = customer.notes.map((note) => {
    if (note.id === noteId) {
      return { ...note, description: newNote, date: new Date().toLocaleString(undefined, timeFormat)};
    } else {
      return note;
    }
  });

  const response = await fetch(`${customersURL}/${customer.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...customer,
      lastChange: new Date().toLocaleString(undefined, timeFormat)
,
      notes: updatedNotes
    })
  });

  const updatedCustomer = await response.json();
  return updatedCustomer;
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


export { getCustomers, getCustomer, addCustomerToServer, deleteCustomerFromServer, updateCustomerOnServer, addNoteToServer,deleteNoteFromServer, updateNoteOnServer, addScheduleToServer }