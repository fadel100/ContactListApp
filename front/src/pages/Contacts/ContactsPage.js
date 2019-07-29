import React, { Component } from 'react';
import ContactList from '../../components/ContactList/ContactList.js';


/**
 * My component page that displays the contacts list
 *
 * @module ContactsPage
 */
class ContactsPage extends Component {
 
   /**
   * Renders the component.
   * @function render
   * @return {ReactElement} markup
   *
   */
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