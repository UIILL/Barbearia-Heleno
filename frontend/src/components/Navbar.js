
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">💈 BARBEARIA DO HELENO</Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
         
          <li className="navbar-item">
            <Link to="/create" className="nav-link">CADASTRO</Link>
          </li>
          <li className="navbar-item">
            <Link to="/list" className="nav-link">CLIENTES</Link>
          </li>
          </ul>
      </div>
    </nav>
  );
}

export default Navbar;