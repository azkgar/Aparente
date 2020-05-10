import React, {Component} from "react";
import axios from "axios";
import {Editor} from "@tinymce/tinymce-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import qs from "qs";

export default class EditPosts extends Component {
    constructor (props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            title: "",
            date: new Date(),
            content: "",
            authors: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/writescribir/post/"+this.props.match.params.id)
            .then(response => {
                this.setState ({
                    username: response.data.username,
                    title: response.data.title,
                    date: new Date(response.data.date),
                    content: response.data.content
                });
            })
            .catch(function(error){
                console.log(error);
            });
        axios.get("http://localhost:5000/writescribir/writescritor/")
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        authors: response.data.map(writer=>writer.username)
                    });
                }
            });
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }
    onChangeDate(date){
        this.setState({
            date: date
        });
    }
    onChangeContent = (e) => {
        const content = e.target.getContent()
        this.setState({
            content: content
        });
    }
    onSubmit(e){
        e.preventDefault();
        const editedPost = {
            username: this.state.username,
            title: this.state.title,
            date: this.state.date,
            content: this.state.content
        }
        console.log(editedPost);

        axios.post("http://localhost:5000/writescribir/post/editar/"+this.props.match.params.id, editedPost)
            .then(res=>console.log(res.data));
        
        window.location = "/admin/consola";
    }

    render(){
        return(
            <div>
                <h2>Edita el post</h2>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Autor: </label>
                        <select
                        required
                        className = "form-control"
                        value = {this.state.username}
                        onChange={this.onChangeUsername}>
                            {
                                this.state.authors.map(function(writer){
                                return <option
                                key = {writer}
                                value = {writer} > {writer}
                                </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className = "form-group">
                        <label>Título: </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value={this.state.title}
                        onChange = {this.onChangeTitle}
                        />
                    </div>
                    <div className = "form-group">
                            <label>Fecha: </label>
                            <div>
                                <DatePicker
                                    selected = {this.state.date}
                                    onChange = {this.onChangeDate}
                                />
                            </div>
                    </div>
                    <div>
                            <label>Contenido: </label>
                            <Editor
                                apiKey= {process.env.REACT_APP_TINYMCE_API_KEY}
                                initialValue = {this.state.content}
                                init={{
                                    selector: "textarea",
                                    height: 500,
                                    menubar: "insert",
                                    plugins: [
                                        'advlist autolink lists link image', 
                                        'charmap print preview anchor help',
                                        'searchreplace visualblocks code',
                                        'insertdatetime media table paste wordcount'
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | bold italic | \
                                        alignleft aligncenter alignright | \
                                        bullist numlist outdent indent | help | image',
                                    image_description: true,
                                    image_title: true,
                                    image_caption: true,
                                    }}
                                onChange={this.onChangeContent}
                            />
                    </div>
                    <div className = "form-group">
                        <input type = "submit" value = "Editar post"
                        className = "btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}