import React, {Component} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreatePosts extends Component{
    constructor(props){
        super(props);

        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            author: "",
            title: "",
            date: new Date(),
            content: "",
            authors: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/writescribir/writescritor/")
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        authors: response.data.map(writer=>writer.username),
                        username: response.data[0].username
                    });
                }
            });
    }

    onChangeAuthor(e){
        this.setState({
            author: e.target.value
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

    onChangeContent(e){
        this.setState({
            content: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const post = {
            author: this.state.author,
            title: this.state.title,
            date: this.state.date,
            content: this.state.content
        }

        console.log(post);

        axios.post("http://localhost:5000/writescribir/post/redactar/", post)
            .then(res=>console.log(res.data));
        window.location = "/";

    }

    render(){
        return(
            <div>
                <h2>Escribe el nuevo post</h2>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Autor: </label>
                        <select ref = "userInput"
                        required
                        className = "form-control"
                        value = {this.state.author}
                        onChange={this.onChangeAuthor}>
                            {
                                this.state.authors.map(function(author){
                                return <option
                                key = {author}
                                value = {author} > {author}
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
                    <div className = "form-group">
                            <label>Contenido: </label>
                            <input type = "text"
                            required
                            className = "form-control"
                            value = {this.state.content}
                            onChange = {this.onChangeContent}
                            />
                    </div>
                    <div className = "form-group">
                        <input type = "submit" value = "Publicar nuevo post"
                        className = "btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}