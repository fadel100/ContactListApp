import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { pause } from "./utils/utils.js";
import AddContactForm from "./components/AddContactForm/AddContactForm.js";
import ContactList from "./components/ContactList/ContactList.js";
import Header from "./components/Header/Header.js";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
/*import { css } from 'glamor' */

/**
 * My component App that prints the list of contacts
 *
 * @module App
 */

class App extends React.Component {
  /**
   * @type {object}
   * @property {array} contacts - holds the contact objects
   * @property {string} error_message -holds the error message
   * @property {string} name - tracks the name entered in the add form
   * @property {string} email - tracks the email entered in the add form
   */

  state = {
    contacts: [],
    error_message: "",
    isLoading: false
  };

  /**
   * When the component mounts calls funcion getContactsList.
   * @function componentDidMount
   * @return {null}
   *
   */
  async componentDidMount() {
    this.getContactsList();
  }

  /**
   * fetches the list of contact and sets them in state.
   * @function getContactsList
   * @async
   * @return {null}
   *
   */
  getContactsList = async () => {
    this.setState({ isLoading: true });
    try {
      const response = await fetch("http://localhost:8080/contacts/list");
      await pause();
      const answer = await response.json();
      if (answer.success) {
        toast("Contacts loaded!");
        this.setState({ contacts: answer.result, isLoading: false });
      } else {
        console.log();
        this.setState({ error_message: answer.message, isLoading: false });
      }
    } catch (err) {
      console.log("error", err);
      this.setState({ error_message: err.message, isLoading: false });
    }
  };

  /**
   * Retrieves a contact with the given id.
   * @function getContact
   * @async
   * @param {number} id - the id  of contact that is to be retrieved
   * @return {null}
   *
   */
  getContact = async id => {
    //check if contact exists in state
    const prev_contact = this.state.contacts.find(contact => contact.id === id);
    if (prev_contact) {
      //return if from state
      console.log(prev_contact);
      return prev_contact;
    } else {
      this.setState({ isLoading: true });
      //otherwise fetch from the server
      try {
        const response = await fetch(
          `http://localhost:8080/contacts/get/${id}`
        );
        await pause();
        const answer = await response.json();
        if (answer.success) {
          //update the contact list in state to include the new contact
          const contacts = [...this.state.contacts];
          contacts.push(answer.result);
          console.log(answer.result);
          toast(
            `contact: ${id}, ${answer.result.name}, ${answer.result.email} `
          );
          this.setState({ contacts, isLoading: false });
        } else {
          this.setState({ error_message: answer.message, isLoading: false });
        }
      } catch (err) {
        console.log("error", err);
        this.setState({ error_message: err.message, isLoading: false });
      }
    }
  };

  /**
   * deletes a contact from the contact list
   * @function deleteContact
   * @async
   * @param {number} id - the id  of contact that is to be deleted
   * @return {null}
   *
   */
  deleteContact = async id => {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(
        `http://localhost:8080/contacts/delete/${id}`
      );
      await pause();
      const answer = await response.json();
      if (answer.success) {
        const contacts = this.state.contacts.filter(
          contact => contact.id !== id
        );
        toast(`contact with id ${id} was successfully deleted!`);
        this.setState({ contacts, isLoading: false });
      } else {
        console.log();
        this.setState({ error_message: answer.message, isLoading: false });
      }
    } catch (err) {
      console.log("error", err);
      this.setState({ error_message: err.message, isLoading: false });
    }
  };

  /**
   * updates the email, name, or both of a contact with the given id.
   * @function updateContact
   * @async
   * @param {number} id - the id  of contact that is to be retrieved
   * @param {object} parameters - contains the email and name as an object
   * @return {null}
   *
   */
  updateContact = async (id, parameters) => {
    const { email, name } = parameters;
    if (!parameters && !email && !name) {
      throw new Error("You need to provide an email or name");
    }
    this.setState({ isLoading: true });
    try {
      let url = "";
      if (name && email) {
        url = `http://localhost:8080/contacts/update/${id}?name=${name}&email=${email}`;
      }
      if (name && !email) {
        url = `http://localhost:8080/contacts/update/${id}?name=${name}`;
      }
      if (email && !name) {
        url = `http://localhost:8080/contacts/update/${id}?email=${email}`;
      }
      const response = await fetch(url);
      await pause();
      const answer = await response.json();
      if (answer.success) {
        const contacts = this.state.contacts.map(contact => {
          if (contact.id === id) {
            const updated_contact = {
              id: contact.id,
              name: name || contact.name,
              email: email || contact.email
            };
            return updated_contact;
          } else return contact;
        });
        toast(`contact with id ${id} was successfully updated!`);
        this.setState({ contacts, isLoading: false });
      } else {
        console.log();
        this.setState({ error_message: answer.message, isLoading: false });
      }
    } catch (err) {
      console.log("error", err);
      this.setState({ error_message: err.message, isLoading: false });
    }
  };

  /**
   * creates a component with the given email and name
   * @function createContact
   * @async
   * @param {object} parameters - contains the name and email
   * @return {null}
   *
   */
  createContact = async parameters => {
    const { email, name } = parameters;
    if (!parameters || (!email && !name)) {
      throw new Error("You need to provide an email and name");
    }
    this.setState({ isLoading: true });
    try {
      const response = await fetch(
        `http://localhost:8080/contacts/new?email=${email}&name=${name}`
      );
      await pause();
      const answer = await response.json();
      if (answer.success) {
        const new_contact = {
          id: answer.result,
          name,
          email
        };
        const contacts = [...this.state.contacts];
        contacts.push(new_contact);
        toast(`Contact was successfully created!`);
        this.setState({ contacts, isLoading: false });
      } else {
        console.log();
        this.setState({ error_message: answer.message, isLoading: false });
      }
    } catch (err) {
      console.log("error", err);
      this.setState({ error_message: err.message, isLoading: false });
    }
  };

  /**
   * creates a component with the given email and name
   * @function onSubmit
   * @param {string} name - contains the name
   * @param {string} email - contains the email
   * @param {SyntheticEvent} e - event that triggered function
   * @return {null}
   *
   */
  onSubmit = (name, email, e) => {
    // const {name, email} = this.state;
    e.preventDefault();
    this.createContact({ name, email });
    this.setState({
      name: "",
      email: ""
    });
  };

  /**
   * Renders the component.
   * @function render
   * @return {ReactElement} markup
   *
   */
  render() {
    return (
      <>
        <Header />
        {this.state.error_message && <p>ERROR!{this.state.error_message}</p>}
        <div className="App">
          {this.state.isLoading ? (
            <p>Loading...</p>
          ) : (
            <ContactList
              contacts={this.state.contacts}
              updateContact={this.updateContact}
              deleteContact={this.deleteContact}
            />
          )}
          <AddContactForm onSubmit={this.onSubmit} />
        </div>
        <ToastContainer />
      </>
    );
  }
}

export default App;
