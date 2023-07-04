/** @format */

import { Input, Option, Select } from '@material-tailwind/react';
import React from 'react';

const Search = () => {
   return (
      <div>
         <form className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2">
            <Input label="Search" className="w-full sm:w-auto" />
            <Select label="Amenities" className="w-full sm:w-auto">
               <Option>Flat</Option>
            </Select>
            <Select label="Gender" className="w-full sm:w-auto">
               <Option>MALE</Option>
            </Select>
         </form>
      </div>
   );
};

export default Search;
