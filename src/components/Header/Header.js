import {
  Group,
  Home,
  Message,
  NotificationImportant,
  Search,
  ShoppingBasket,
} from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { logout, selectUser } from "../../features/userSlice";
import { auth } from "../../firebaseConfig";
import "./Header.css";

const HeaderOption = ({ Icon, title }) => {
  return (
    <div className="headerOption">
      {Icon && <Icon className="icon" />}
      <p>{title}</p>
    </div>
  );
};

const Header = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const deleteUser = () => {
    const user = auth.currentUser;
    user
      .delete()
      .then(() => {
        dispatch(logout());
        alert("User deleted!");
      })
      .catch((err) => alert(err.message));
  };

  // const history = useHistory();

  // useEffect(() => {
  //   history.location.pathname === "/login"
  //     ? history.push("/")
  //     : history.push("/login");
  // }, [user]);

  // already defined in app.js
  // useEffect(() => {
  //   auth.onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       console.log(userAuth);
  //       const { displayName, email, photoURL } = userAuth;
  //       dispatch(login({ displayName, email, photoURL }));
  //     } else dispatch(logout());
  //   });
  // }, []);

  return (
    <Router>
      <header className="header">
        <div className="header__main">
          <div className="header__left">
            {/* Link not working */}
            <a href="/">
              <img
                className="logo"
                src="/assets/linkedin.jpg"
                alt="LinkedIn Logo"
              />
            </a>
            <div className="header__searchBar">
              <Search />
              <input type="search" placeholder="Search" />
            </div>
          </div>
          <div className="header__right">
            <a href="/">
              {" "}
              <HeaderOption Icon={Home} title="Home" />
            </a>
            <HeaderOption Icon={Group} title="My Network" />
            <HeaderOption Icon={ShoppingBasket} title="Jobs" />
            <HeaderOption Icon={Message} title="Messaging" />
            <HeaderOption Icon={NotificationImportant} title="Notifications" />
            {user ? (
              <div className="headerOption">
                <div className="profileImage">
                  {user.displayName && user?.photoURL ? (
                    <img src={user?.photoURL} alt="Profile" />
                  ) : (
                    <p>
                      {!user?.displayName
                        ? ""
                        : user?.displayName[0].toUpperCase()}
                    </p>
                  )}
                </div>
                <p
                  onClick={() => {
                    auth.signOut();
                    dispatch(logout());
                  }}
                >
                  SignOut
                </p>
                {user?.email !== "test@user.com" ? (
                  <p onClick={() => deleteUser()}>Delete Account</p>
                ) : (
                  <p>U can't delete me!</p>
                )}
              </div>
            ) : (
              <a href="/login">Login</a>
            )}
          </div>
        </div>
      </header>
    </Router>
  );
};

export default Header;
