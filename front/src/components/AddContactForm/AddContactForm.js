import React, { Component } from "react";

/**
 * My component AddContactForm that allows me to create a contact
 *
 * @module AddContactForm
 */

class AddContactForm extends Component {
  /**
   * @type {object}
   * @property {string} name - tracks the name entered in the add form
   * @property {string} email - tracks the email entered in the add form
   */
  state = {
    name: "",
    email: ""
  };

  /**
   * Renders the component.
   * @function render
   * @return {ReactElement} markup
   *
   */
  render() {
    return (
      <form
        onSubmit={evt =>
          this.props.onSubmit(this.state.name, this.state.email, evt)
        }
        onReset={() => {
          this.setState({ name: "", email: "" });
        }}
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
          <input type="reset" value="cancel" />
        </div>
      </form>
    );
  }
}

export default AddContactForm;
