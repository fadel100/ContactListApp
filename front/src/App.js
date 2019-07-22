import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Contact from './components/Contact/Contact.js'

/**
 * My component App that prints the list of contacts
 *
 * @namespace App
 */

class App extends React.Component {
  /**
   * @type {object}
   * @property {array} contacts - holds the contact objects
   */

  state = {
    contacts: [],
    error_message: "", 
    name:"",
    email:""
  };

  /**
   * When the component mounts fetches the list of contact and sets them in state.
   * @function componentDidMount
   * @return {null}
   *
   */
  async componentDidMount() {
    this.getContactsList();
  }

  getContactsList = async () => {
    try {
      const response = await fetch("http://localhost:8080/contacts/list");
      const answer = await response.json();
      if (answer.success) {
        this.setState({ contacts: answer.result });
      } else {
        console.log();
        this.setState({ error_message: answer.message });
      }
    } catch (err) {
      console.log("error", err);
      this.setState({ error_message: err.message });
    }
  };

  getContact = async id => {
    //check if contact exists in state
    const prev_contact = this.state.contacts.find(contact => contact.id === id);
    if (prev_contact) {
      //return if from state
      console.log(prev_contact)
      return prev_contact;
    } else {
      //otherwise fetch from the server
      try {
        const response = await fetch(
          `http://localhost:8080/contacts/get/${id}`
        );
        const answer = await response.json();
        if (answer.success) {
          //update the contact list in state to include the new contact
          const contacts = [...this.state.contacts];
          contacts.push(answer.result);
          console.log(answer.result)
          this.setState({ contacts });
        } else {
          this.setState({ error_message: answer.message });
        }
      } catch (err) {
        console.log("error", err);
        this.setState({ error_message: err.message });
      }
    }
  };

  deleteContact = async id =>{
    try {
      const response = await fetch(`http://localhost:8080/contacts/delete/${id}`);
      const answer = await response.json();
      if (answer.success) {
        const contacts  = this.state.contacts.filter(
          contact => contact.id !== id
        )
        this.setState({ contacts });
      } else {
        console.log();
        this.setState({ error_message: answer.message });
      }
    } catch (err) {
      console.log("error", err);
      this.setState({ error_message: err.message });
    }
  }

  updateContact = async (id, parameters) =>{
    const {email, name} = parameters;
    if(!parameters && !email && !name){
      throw new Error("You need to provide an email or name");
    }
    try {
      let url="";
      if(name && email){
        url = `http://localhost:8080/contacts/update/${id}?name=${name}&email=${email}`
      }
      if(name && !email){
        url = `http://localhost:8080/contacts/update/${id}?name=${name}`
      }
      if(email && !name){
        url = `http://localhost:8080/contacts/update/${id}?email=${email}`
      
      }
      const response = await fetch(url);
      const answer = await response.json();
      if (answer.success) {
        const contacts  = this.state.contacts.map(
          contact => {
            if(contact.id === id){
              const updated_contact = {
                id: contact.id,
                name: name || contact.name,
                email: email||contact.email
              }
              return updated_contact
            }
            else
            return contact;
          }
        )
        this.setState({ contacts });
      } else {
        console.log();
        this.setState({ error_message: answer.message });
      }
    } catch (err) {
      console.log("error", err);
      this.setState({ error_message: err.message });
    }
  }



  createContact = async ( parameters) =>{
    const {email, name} = parameters;
    if(!parameters || (!email && !name)){
      throw new Error("You need to provide an email and name");
    }
    try {
      
      const response = await fetch(`http://localhost:8080/contacts/new?email=${email}&name=${name}`);
      const answer = await response.json();
      if (answer.success) {
        
        const new_contact = {
          id: answer.result,
          name,
          email
        }
        const contacts = [...this.state.contacts];
        contacts.push(new_contact);
        this.setState({ contacts });
      } else {
        console.log();
        this.setState({ error_message: answer.message });
      }
    } catch (err) {
      console.log("error", err);
      this.setState({ error_message: err.message });
    }
  }

  onSubmit = ()=>{
    const {name, email} = this.state;
    this.createContact({name, email});
    this.setState({
      name:"",
      email:""
    })
  }
  /**
   * Renders the component.
   * @function render
   * @return {ReactElement} markup
   *
   */

  render() {
    return (
      <>
        {this.state.error_message && <p>ERROR!{this.state.error_message}</p>}
        <div className="App">
          {this.state.contacts.map(contact => (
           
            <Contact
            key = {contact.id}
            id= {contact.id}
            name= {contact.name}
            email = {contact.email}
            updateContact = {this.updateContact}
            deleteContact = {this.deleteContact}
            />

          ))}
          <form  onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="name"
            onChange={evt => this.setState({ name: evt.target.value })}
            value={this.state.name}
          />
          <input
            type="text"
            placeholder="email"
            onChange={evt => this.setState({ email: evt.target.value })}
            value={this.state.email}
          />
          <div>
            <input type="submit" value="ok" />
            <input type="reset" value="cancel"  />
          </div>
        </form>

          </div>
      </>
    );
  }
}

export default App;
