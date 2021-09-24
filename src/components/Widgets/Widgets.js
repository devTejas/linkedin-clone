import React from "react";
import "./Widgets.css";

const RecentOption = ({ title }) => {
  return (
    <p>
      <span>#</span>
      {title}
    </p>
  );
};

const Widgets = () => {
  return (
    <div className="sidebarBottom">
      <div className="recent">
        <h2>Recent</h2>
        <RecentOption title="react" />
        <RecentOption title="developer" />
        <RecentOption title="projects" />
        <RecentOption title="software" />
        <RecentOption title="engineer" />
      </div>
    </div>
  );
};

export default Widgets;
