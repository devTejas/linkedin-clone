import React from "react";
import { useHistory } from "react-router";
import "./Post.css";

const Post = () => {
  const history = useHistory();
  console.log(history.location);

  return (
    <div>
      Post
      <p></p>
    </div>
  );
};

export default Post;
