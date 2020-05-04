import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/Navbar.component";
import CreatePost from "./components/Create-Post.component";


function App() {
  return (
    <Router> 
      <div className = "container">
      <Navbar /> 
      <br /> 
      <Route path="/redactar" component={CreatePost} />
      </div>
      
    </Router> 
  );
}

export default App;
