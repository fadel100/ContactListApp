import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Header.css'
class Header extends Component {
  
  render() { 
    return ( 
        <div className="Header-nav">
          <ul>
          <li>
  <Link to="/" className="active">Home</Link>
</li>
<li>
  <Link to="/mycontacts">My Contacts</Link>
</li>
<li>
  <Link to="/addcontact">Add Contact</Link>
</li>
<li>
  <Link to="/myprofile">My Profile</Link>
</li>

            
          </ul>
        </div>
      
     );
  }
}
 
export default Header;