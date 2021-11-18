import React from "react";
import { useSelector } from "react-redux";
import AppFeed from "../../components/AppFeed/Content/AppFeed";
import Sidebar from "../../components/AppFeed/SideBar/Sidebar";
import Widgets from "../../components/Widgets/Widgets";
import { selectUser } from "../../features/userSlice";
import "./Home.css";

const Home = () => {
  const user = useSelector(selectUser);

  return (
    <div>
      <div className="appFeed">
        <div className="leftSideBar">{user && <Sidebar />}</div>
        <div className="center">
          <AppFeed />
        </div>
        {/* // Widgets */}
        <div className="rightSideBar">{/* <Widgets /> */}</div>
      </div>
    </div>
  );
};

export default Home;
