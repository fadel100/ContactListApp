import React from "react";
import logo from "./logo.svg";
import "./App.css";

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
    error_message:''
  };

  /**
   * When the component mounts fetches the list of contact and sets them in state.
   * @function componentDidMount
   * @return {null}
   *
   */
  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:8080/contacts/list");
      const answer = await response.json();
      if(answer.success){
        this.setState({ contacts: answer.result });
      }
      else{
        console.log()
        this.setState({ error_message: answer.message });
      }
      
    } catch (err) {
      console.log("error", err);
      this.setState({ error_message: err.message });
    }
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
      {this.state.error_message&&<p>ERROR!{this.state.error_message}</p>}
      <div className="App">
        {this.state.contacts.map(contact => (
          <div key={contact.id}>
            <p>{contact.name}</p>
          </div>
        ))}
      </div>
      </>
    );
  }
}

export default App;
