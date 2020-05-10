import React, {Component} from "react"; //usa react & component
import {Link} from "react-router-dom"; //nos deja agregar links a las rutas con react-router-dom

export default class Navbar extends Component { 
    handleClick(e){
        window.localStorate.clear();
    }
    render(){ 
        return( 
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/admin" className ="navbar-brand">Consola de creación</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/admin/consola" className="nav-link">Posts</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/admin/crea" className="nav-link">Nuevo post</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/admin/usuarios" className="nav-link">Administrador de Usuarios</Link>
                    </li>
                    <li className="navbar-item">
                                    <a className = "btn btn-light" href="http://localhost:5000/auth/logout" onClick = {this.handleClick}  role="button">
                                       Log out
                                    </a>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
}