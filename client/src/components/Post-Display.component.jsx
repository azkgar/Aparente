import React from "react"
import {Link} from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

const PostDisplay = (props) => {
    const length = props.posts.length;
    const last = length - 1;
    const titles = props.posts.map((currentPost)=>{ 
        return currentPost.title
    });
    const dates = props.posts.map((currentPost)=>{
        return currentPost.date.substring(0,10);
    });
    const contents = props.posts.map((currentPost)=>{
        return currentPost.content;
    });
    const usernames = props.posts.map((currentPost)=>{
        return currentPost.username;
    });
    const ids = props.posts.map((currentPost)=>{
        return currentPost._id;
    });
    return(
        <div>
            <h2>{titles[last]}</h2>
            <p>{dates[last]}</p>
            <div>{ReactHtmlParser(contents[last])}</div>
            <p>{usernames[last]}</p> 
            <div>
                <Link to = {"/admin/edita/"+ids[last]}>
                    <input type= "button" value= "Editar post" />
                </Link>
            </div>
            <div>
                <input type="button" value="Eliminar post" onClick = {()=>{props.deletePost(ids[last])}} />
            </div>
        </div>  
    );
}

export default PostDisplay;