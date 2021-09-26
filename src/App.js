import React, { useEffect } from "react";
import {} from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AppFeed from "./components/AppFeed/Content/AppFeed";
import Sidebar from "./components/AppFeed/SideBar/Sidebar";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Widgets from "./components/Widgets/Widgets";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebaseConfig";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const { displayName, uid, email, photoURL } = userAuth;
        dispatch(login({ displayName, uid, email, photoURL }));
      } else dispatch(logout());
    });
  }, []);

  return (
    <div className="app">
      <Header />
      {!user ? (
        <Login />
      ) : (
        // App Feed
        <div className="appFeed">
          <div className="leftSideBar">
            <Sidebar />
          </div>
          <div className="center">
            <AppFeed />
          </div>
          {/* // Widgets */}
          <div className="rightSideBar">
            <Widgets />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

// <Router>
//   <Route exact path="/login">
//     <Login />
//   </Route>
//   <Route exact path="/profile"></Route>
//   <Route exact path="/"></Route>
//   <Route exact path="/*"></Route>
// </Router>
