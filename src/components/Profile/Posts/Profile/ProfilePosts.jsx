import React from "react";
import "../Posts.css";
import Post from "../Post";
import { useDispatch, useSelector } from "react-redux";

function ProfilePosts(props) {
  const posts = useSelector(state => [...state.profilePage.profilePosts])
  let postElement = posts.map( p => <Post avatar={p.avatar} name={p.name} login={p.login} message={p.message} />);

  return (
    <div className="posts">
      <div className="posts__container">
        {postElement}
      </div>
    </div>
  );
}

export default ProfilePosts;
