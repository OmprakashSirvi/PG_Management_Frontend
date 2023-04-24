/** @format */

import React from 'react';

const AddPg = () => {
   const handleChange = (event) => {};
   return (
      <div>
         <form>
            Name : <input type="text" onChange={handleChange} />
            Gender : <input type="text" onChange={handleChange} />
            Address : <input type="text" onChange={handleChange} />
            City : <input type="text" onChange={handleChange} />
            Description : <input type="text" onChange={handleChange} />
            Pg TYpe : <input type="text" onChange={handleChange} />
            Amenities : <input type="text" onChange={handleChange} />
            Food Type : <input type="text" onChange={handleChange} />
            <button type="submit">Save</button>
            <button>Cancel</button>
         </form>
      </div>
   );
};

export default AddPg;
