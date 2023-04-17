const customersURL = 'https://crm-server-2ja0.onrender.com/customers';
const options = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
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
      lastChange: new Date().toLocaleString(undefined, options)

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
      lastChange: new Date().toLocaleString(undefined, options)

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
      lastChange: new Date().toLocaleString(undefined, options)
,
      notes: currentCustomer.notes ? [
        ...currentCustomer.notes,
        {
          id: crypto.randomUUID(),
          description: noteDescription,
          date: new Date().toLocaleString(undefined, options)

        }
      ] : [{
          id: crypto.randomUUID(),
          description: noteDescription,
          date: new Date().toLocaleString(undefined, options)

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
      return { ...note, description: newNote, date: new Date().toLocaleString(undefined, options)};
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
      lastChange: new Date().toLocaleString(undefined, options)
,
      notes: updatedNotes
    })
  });

  const updatedCustomer = await response.json();
  return updatedCustomer;
}


export { getCustomers, getCustomer, addCustomerToServer, deleteCustomerFromServer, updateCustomerOnServer, addNoteToServer,deleteNoteFromServer, updateNoteOnServer }