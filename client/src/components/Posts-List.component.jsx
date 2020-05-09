import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import PropTypes from "prop-types";

const Post = props => (

    <div>
        <div>
        <h4>{props.post.title}</h4>
        <p>{props.post.date.substring(0,10)}</p>
        <div>{ReactHtmlParser(props.post.content)}</div>
        <p>{props.post.content.substring(0,30) + "..." }</p>
        <p>{props.post.username}</p>
    </div>
    <div>
        <Link to = {"/admin/edita/"+props.post._id}>
            <input type= "button" value= "Editar post" />
        </Link>
    </div>
    <div>
        <input type="button" value="Eliminar post" onClick = {()=>{props.deletePost(props.post._id)}} />
    </div>
    </div>
)

export default class PostsList extends Component {

    constructor(props){
        super(props);
        this.deletePost = this.deletePost.bind(this);
        this.state = {posts:[], auth:[]};
    }


    componentDidMount(){
        axios.get("http://localhost:5000/writescribir/post")
            .then(response=>{
                this.setState({posts: response.data});
            })
            .catch((error)=> {
                console.log(error);
            });
        axios.get("http://localhost:5000/auth/login/success")
            .then(response=>{
                this.setState({auth: response.data})
                console.log(response);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    deletePost(id){
        axios.delete("http://localhost:5000/writescribir/post/"+id)
            .then(res=>console.log(res.data));
        this.setState({
            posts: this.state.posts.filter (el => el._id !== id)
        });
    }

    postsList(){
        return this.state.posts.map(currentpost=>{
            return <Post post={currentpost}
            deletePost = {this.deletePost} key={currentpost._id}/>;
        });
    }

    render(){
        /*const {authenticated} = true;*/
        
        return(
            <div>
                {/*{!authenticated ? (
                    <div>
                    <h1>¡Alerta de intruso!</h1>
                    <p>Enviando dirección IP y captura de cámara</p>
                    </div>
                ) : (*/}
                <div>
                <h1>Bienvenido a la consola de admin.</h1>
                <div className = "col-sm-4">
                            <div className = "card">
                                <div className = "card-body">
                                    <a className = "btn btn-block btn social btn google" href="http://localhost:5000/auth/logout" role="button">
                                       Log out
                                    </a>
                                </div>
                            </div>
                        </div>
                {this.postsList()}
                </div>
                )}
                
            </div>
        );
    }
}