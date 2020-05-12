import React, {Component} from "react";
import axios from "axios";
import Navbar from "./Navbar.component";
import Post from "./Post.component";
import PostDisplay from "./Post-Display.component";

export default class PostsList extends Component {
    
    constructor(props){
        super(props);
        this.deletePost = this.deletePost.bind(this);
        this.lastPost = this.lastPost.bind(this);
        this.state = {
            posts: [],
        }
        
    }

    componentDidMount(){

        axios.get("http://localhost:5000/writescribir/post")
            .then(response=>{
                this.setState({posts: response.data});
            })
            .catch((error)=> {
                console.log(error);
            });
    }

    deletePost(id){
        axios.delete("http://localhost:5000/writescribir/post/"+id)
            .then(res=>{console.log(res.data); alert("Post eliminado.");});
        this.setState({
            posts: this.state.posts.filter (el => el._id !== id)
        });
    }

    postsList(){
        return this.state.posts.map((currentpost)=>{
            return <Post post={currentpost}
            deletePost = {this.deletePost} key={currentpost._id}/>;
        });
    }

    lastPost=()=>{
        const posts = this.state.posts
        return <PostDisplay posts = {posts} deletePost ={this.deletePost}/>  
    }

    handleClick(e){
        window.localStorage.clear();
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
                <h1>Bienvenido a la consola de admin.</h1>
                <h2>El último post es: </h2>
                {this.lastPost(this.state.posts)}
                <h2>Lista de todos los posts</h2>
                {this.postsList(this.state.posts)}
                </div>
                )}
                
            </div>
        );
    }
}