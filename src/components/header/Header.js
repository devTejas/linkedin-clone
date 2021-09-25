import React, { useEffect } from "react";
import {
  Search,
  Home,
  Group,
  ShoppingBasket,
  Message,
  NotificationImportant,
} from "@material-ui/icons";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../features/userSlice";
import { auth } from "../../firebaseConfig";

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
    <div className="header">
      <div className="header__main">
        <div className="header__left">
          <img
            className="logo"
            src="/assets/linkedin.jpg"
            alt="LinkedIn Logo"
          />
          <div className="header__searchBar">
            <Search />
            <input type="search" placeholder="Search" />
          </div>
        </div>
        <div className="header__right">
          <HeaderOption Icon={Home} title="Home" />
          <HeaderOption Icon={Group} title="My Network" />
          <HeaderOption Icon={ShoppingBasket} title="Jobs" />
          <HeaderOption Icon={Message} title="Messaging" />
          <HeaderOption Icon={NotificationImportant} title="Notifications" />
          {user && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
