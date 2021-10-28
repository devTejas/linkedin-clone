import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../../features/userSlice";
import { signIn } from "../../../services/authenticationRequests";

const SignIn = ({ setShowSignIn }) => {
  const dispatch = useDispatch();
  console.log("useSelector(selectUser)", useSelector(selectUser));

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInUser = async (e, isGuest = false) => {
    e.preventDefault();

    const res = await signIn(isGuest, email, password);
    if (res.message) {
      setError(res.message);
    } else {
      // const { email, uid, displayName, photoURL } = res;
      // dispatch(login({ email, uid, displayName, photoURL }));
      console.log(res);
      dispatch(login({ ...res }));
    }
  };

  return (
    <div>
      <form onSubmit={(e) => signInUser(e)}>
        <div className="labelInput">
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span className="requiredField">*</span>
        </div>
        <div className="labelInput">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="requiredField">*</span>
        </div>
        {error ? <p>{error}</p> : <br />}
        <div className="userAction">
          <input type="submit" value="Sign In" />
          <input
            type="button"
            onClick={(e) => signInUser(e, true)}
            value="Guest Login"
          />
          <p onClick={() => setShowSignIn(false)}>Create an account?</p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
