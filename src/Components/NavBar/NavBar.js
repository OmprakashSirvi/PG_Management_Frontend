/** @format */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack, Menu, MenuItem, IconButton } from '@mui/material';
import { Home, Menu as MenuIcon, Login } from '@mui/icons-material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { NavLink as NavLinkBuilder } from '../../Contexts/NavLink';

const NavContainer = styled('div')`
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: #f0f0f0;
   height: 60px;
   padding: 10px;
   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
   margin: 25px;

   @media screen and (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
      height: auto;
      padding: 10px 0;
   }
`;

const NavLinks = styled(Stack)`
   display: inline;
   align-items: center;
   margin: 40px;
   padding: 20px;

   @media screen and (max-width: 600px) {
      display: none;
   }
`;

const NavLink = styled(Link)`
   color: #333;
   font-weight: bold;
   padding: 0 10px;
   margin-right: 25px;
   textdecoration: 'none';
   @media screen and (max-width: 600px) {
      display: block;
      padding: 10px;
   }
`;

const MenuButton = styled(IconButton)`
   display: none;

   @media screen and (max-width: 600px) {
      display: block;
   }
`;

function NavBar() {
   const [anchorEl, setAnchorEl] = useState(null);

   const NavLinkList = [
      new NavLinkBuilder(<Home />, 'Home', '/'),
      new NavLinkBuilder(<ApartmentIcon />, 'Pg', '/pg'),
      new NavLinkBuilder(<Login />, 'Login', '/login'),
   ];

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <NavContainer>
         <NavLinks>
            {NavLinkList.map((link, index) => {
               return (
                  <NavLink
                     key={index}
                     to={`${link.route}`}
                     style={{ textDecoration: 'none' }}
                  >
                     {link.icon} {link.value}
                  </NavLink>
               );
            })}
         </NavLinks>
         <MenuButton onClick={handleClick}>
            <MenuIcon />
         </MenuButton>
         <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
         >
            {NavLinkList.map((link, index) => {
               return (
                  <MenuItem onClick={handleClose}>
                     <NavLink
                        key={index}
                        to={`${link.route}`}
                        style={{ textDecoration: 'none' }}
                     >
                        {link.icon} {link.value}
                     </NavLink>
                  </MenuItem>
               );
            })}
         </Menu>
      </NavContainer>
   );
}

export default NavBar;
