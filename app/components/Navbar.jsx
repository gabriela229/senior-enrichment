import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar(){
  return (
    <div className="navbar navbar-default">
      <div className="container-fluid">
        <ul className="nav navbar-nav navbar-right">
            <li>
              <NavLink to="/campuses" activeClassName="active">
              Campuses
              </NavLink>
            </li>
          <li>
            <NavLink to="/students" activeClassName="active">
              Students
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

