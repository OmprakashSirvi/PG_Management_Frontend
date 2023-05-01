/** @format */

import React from 'react';

import {
   Navbar,
   MobileNav,
   Typography,
   IconButton,
} from '@material-tailwind/react';

import { Bars2Icon } from '@heroicons/react/24/outline';

import ProfileMenu from './ProfileMenu/ProfileMenu';
import NavList from './NavList/NavList';

import './AppNavbar.css';
import { Link, NavLink } from 'react-router-dom';

export default function AppNavbar({ login }) {
   const [isNavOpen, setIsNavOpen] = React.useState(false);
   const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

   React.useEffect(() => {
      window.addEventListener(
         'resize',
         () => window.innerWidth >= 800 && setIsNavOpen(false)
      );
   }, []);

   return (
      <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-lg py-2 px-4 lg:px-8 lg:py-4 app-navbar">
         <div className="relative mx-auto flex items-center text-blue-gray-900">
            <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
               <NavLink
                  to={''}
                  className={({ isActive }) => {
                     return isActive ? 'underline' : undefined;
                  }}
               >
                  {' '}
                  Paying Guest Management
               </NavLink>
            </Typography>
            <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
               <NavList />
            </div>

            <IconButton
               size="sm"
               color="blue-gray"
               variant="text"
               onClick={toggleIsNavOpen}
               className="ml-auto mr-2 lg:hidden"
            >
               <Bars2Icon className="h-6 w-6" />
            </IconButton>
            {!login && (
               <div className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
                  <NavLink
                     to={'login'}
                     className={({ isActive }) => {
                        return isActive ? 'hidden' : undefined;
                     }}
                     end
                  >
                     Login
                  </NavLink>
               </div>
            )}
            {login && <ProfileMenu />}
         </div>
         <MobileNav open={isNavOpen} className="overflow-scroll">
            <NavList />
         </MobileNav>
      </Navbar>
   );
}
