import React from 'react';

class Contact extends React.Component{
  state={
    editMode:false
  }

  toggleEditMode= () =>
  {
    const editMode = !this.state.editMode;
    this.setState({editMode});
  }
  onSubmit = (evt) =>{
    evt.preventDefault();

    const name = evt.target.input_name.value;
    const email = evt.target.input_email.value;

    const {id, updateContact} = this.props;

    updateContact(id, {name, email});
    this.toggleEditMode();
  }

  renderView = () =>
  {
    const {id, name, email ,deleteContact} = this.props
    return <div>
      <span>{name} - {email}</span>
      <button onClick={()=>deleteContact(id)}>delete</button>
      <button onClick={this.toggleEditMode}>edit</button>
    </div>
  }

  renderEdit = () =>
  {
    const {id, name, email} = this.props
    return (
    <form onSubmit={this.onSubmit} onReset = {this.toggleEditMode}>
            <input 
            type="text"
            name='input_name'
            defaultValue={name}
            ></input>
            <input
             type="text"
             name= 'input_email'
             defaultValue={email}
             
            ></input>
            <div>
              <input type="submit" value='ok'></input>
              <input type="reset" value='cancel'></input>
            </div>
            </form>);
  }

  render(){
    return(
     this.state.editMode?
       this.renderEdit()
      
      :
        this.renderView()
      
    )
  }
}
export default Contact