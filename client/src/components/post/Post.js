import React from 'react'
import "./Post.scss";
import Avatar from "../avatar/Avatar";
import dummy from "../../assets/dummy.jpg"
import {AiOutlineHeart} from "react-icons/ai";

function Post({post}) {
  return (
    <div className="Post">
        <div className="heading">
            <Avatar/>
            <h4>Mohsin Khan</h4>
        </div>
        <div className="content">
            <img src={dummy} alt="" />
        </div>
        <div className="footer">
            <div className="like">
            <AiOutlineHeart className="icon"/>
            <h4>990000000 likes</h4>
            </div>
            <p className="caption">This is caption</p>
            <h6 className="time-ago">4 hours ago</h6>
        </div>
    </div>
  )
}

export default Post
