import React, {Component} from "react";
import axios from "axios";

export default class SigninForm extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            username: "",
            password: "", 
            errorMessage:""
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
            password: this.state.password
        }
        axios({
            url: "/auth/login",
            method: "POST",
            data: user
        })
        .then((response)=>{
            const isAuthenticated = response.data.isAuthenticated;
            window.localStorage.setItem("isAuthenticated",isAuthenticated);
            this.props.history.push("/admin/consola");
        })
        .catch((error)=>{
            this.setState({
                errorMessage: error.response.statusText
            })
            console.log("Error: ",error.response);
        });
    }

        render(){
            return(
                <div>
                    <h1>Debajo del reflector</h1>
                    <form onSubmit = {this.onSubmit}>
                        <div className = "form-group">
                            <input type = "text"
                            required
                            className = "form-control"
                            value = {this.state.username}
                            onChange = {this.onChangeUsername}
                            />
                        </div>
                        <div className = "form-group">
                            <input type = "password"
                            required
                            className = "form-control"
                            value = {this.state.password}
                            onChange = {this.onChangePassword}
                            />
                        </div>
                        <div className = "form-group">
                            <input type = "submit" value = "Entra al mundo" className = "btn btn-primary"/>
                        </div>
                        <p>{this.state.errorMessage}</p>
                    </form>
                </div>
            );
        }
}