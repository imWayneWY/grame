import React, { useState } from "react";
import { Menu, MenuItemProps } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

const MenuBar: React.FC = () => {
  const { pathname } = useLocation();
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    { name }: MenuItemProps
  ) => setActiveItem(name || "");

  return (
    <div>
      <Menu size="massive" pointing secondary>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default MenuBar;
