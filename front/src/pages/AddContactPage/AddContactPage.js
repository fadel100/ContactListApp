import React, { Component } from 'react';
import AddContactForm from '../../components/AddContactForm/AddContactForm.js'


class AddContactPage extends Component {
  state = {  }
  render() { 
    return ( 
      <AddContactForm{...this.props} />
     );
  }
}
 
export default AddContactPage;