import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/Navbar.component";
import CreatePost from "./components/Create-Post.component";
import CreateUser from "./components/Create-User.component";
import PostsList from "./components/Posts-List.component";
import EditPosts from "./components/Edit-Post.component";


function App() {
  return (
    <Router> 
      <div className = "container">
      <Navbar /> 
      <br /> 
      <Route path="/" component = {PostsList}/>
      <Route path="/redactar" component={CreatePost} />
      <Route path = "/nuevousuario" component = {CreateUser} />
      <Route path = "/editarpost/:id" component = {EditPosts} />
      </div>
      
    </Router> 
  );
}

export default App;
