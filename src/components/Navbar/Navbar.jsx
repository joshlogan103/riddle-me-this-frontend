import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { NavLink } from 'react-router-dom'
import "./navbar.css"
import { Button } from '@radix-ui/themes';

const Navbar = () => {
  return (
    <div className='navbar'>
        <DropdownMenu.Root className="menu-root">
            <DropdownMenu.Trigger>
                <Button>&#9776;</Button>
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
  )
}

export default Navbar