import React, { Component } from 'react';

class AddContactForm extends Component {
  state = {
     name :"", 
     email:""
    }
  render() { 
    return ( 
      <form  onSubmit={()=>this.props.onSubmit(this.state.name, this.state.email)}
      onReset={()=>{this.setState({name:"", email:""})}}
      >
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

     );
  }
}
 
export default AddContactForm;