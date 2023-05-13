/** @format */

import React from 'react';
import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export default function AppFooter() {
   return (
      <footer className="border-t border-blue-gray-50 mt-32 bg-blue-gray-800">
         <div className="flex max-w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  py-6 text-center md:justify-between ml-4 mr-4">
            <Typography color="white" className="font-normal ml-2">
               &copy; Paying Guest Management
            </Typography>
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
               <li>
                  <Typography
                     color="white"
                     className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 mr-10"
                  >
                     <Link to="/contact-us">Contact Us</Link>
                  </Typography>
               </li>
            </ul>
         </div>
      </footer>
   );
}
