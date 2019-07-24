import React, { Component } from "react";
import Contact from "../Contact/Contact.js";
import { Transition } from "react-spring/renderprops";
import "./ContactList.css";

/**
 * My component ContactList that loops over each contact to render
 *
 * @module ContactList
 */
class ContactList extends Component {
  /**
   * Renders the component.
   * @function render
   * @return {ReactElement} markup
   *
   */
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
          {contact => style => (
            <div style={style} className="Contact-card">
              <Contact
                key={contact.id}
                id={contact.id}
                name={contact.name}
                email={contact.email}
                updateContact={this.props.updateContact}
                deleteContact={this.props.deleteContact}
              />
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

export default ContactList;
