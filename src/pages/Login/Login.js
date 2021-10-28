import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SignIn from "../../components/Login/SignIn/SignIn";
import SignUp from "../../components/Login/SignUp/SignUp";
import { selectUser } from "../../features/userSlice";
import "./Login.css";

const Login = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const user = useSelector(selectUser);

  const history = useHistory();
  if (user) history.push("/");

  return (
    <div className="login">
      <div className="appLogo">
        <img src="/assets/linkedin.jpg" alt="LinkedIn Logo" />
      </div>
      {showSignIn ? (
        <SignIn setShowSignIn={setShowSignIn} />
      ) : (
        <SignUp setShowSignIn={setShowSignIn} />
      )}
    </div>
  );
};

export default Login;
