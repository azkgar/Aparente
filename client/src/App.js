import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CreatePosts from "./components/Create-Post.component";
import CreateUser from "./components/Create-User.component";
import PostsList from "./components/Posts-List.component";
import EditPosts from "./components/Edit-Post.component";
import SigninForm from "./components/Signin-Form.component";
import Home from "./components/Home.component";
import Fail from "./components/Fail.component";


function App() {
  return (
    <Router> 
      <div>
      <Switch>
      <Route exact path = "/" component = {Home} />
      <Route exact path="/admin/consola" component = {PostsList}/>
      <Route exact path="/admin/crea" component={CreatePosts} />
      <Route exact path = "/admin/usuarios" component = {CreateUser} />
      <Route exact path = "/admin/edita/:id" component = {EditPosts} />
      <Route exact path = "/admin" component = {SigninForm}/>
      <Route path = "*" component = {Fail} />
      </Switch>
      </div>
    </Router> 
  );
}

export default App;
