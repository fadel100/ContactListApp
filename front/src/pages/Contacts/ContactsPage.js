import React, { Component } from 'react';
import ContactList from '../../components/ContactList/ContactList.js';

class ContactsPage extends Component {
  state = { 
   }
  render() { 
    return ( 

      this.props.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ContactList
         {...this.props}
        />
      )
     );
  }
}
 
export default ContactsPage;