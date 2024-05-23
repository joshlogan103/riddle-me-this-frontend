// components/Navbar/Navbar.jsx
import React, { useContext, useRef } from "react";
import { DropdownMenu } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { Button, Box, Flex } from "@radix-ui/themes";
import { TextAlignJustifyIcon } from "@radix-ui/react-icons";
import { AuthContext } from "../../contexts/AuthContext";
import LoginDialog from "../LoginDialog/LoginDialog";
import Logo from "../Logo/Logo"; 

const Navbar = () => {
  const { logout, isUserLoggedIn } = useContext(AuthContext);
  const loginDialogRef = useRef(null);
  return (
    <div className="navbar">
      <Logo /> {/* Add the Logo component */}
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
          {isUserLoggedIn ? (
            <>
              <DropdownMenu.Item asChild>
                <NavLink to="/profile">Profile</NavLink>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <NavLink to="/creator-control-panel">Create</NavLink>
              </DropdownMenu.Item>
            </>
          ) : null}
          {isUserLoggedIn ? (
            <DropdownMenu.Item asChild>
              <Button variant="surface" onClick={logout}>
                Logout
              </Button>
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item asChild>
              <LoginDialog ref={loginDialogRef} buttonName="Login" />
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default Navbar;
