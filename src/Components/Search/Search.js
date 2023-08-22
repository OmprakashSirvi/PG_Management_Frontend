/** @format */

import { Input, Option, Select } from '@material-tailwind/react';
import React from 'react';
import AppButton from '../AppButton/AppButton';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Search = () => {
   return (
      <div>
         <form className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2">
            <Input size="lg" label="Name" />
            <Select label="Type" className="border-solid" id="select">
               <Option>Flat</Option>
               <Option>Row House</Option>
               <Option>Tenament</Option>
            </Select>
            <Select label="Gender" className="border-solid">
               <Option>Male</Option>
               <Option>Female</Option>
            </Select>
            <AppButton type="reset">
               <XMarkIcon strokeWidth={2.5} className="h-4 w-4 mr-2 my-auto" />
            </AppButton>
         </form>
      </div>
   );
};

export default Search;
