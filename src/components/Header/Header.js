import { ExitToApp, Home, Search } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
    <header className="header">
      <div className="header__main">
        <div className="header__left">
          <a href={"/"} style={{ display: "flex" }}>
            <img
              className="logo"
              src="/assets/linkedin.jpg"
              alt="LinkedIn Logo"
            />
          </a>
          <div className="header__searchBar">
            <Search />
            <input type="search" placeholder="Under construction!" />
          </div>
        </div>
        <div className="header__right">
          <div className="">
            <a href={"/"}>
              <HeaderOption Icon={Home} title="" />
            </a>
          </div>
          {user ? (
            <div className="profileDiv">
              <div className="">
                <a href={`${user.userName}`}>
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
                  </div>
                </a>
              </div>

              <div
                className="signOutButton"
                onClick={() => {
                  auth.signOut();
                  dispatch(logout());
                }}
              >
                <ExitToApp fontSize="large" />
              </div>
            </div>
          ) : (
            <a href="/login">Login</a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
