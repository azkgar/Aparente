import React, {Component} from "react";
import axios from "axios";
import qs from "qs";

export default class SigninForm extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
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
            password: this.state.password
        }

        fetch("http://localhost:5000/login/",{
            method: "POST",
            //credentials: "include",
            body: qs.stringify(user),
            headers:{
                //"Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        });

        //axios.post("http://localhost:5000/login", qs.stringify(user),{
            //headers: {
                //credentials: "include",
                //"Access-Control-Allow-Credentials": true
            //}
        //});

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
                        <div className = "col-sm-4">
                            <div className = "card">
                                <div className = "card-body">
                                    <a className = "btn btn-block btn social btn google" href="http://localhost:5000/auth/google" role="button">
                                        Sign In with Google
                                    </a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
}
