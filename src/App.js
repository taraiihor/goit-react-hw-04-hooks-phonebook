// import { useState, useEffect } from 'react';
import React from 'react';
import ContactsList from './components/Contact/';
import { v4 as uniqueId } from 'uuid';
import ContactForm from './components/Form/';
import Filter from './components/Filter/';
import './App.css';
// const contacTest = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];
// const useLocalStorage = (key, defaultValue) => {
//   const [state, setState] = useState(
//     () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue,
//   );

//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(state));
//   }, [key, state]);

//   return [state, setState];
// };
// function NewApp() {
//   const [contacts, setContacts] = useLocalStorage('contacts', []);
//   const [filter, setFilter] = useState('');
//   const addContact = (name, number) => {
//     const { contacts } = this.state;
//     const newContact = {
//       id: uniqueId(),
//       name,
//       number,
//     };
//     if (contacts.find(contact => contact.name === newContact.name)) {
//       alert(`${newContact.name} з таким ім’ям вже є.`);
//       return;
//     }

//     this.setState(prevState => ({
//       contacts: [newContact, ...prevState.contacts],
//     }));
//   };
// }

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };
  addContact = (name, number) => {
    const { contacts } = this.state;
    const newContact = {
      id: uniqueId(),
      name,
      number,
    };
    if (contacts.find(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} з таким ім’ям вже є.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const { contacts, filter } = this.state;
    const normalize = this.state.filter.toLowerCase().trim();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalize),
    );

    return (
      <div className="Containet">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChangle={this.changeFilter} />
        {!contacts.length && <div>Немає жодного контакту, додайте контакт</div>}
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
