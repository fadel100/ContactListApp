import React, { Component } from 'react';
import AddContactForm from '../../components/AddContactForm/AddContactForm.js'

/**
 * My component page that displays the add contact form
 *
 * @module AddContactForm
 */
class AddContactPage extends Component {
 
  /**
   * Renders the component.
   * @function render
   * @return {ReactElement} markup
   *
   */
  render() { 
    return ( 
      <AddContactForm{...this.props} />
     );
  }
}
 
export default AddContactPage;