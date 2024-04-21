import React from "react";
import Menu from "../Menu";

function MenuApp({ data }) {
  return (
    <div className="menu-app">
      {data.map((menu) => (
        <Menu key={menu.menuName} {...menu} />
      ))}
    </div>
  );
}

export default MenuApp;
