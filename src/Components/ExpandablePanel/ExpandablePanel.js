/** @format */

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

const ExpandablePanel = ({ header, children }) => {
   const [expanded, setExpanded] = useState(false);
   function handleClick() {
      setExpanded(!expanded);
   }

   return (
      <div className="mb-6 border rounded-md">
         <div onClick={handleClick} className="cursor-pointer">
            <div className="flex p-2 justify-between border text-center align-middle">
               <div className="flex flex-row justify-between text-center align-middle">
                  {header}
               </div>
               {expanded ? (
                  <ChevronDownIcon strokeWidth={2.5} className="h-4 w-4" />
               ) : (
                  <ChevronLeftIcon strokeWidth={2.5} className="h-4 w-4" />
               )}
            </div>
         </div>
         {expanded && <div className="p-2 border-t">{children}</div>}
      </div>
   );
};

export default ExpandablePanel;
