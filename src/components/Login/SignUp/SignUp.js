import React, { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../features/userSlice";
import {
  checkUserName,
  signUp,
} from "../../../services/authenticationRequests";

const SignUp = ({ setShowSignIn }) => {
  const [userName, setUserName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const profilePicRef = useRef();

  const signUpUser = async (e) => {
    e.preventDefault();

    setError("");
    let userNameLen = userName.length;
    let passwordLen = password.length;
    if (userNameLen >= 6 && passwordLen >= 6) {
      let value = await checkUserName(userName);
      if (value) {
        const res = await signUp(userName, email, password, displayName, file);
        if (res.message) {
          setError(res.message);
        } else {
          // const {
          //   userName,
          //   email,
          //   displayName,
          //   photoURL,
          //   status,
          //   description,
          // } = res;
          // dispatch(
          //   login({ email, uid, displayName, photoURL, status, description })
          // );
          dispatch(login({ ...res }));
        }
      } else {
        setError("UserName not available!");
      }
    } else {
      let err = "";
      err =
        userNameLen < 6
          ? "UserName should be atleast 6 characters!"
          : "Password should be atleast 6 characters!";
      setError(err);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => signUpUser(e)}>
        <div className="labelInput">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <span className="requiredField">*</span>
        </div>
        <div className="labelInput">
          <label>User Name</label>
          <input
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <span className="requiredField">*</span>
        </div>
        <div
          className="labelInput"
          style={{ cursor: "pointer" }}
          onClick={() => {
            profilePicRef.current.click();
          }}
        >
          <label style={{ cursor: "pointer" }}>Profile Pic</label>
          <input style={{ cursor: "pointer" }} value="Upload Image" readonly />
        </div>
        <div className="labelInput">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span className="requiredField">*</span>
        </div>
        <div className="labelInput">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="requiredField">*</span>
        </div>
        {error ? <p>{error}</p> : <br />}
        <div className="userAction">
          <input type="submit" value="Sign Up" />
          <p onClick={() => setShowSignIn(true)}>
            Already have an account? Sign In
          </p>
        </div>
      </form>
      <Fragment>
        <input
          type="file"
          name="image"
          accept=".png,.jpeg,.jpg,.webp"
          ref={profilePicRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
        />
      </Fragment>
    </div>
  );
};

export default SignUp;
