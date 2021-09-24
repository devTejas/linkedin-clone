import React, { useEffect } from "react";
import { ThumbUp, Message, Share, Send } from "@material-ui/icons";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import { auth } from "../../../firebaseConfig";

// postAuthorId -> uid of the post of the Author
const Post = ({ postContent }) => {
  // useEffect(() => {}, [postAuthorId]);

  /**
   * postMedia - ["url"]
   * postComments - ["comment"]
   * postLikes - number
   */
  const { postAuthorName, postText, postMedia, postLikes, postComments } =
    postContent;

  const PostActionOption = ({ Icon, title, value, color, onClickFn }) => {
    return (
      <div className="postActionOption" onClick={onClickFn}>
        <Icon style={{ color }} />
        {value}
        <p>{title}</p>
      </div>
    );
  };

  return (
    <div className="post">
      <div className="authorBody">
        {postAuthorName && (
          // <Avatar src={photoURL} alt="Author Image" />
          <Avatar src={""} alt="Author Image">
            {postAuthorName[0]}
          </Avatar>
        )}
        <div className="authorAbout">
          <h3>{postAuthorName}</h3>
        </div>
      </div>
      <div className="postBody">
        <div className="postBody__text">
          <p>{postText}</p>
        </div>
        {postMedia && (
          <div className="mediaSection">
            {postMedia.map((mediaUrl, index) => {
              return <img key={index} src={mediaUrl} alt="Media" />;
            })}
          </div>
        )}
        {/* {postLikes && (
          <div className="likesSection">
            <ThumbUp style={{ color: "#4c8dce" }} />
            <p>{postLikes}</p>
          </div>
        )} */}
        {postComments && (
          <div className="commentSection">
            {postComments.map((comment, index) => {
              return <p key={index}>{comment}</p>;
            })}
          </div>
        )}
        <div className="postAction">
          <PostActionOption
            Icon={ThumbUp}
            title="Likes"
            value={postLikes}
            color="#4c8dce"
            onClickFn={() => {}}
          />
          <PostActionOption Icon={Message} title="Comment" color="#4c8dce" />
          <PostActionOption Icon={Share} title="Share" color="#4c8dce" />
          <PostActionOption Icon={Send} title="Send" color="#4c8dce" />
        </div>
      </div>
    </div>
  );
};

export default Post;
