/** @format */

import {
   Avatar,
   Button,
   Menu,
   MenuHandler,
   MenuItem,
   MenuList,
   Typography,
} from '@material-tailwind/react';

import {
   UserCircleIcon,
   ChevronDownIcon,
   Cog6ToothIcon,
   LifebuoyIcon,
   BellIcon,
   HomeModernIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';

let profileMenuItems = [
   {
      label: 'My Profile',
      icon: UserCircleIcon,
      path: 'profile',
   },
   {
      label: 'Edit Profile',
      icon: Cog6ToothIcon,
      path: 'edit-profile',
   },
   {
      label: 'Notifications',
      icon: BellIcon,
      path: 'notifications',
   },
   {
      label: 'Change Role',
      icon: LifebuoyIcon,
      path: 'select-role',
   },
];

const ProfileMenu = ({ role }) => {
   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
   const closeMenu = () => setIsMenuOpen(false);

   if (role === 'ROLE_OWNER') {
      profileMenuItems = [
         {
            label: 'My Profile',
            icon: UserCircleIcon,
            path: 'profile',
         },
         {
            label: 'My Pgs',
            icon: HomeModernIcon,
            path: 'pg?mode=owner',
         },
         {
            label: 'Edit Profile',
            icon: Cog6ToothIcon,
            path: 'edit-profile',
         },
         {
            label: 'Notifications',
            icon: BellIcon,
            path: 'notifications',
         },
         {
            label: 'Change Role',
            icon: LifebuoyIcon,
            path: 'select-role',
         },
      ];
   }
   return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
         <MenuHandler>
            <Button
               variant="text"
               color="blue-gray"
               className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
            >
               <Avatar
                  variant="circular"
                  size="md"
                  src="https://listrick.com/wp-content/uploads/2019/11/Famous-Cartoon-Characters-with-Big-Noses-2.jpg"
                  alt="User"
                  className="border border-blue-500 p-0.5"
               />
               <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3 w-3 transition-transform ${
                     isMenuOpen ? 'rotate-180' : ''
                  }`}
               />
            </Button>
         </MenuHandler>
         <MenuList className="p-1">
            {profileMenuItems.map(({ label, icon, path }, key) => {
               const isLastItem = key === profileMenuItems.length - 1;
               return (
                  <MenuItem
                     key={label}
                     onClick={closeMenu}
                     className={`flex items-center gap-2 rounded ${
                        isLastItem
                           ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                           : ''
                     }`}
                  >
                     {React.createElement(icon, {
                        className: `h-4 w-4 ${
                           isLastItem ? 'text-red-500' : ''
                        }`,
                        strokeWidth: 2,
                     })}
                     <Link to={path}>
                        <Typography
                           as="span"
                           variant="small"
                           className="font-normal"
                           color={isLastItem ? 'red' : 'inherit'}
                        >
                           {label}
                        </Typography>
                     </Link>
                  </MenuItem>
               );
            })}
         </MenuList>
      </Menu>
   );
};

export default ProfileMenu;
