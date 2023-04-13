/** @format */

import { Link } from 'react-router-dom';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { Home, Login, AccountCircle } from '@mui/icons-material';
import ApartmentIcon from '@mui/icons-material/Apartment';

const NavContainer = styled('div')`
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: #f0f0f0;
   height: 60px;
   padding: 10px;
   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
   margin-bottom: 40px;
`;

const NavLinks = styled(Stack)`
   display: inline;
   align-items: center;
   justify-content: space-between;
   width: fixed;
`;

const NavLink = styled(Link)`
   color: #333;
   font-weight: bold;
   text-decoration: none;
   margin: 20px;
   &:hover {
      color: #666;
   }
`;

const NavIcon = styled(({ icon, ...props }) => {
   const Icon = icon;
   return <Icon {...props} />;
})`
   margin-right: 5px;
`;

const NavBar = () => {
   return (
      <NavContainer>
         <NavLinks>
            <NavLink to="/">
               <NavIcon icon={Home} />
               Home
            </NavLink>
            <NavLink to="/pg">
               <NavIcon icon={ApartmentIcon} />
               Pg
            </NavLink>
            <NavLink to="/login">
               <NavIcon icon={Login} />
               Login
            </NavLink>
         </NavLinks>
      </NavContainer>
   );
};

export default NavBar;
