import {
  CalendarViewDay,
  Create,
  EventNote,
  Image,
  VideoLibrary,
} from "@material-ui/icons";
import firebase from "firebase";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import { db } from "../../../firebaseConfig";
import "./AppFeed.css";
import Post from "./Post";

const AppFeed = () => {
  const InputOption = ({ Icon, title, color }) => {
    return (
      <div
        className="inputOption"
        onClick={() => {
          if (title === "Image") console.log(inputFileRef.current.click());
        }}
      >
        <Icon style={{ color }} />
        <span>{title}</span>
      </div>
    );
  };

  /*
  posts =
  [
    `doc.id` :
        {
          postTime : "ServerTimeStamp",
          postText : "",
          postMedia : ["imgUrls"],
          postLikes : "",
          postComments : ["comments"],
          postAuthorId : "authorId",
        }
  ]
  */
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [empty, setEmpty] = useState(false); // whether postInput is empty

  const authorProfile = useSelector(selectUser);

  useEffect(() => {
    db.collection("posts")
      .orderBy("postTime", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      );
  }, []);

  const sendPost = (e) => {
    e.preventDefault();
    if (input) {
      db.collection("posts")
        .add({
          postTime: firebase.firestore.FieldValue.serverTimestamp(),
          postText: input,
          postMedia: [],
          postLikes: 0,
          postComments: [],
          postAuthorName: authorProfile.displayName,
          postAuthorUid: authorProfile.uid,
        })
        .then(() => setInput(""))
        .catch((err) => {
          alert("Message not sent! Check your network connection!");
        });
    } else {
      setEmpty(true);
      setTimeout(() => setEmpty(false), 3000);
    }
  };

  const inputFileRef = useRef();

  // const authorProfile = {
  //   authorImageUrl: "http://localhost:3000/assets/linkedin.jpg",
  //   authorName: "Test",
  //   authorDescription: "I'm a test user!",
  //   authorId: "283828",
  // };

  return (
    <div className="feed">
      <div className="feed__input">
        <div className="feed__inputContainer">
          <Create />
          <form>
            <input
              type="text"
              placeholder="Start a post"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            {empty && <p>!</p>}
            <button onClick={sendPost} type="submit"></button>
          </form>
        </div>
        <div className="feed__inputOptionContainer">
          <InputOption Icon={Image} title="Image" color="#70B5F9" />
          <InputOption Icon={VideoLibrary} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNote} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDay}
            title="Write article"
            color="#75C15E"
          />
        </div>
      </div>
      <div className="feed__posts">
        {posts &&
          posts.map((post) => (
            <Post
              key={post.id}
              // postAuthorId={post.postAuthorId} // right now we are not sending any authorId
              postContent={post}
            />
          ))}
      </div>
      {/* Input file fragment */}
      <Fragment>
        <input
          type="file"
          name="image"
          accept=".png,.jpeg,.jpg,.webp"
          ref={inputFileRef}
          // onChange={handleImageUploadAndRender}
          hidden
        />
      </Fragment>
    </div>
  );
};

export default AppFeed;
