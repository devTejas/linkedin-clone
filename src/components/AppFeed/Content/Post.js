import { Avatar } from "@material-ui/core";
import {
  Close,
  Create,
  Delete,
  FileCopyRounded,
  Message,
  ThumbUp,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../../features/userSlice";
import { db } from "../../../firebaseConfig";
import "./Post.css";

// postAuthorId -> uid of the post of the Author or userName(currently it's userName)
const Post = ({ postContent }) => {
  // if user and postAuthor are same then show the delete and edit buttons
  const [showAction, setShowAction] = useState(false);

  const user = useSelector(selectUser);

  const {
    postAuthorUid,
    postAuthorName,
    postText,
    postMedia,
    postLikes,
    postComments,
  } = postContent;

  // useEffect(() => {
  //   console.log("Comparing user.uid & postAuthorUid");
  //   if (user?.uid === postAuthorUid) setShowAction(true);
  // }, [user?.uid, postAuthorUid]);

  useEffect(() => {
    console.log(user, postContent);
    if (user?.userName === postAuthorUid) setShowAction(true);

    console.clear();
  }, [user?.userName, postAuthorUid]);

  const updatePost = (action) => {
    console.log("updatePost", postContent);
    try {
      const docRef = db.collection("posts").doc(postContent.id);
      if (showAction) {
        // value their then edit else delete
        if (input) {
          docRef
            .update({ ...postContent, postText: input })
            .then(() => setInput(""));
        } else {
          docRef.delete();
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  /**
   * postMedia - ["url"]
   * postComments - ["comment"]
   * postLikes - number
   */

  const [input, setInput] = useState("");
  const [toggleLike, setToggleLike] = useState(false);
  const [textCopied, setTextCopied] = useState(false);

  const likeAction = () => {
    const docRef = db.collection("posts").doc(postContent.id);
    // if toggleLike=true ie it's already liked by current user else it's not liked
    let likeCounter = toggleLike ? postLikes - 1 : postLikes + 1;
    docRef
      .update({ ...postContent, postLikes: likeCounter })
      .then(() => setToggleLike(!toggleLike));
  };

  const copyToClipBoardAction = () => {
    navigator.clipboard.writeText(postText);
    setTextCopied(true);
    setTimeout(() => setTextCopied(false), 3000);
  };

  const PostActionOption = ({ Icon, title, value, color }) => {
    return (
      <div
        className="postActionOption"
        onClick={() => {
          if (title === "Likes") likeAction();
          else if (title === "Copy") copyToClipBoardAction();
        }}
      >
        <Icon style={{ color }} />
        {value}
        <p>{title}</p>
      </div>
    );
  };

  return (
    <div className="post">
      {showAction && user && (
        <Delete className="actionButton" onClick={() => updatePost()} />
      )}
      {showAction && user && (
        <Create className="actionButton" onClick={() => setInput(postText)} />
      )}
      <Link to={`${postAuthorUid}`}>
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
      </Link>
      <div className="postBody">
        <div className="postBody__text">
          <p>{postText}</p>
          {input && (
            <form className="postEditContainer">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Close
                style={{ cursor: "pointer" }}
                onClick={() => setInput("")}
              />
              <input
                type="submit"
                value=""
                onClick={(e) => {
                  e.preventDefault();
                  updatePost();
                }}
              />
            </form>
          )}
        </div>
        {postMedia && (
          <div className="mediaSection">
            {postMedia.map((mediaUrl, index) => (
              <img
                key={index}
                src={mediaUrl}
                alt="Media"
                id={`postMediaImage${index}`}
                onClick={() => {
                  let imgEle = document.getElementById(
                    `postMediaImage${index}`
                  );
                  document.fullscreenElement === null
                    ? imgEle.requestFullscreen()
                    : document.exitFullscreen();
                  console.log(imgEle);
                }}
              />
            ))}
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
          {user && (
            <PostActionOption
              Icon={ThumbUp}
              title="Likes"
              value={postLikes}
              color="#4c8dce"
            />
          )}
          <PostActionOption Icon={Message} title="Comment" color="#4c8dce" />
          <PostActionOption
            Icon={FileCopyRounded}
            title={!textCopied ? `Copy` : `Text Copied!`}
            color="#4c8dce"
          />
        </div>
      </div>
    </div>
  );
};

export default Post;

/**
 * If showAction is true
 * If value exists then it's Edit
 * If value not their then it's Delete
 *
 * If showAction is false then it's like
 */
