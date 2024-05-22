import React, { useContext } from "react";
import { DropdownMenu } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { Button, Box, Flex } from "@radix-ui/themes";
import { TextAlignJustifyIcon } from "@radix-ui/react-icons";
import { AuthContext } from "../../contexts/AuthContext";
const Navbar = () => {
  const { logout, isUserLoggedIn } = useContext(AuthContext)
  return (
    <div className="navbar">
      <DropdownMenu.Root className="menu-root">
        <DropdownMenu.Trigger>
          <Button m="3" variant="surface">
            <TextAlignJustifyIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item asChild>
            <NavLink to="/">Home</NavLink>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <NavLink to="/browse">Browse</NavLink>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <NavLink to="/profile">Profile</NavLink>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <NavLink to="/creator-control-panel">Create</NavLink>
          </DropdownMenu.Item>
          {
            isUserLoggedIn
            ? <DropdownMenu.Item asChild>
            <a onClick={logout}>Logout</a>
          </DropdownMenu.Item>
          : null
          }

        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default Navbar;
