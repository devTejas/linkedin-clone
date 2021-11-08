import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Post from "./components/AppFeed/Content/Post";
import Header from "./components/Header/Header";
import { login, logout } from "./features/userSlice";
import { auth } from "./firebaseConfig";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import { getUserDataByEmail } from "./services/authenticationRequests";
import AuthRoute from "./services/AuthRoute";

const App = () => {
  const dispatch = useDispatch();

  // already defined in header.js but commented
  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        let userData = await getUserDataByEmail(userAuth.email, "App.jsUE");
        dispatch(login({ ...userData }));
        // const { displayName, uid, email, photoURL } = userAuth;
        // dispatch(login({ displayName, uid, email, photoURL }));
      } else dispatch(logout());
    });

    console.clear();
  }, []);

  return (
    <div>
      <Header />
      <div className="app">
        <Router>
          <main>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/:id" component={Profile} />
              <Route exact path="/post/:id" component={Post} />
              <AuthRoute path="/post" component={Post} />
              <Route exact path="/" component={Home} />
              <Route exact path="/*" component={Home} />
            </Switch>
          </main>
        </Router>
      </div>
    </div>
  );
};

export default App;

// My Dream will awaken in sleepy eyes Hold my hands if I fall asleep There will be a crown on the head and My Head will be the palace If I stop writing, cut off my hands!

//  Mera khwaab jagega nind bhari aakhon mein. Aankh lage toh thaamb lena haath mere. Taj chadega sar mehal banega. Kabhi likhna rukhe toh, kaat dena haat mere.
