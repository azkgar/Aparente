import React , {Component} from "react";
import axios from "axios";
import Navbar from "./Navbar.component";

export default class CreateUser extends Component{
    constructor(props){
        super (props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            password: ""
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
        }

        axios({
            url: "/auth/register",
            method: "POST",
            data: user
        })
        .then((response)=>{
            this.props.history.push("/admin/consola");
            this.setState({
                username: "",
                password: ""
            });
        })
        .catch((error)=>{
            console.log("Error: ",error.response);
        });
    }

    render(){
        const authenticated = window.localStorage.getItem("isAuthenticated");
        return(
            <div>
                {!authenticated ? (
                    <div>
                    <h1>¡Alerta de intruso!</h1>
                    <p>Enviando dirección IP y captura de cámara</p>
                    </div>
                ) : (
                    <div>
                    <Navbar />
                <h2>Registra un nuevo escritor</h2>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Nombre de usuario: </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.username}
                        onChange = {this.onChangeUsername}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Contraseña: </label>
                        <input type = "password"
                        required
                        className = "form-control"
                        value = {this.state.password}
                        onChange = {this.onChangePassword}
                        />
                    </div>
                    <div className = "form-group">
                        <input type = "submit" value = "Crear nuevo escritor" className = "btn btn-primary"/>
                    </div>
                </form>
            </div>
                )}
            </div>
            
        );
    }
}
