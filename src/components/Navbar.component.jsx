import React, {Component} from "react"; //usa react & component
import {Link} from "react-router-dom"; //nos deja agregar links a las rutas con react-router-dom

export default class Navbar extends Component { 
    render(){ 
        return( 
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className ="navbar-brand">Consola de creación</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Posts</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/redactar" className="nav-link">Nuevo post</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/user" className="nav-link">Administrador de Usuarios</Link>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
}