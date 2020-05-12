import React from "react"
import ReactHtmlParser from "react-html-parser";
import {Link} from "react-router-dom";

const Post = (props) =>{
   return( 
   <div>
        <div>
            <h4>{props.post.title}</h4>
            <p>{props.post.categories}</p>
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
</div>);
}

export default Post