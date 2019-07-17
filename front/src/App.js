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

  state={
    contacts:[]
  }

  async componentDidMount(){

    try{const response = await fetch('http://localhost:8080/contacts/list')
    const result = await response.json();
    this.setState({contacts:result})}
    catch(err){
      console.log("error",err)
    }
   // console.log("I got a response", result);
  }
  /**
        * Renders the component.
        * @function
        * @return {ReactElement} markup
        *
        */

  render(){
  return (
   
    <div className="App">
      {this.state.contacts.map(contact=>(
        <div key={contact.id}>{contact.name}</div>
      ))}
    </div>
  );
  }
}

export default App;
