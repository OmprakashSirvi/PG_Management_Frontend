/** @format */

import React from 'react';
import { Typography, MenuItem } from '@material-tailwind/react';

import {
   HomeModernIcon,
   InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

// nav list component
const navListItems = [
   {
      label: 'PG',
      icon: HomeModernIcon,
      path: '/pg',
   },
   {
      label: 'About Us',
      icon: InformationCircleIcon,
      path: '/about-us',
   },
];

const NavList = () => {
   console.log('test');
   return (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
         {navListItems.map(({ label, icon, path }, key) => (
            <Typography
               key={label}
               variant="small"
               color="blue-gray"
               className="font-normal"
            >
               <MenuItem className="flex items-center gap-2 lg:rounded-full">
                  {React.createElement(icon, {
                     className: 'h-[18px] w-[18px]',
                  })}{' '}
                  <Link to={path}> {label}</Link>
               </MenuItem>
            </Typography>
         ))}
      </ul>
   );
};

export default NavList;
