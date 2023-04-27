/** @format */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Stack, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { Home, Menu as MenuIcon, Login } from '@mui/icons-material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';

import { NavLink as NavLinkBuilder } from '../../Contexts/NavLink';

const NavContainer = styled('div')`
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: #ffe6e8;
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

const StyledAvatar = styled(Avatar)({
   backgroundColor: '#F5F5F5',
   color: '#333',
   width: '20px',
   height: '20px',
   display: 'inline',
   alignContent: 'center',
   alignItems: 'center',
});

const NavLinks = styled(Stack)`
   display: inline;
   align-items: center;
   margin: 40px;
   padding: 20px;

   &:hover: {
      boxshadow: '0px 0px 16px rgba(0, 0, 0, 0.3)';
   }

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
   &:hover: {
      boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.3)',
      transform: 'scale(1.1)',
   };
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

function NavBar({ isLoggedIn }) {
   const [anchorEl, setAnchorEl] = useState(null);
   const [imageErr, setImageErr] = useState(false);

   const handleImageError = () => {
      setImageErr(true);
   };
   const NavLinkList = [
      new NavLinkBuilder(<Home />, 'Home', '/'),
      new NavLinkBuilder(<ApartmentIcon />, 'Pg', '/pg'),
      isLoggedIn
         ? new NavLinkBuilder(
              (
                 // TODO set the profile image of the user here
                 <StyledAvatar
                    onError={handleImageError}
                    src="/user-profile.jpg"
                 >
                    {imageErr && <PersonIcon />}
                 </StyledAvatar>
              ),
              '',
              '/profile'
           )
         : new NavLinkBuilder(
              <Login style={{ marginRight: 'auto' }} />,
              'Login',
              '/login'
           ),
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
                  <MenuItem key={index} onClick={handleClose}>
                     <NavLink
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
