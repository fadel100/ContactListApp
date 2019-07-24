import React from "react";
import "./Contact.css";
/**
 * My component Contact that renders a Contact with the ability to delete and update
 *
 * @module Contact
 * @extends Component
 */
class Contact extends React.Component {
  /**
   * @type {object}
   * @property {boolean} editMode - true if editmode is toggled on
   */
  state = {
    editMode: false
  };

  /**
   * toggles the state editMode
   * @function toggleEditMode
   * @return {null}
   *
   */
  toggleEditMode = () => {
    const editMode = !this.state.editMode;
    this.setState({ editMode });
  };

  /**
   * reads input from the form and updates the contact
   * @function onSubmit
   * @param {SyntheticEvent} evt- event that triggered the response
   * @return {null} - calls updateContact and toggles the edit mode
   */
  onSubmit = evt => {
    evt.preventDefault();

    const name = evt.target.input_name.value;
    const email = evt.target.input_email.value;

    const { id, updateContact } = this.props;

    updateContact(id, { name, email });
    this.toggleEditMode();
  };

  /**
   * renders the Contact as view only
   * @function renderView
   * @return {ReactElement} - displays name and email with delete and update buttons
   */
  renderView = () => {
    const { id, name, email, deleteContact } = this.props;
    return (
      <div className="Contact-container">
        <h4>
          <b>{name}</b>
        </h4>
        <p>{email}</p>
        <button className="App-button" onClick={() => deleteContact(id)}>
          delete
        </button>
        <button className="App-button" onClick={this.toggleEditMode}>
          edit
        </button>
      </div>
    );
  };

  /**
   * renders the Contact as edit
   * @function renderEdit
   * @return {ReactElement} - displays form to update name and email
   */
  renderEdit = () => {
    const { id, name, email } = this.props;
    return (
      <div className="Contact-container">
        <form onSubmit={this.onSubmit} onReset={this.toggleEditMode}>
          <input type="text" name="input_name" defaultValue={name} />
          <input type="text" name="input_email" defaultValue={email} />
          <div>
            <input type="submit" value="ok" />
            <input type="reset" value="cancel" />
          </div>
        </form>
      </div>
    );
  };

  /**
   * renders the contact depending on editMode value
   * @function render
   * @return {undefined} - calls renderEdit or renderView
   */
  render() {
    return this.state.editMode ? this.renderEdit() : this.renderView();
  }
}
export default Contact;
