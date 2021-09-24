import React from "react";

const IconText = ({ Icon, title, color }) => {
  return (
    <div className="iconText">
      <Icon style={{ color }} />
      <span>{title}</span>
    </div>
  );
};

export default IconText;
