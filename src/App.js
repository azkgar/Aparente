import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/Navbar.component";
import CreatePost from "./components/Create-Post.component";
import CreateUser from "./components/Create-User.component";


function App() {
  return (
    <Router> 
      <div className = "container">
      <Navbar /> 
      <br /> 
      <Route path="/redactar" component={CreatePost} />
      <Route path = "/nuevousuario" component = {CreateUser} />
      </div>
      
    </Router> 
  );
}

export default App;
