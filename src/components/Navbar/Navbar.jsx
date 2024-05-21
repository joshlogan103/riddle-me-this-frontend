import React from "react";
import { DropdownMenu } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { Button, Box, Flex } from "@radix-ui/themes";
import { TextAlignJustifyIcon } from "@radix-ui/react-icons";

const Navbar = () => {
  return (
    <div className="navbar">
      <DropdownMenu.Root className="menu-root">
        <DropdownMenu.Trigger>
          <Button m="3" variant="surface">
            <TextAlignJustifyIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            <NavLink to="/">Home</NavLink>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <NavLink to="/browse">Browse</NavLink>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <NavLink to="/profile">Profile</NavLink>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <NavLink to="/creator-control-panel">Create</NavLink>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default Navbar;
