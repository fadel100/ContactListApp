import React, { Component } from 'react';
import Contact from '../Contact/Contact.js'
import {Transition} from 'react-spring/renderprops';
import './ContactList.css';
class ContactList extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="ContactList-flexContainer">
      
         <Transition
          items={this.props.contacts}
          keys={contact => contact.id}
          from={{ transform: "translate3d(-100px,0,0)" }}
          enter={{ transform: "translate3d(0,0px,0)" }}
          leave={{ transform: "translate3d(-100px,0,0)" }}

         >
         {contact => style =>
        (
        <div style={style} className='Contact-card'>
        <Contact
        key = {contact.id}
        id= {contact.id}
        name= {contact.name}
        email = {contact.email}
        updateContact = {this.props.updateContact}
        deleteContact = {this.props.deleteContact}
        />
        </div>
        )}
  </Transition>  
      </div>
     );
  }
}
 
export default ContactList;