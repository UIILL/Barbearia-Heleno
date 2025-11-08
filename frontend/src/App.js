// frontend/src/App.js
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import EditCliente from "./components/EditCliente";
import ClientesList from "./components/ClientesList";
import CreateCliente from "./components/CreateCliente";
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css'; 

  function App() {
  return (
     <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Routes>
        <Route path="/" element={<ClientesList />} /> 
        <Route path="/list" element={<ClientesList />} /> 
        <Route path="/create" element={<CreateCliente />} />
            {}
        <Route path="/edit/:id" element={<EditCliente />} /> 
        </Routes>
      </div>
    </Router>
  );

}

export default App;
