import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import "./Sidebar.css";

const Sidebar = () => {
  const user = useSelector(selectUser);

  return (
    <div className="sidebar">
      <div className="sidebarTop">
        <div className="imgBackground"></div>
        <div className="userSection">
          {user?.photoURL ? (
            <img src={user?.photoURL} alt="Profile" />
          ) : (
            <p>{!user?.displayName ? "" : user?.displayName[0]}</p>
          )}
          <h2>{user?.displayName}</h2>
          <h4>{user?.email}</h4>
          <div className="viewSection">
            <p>
              Who viewed you
              <span>2,453</span>
            </p>
            <p>
              Views on post
              <span>2,453</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
