import React, { Component } from 'react';
import './Header.css'
class Header extends Component {
  
  render() { 
    return ( 
        <div className="Header-nav">
          <ul>
            <li>
              <a className="active" href="#home">
                Home
              </a>
            </li>
            <li>
              <a href="#news">My Contacts</a>
            </li>
            <li>
              <a href="#contact">Add Contact</a>
            </li>
            
          </ul>
        </div>
      
     );
  }
}
 
export default Header;