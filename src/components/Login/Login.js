import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { auth, storage } from "../../firebaseConfig";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();

  const signIn = (e, isGuest) => {
    e.preventDefault();
    let email = signInEmail;
    let password = signInPassword;
    if (isGuest) {
      email = "test@user.com";
      password = "testuser";
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        // setSignInError("Signin Succesfful!");
        const { email, uid, displayName, photoURL } = userAuth.user;
        dispatch(
          login({
            email,
            uid,
            displayName,
            photoURL,
          })
        );
      })
      .catch((error) => {
        if (`${error.message}`.includes("There is no user"))
          setSignInError("User record not found!");
        else if (`${error.message}`.includes("The password is invalid"))
          setSignInError("Invalid Password!");
        else setSignInError(error.message);
        console.log(error.message);
      });
  };

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
      .then((userAuth) => {
        const { user } = userAuth;
        user
          .updateProfile({ displayName: name, photoURL: profilePicURL })
          .then(() => {
            // const { email, uid, displayName, photoURL } = user;
            dispatch(
              login({
                email: signUpEmail,
                uid: user.uid,
                displayName: name,
                photoURL: profilePicURL,
              })
            );
            // dispatch(login({ email, uid, displayName, photoURL }));
          });
      })
      .catch((error) => {
        setSignUpError(error.message);
        console.log(error.message);
      });
  };

  // signin items
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // signup items
  const [name, setName] = useState("");
  const [profilePicURL, setProfilePicURL] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref(file.name);
    storageRef.put(file).then(async () => {
      const url = await storageRef.getDownloadURL();
      setProfilePicURL(url);
    });
  };

  const [showSignIn, setShowSignIn] = useState(true);
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  return (
    <div className="loginMain">
      <div className="login">
        <div className="appLogo">
          <img src="/assets/linkedin.jpg" alt="LinkedIn Logo" />
        </div>
        {showSignIn ? (
          <form onSubmit={(e) => signIn(e)}>
            <div className="labelInput">
              <label>Email</label>{" "}
              <input
                type="email"
                value={signInEmail}
                placeholder="Email"
                onChange={(e) => setSignInEmail(e.target.value)}
                required
              />
              <span className="requiredField">*</span>
            </div>
            <div className="labelInput">
              <label>Password</label>{" "}
              <input
                type="password"
                value={signInPassword}
                placeholder="Password"
                onChange={(e) => setSignInPassword(e.target.value)}
                required
              />
              <span className="requiredField">*</span>
            </div>
            {signInError ? <p>{signInError}</p> : <br />}
            <div className="userAction">
              <input type="submit" value="Sign In" />
              <input
                type="button"
                onClick={(e) => signIn(e, true)}
                value="Guest Login"
              />
              <p onClick={() => setShowSignIn(false)}>Create an account?</p>
            </div>
          </form>
        ) : (
          <form onSubmit={(e) => signUp(e)}>
            <div className="labelInput">
              <label>Full Name</label>{" "}
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="requiredField">*</span>
            </div>
            <div className="labelInput">
              <label>Profile Pic</label>{" "}
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                placeholder="Profile Pic"
                onChange={(e) => {
                  uploadFile(e);
                }}
              />
            </div>
            <div className="labelInput">
              <label>Email</label>{" "}
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                required
              />
              <span className="requiredField">*</span>
            </div>
            <div className="labelInput">
              <label>Password</label>{" "}
              <input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                required
              />
              <span className="requiredField">*</span>
            </div>
            {signUpError ? <p>{signUpError}</p> : <br />}
            <div className="userAction">
              <input type="submit" value="Sign Up" />
              <p onClick={() => setShowSignIn(true)}>
                Already have an account? Sign In
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
