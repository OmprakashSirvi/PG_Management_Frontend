/** @format */

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { getPgById } from '../../utils/ApiRequests';
import { Link } from 'react-router-dom';

const EditPg = () => {
   const [formData, setFormData] = useState({
      name: '',
      gender: '',
      address: '',
      city: '',
      description: '',
      pgType: '',
      amenities: '',
      foodType: '',
   });

   const [error, setError] = useState(null);
   const { id } = useParams();

   useEffect(() => {
      const pgById = async () => {
         try {
            const data = await getPgById(id);
         } catch (err) {
            setError(err);
         }
      };

      pgById();
   }, []);

   const handleSubmit = (event) => {
      event.preventDefault();
   };

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
   };

   return (
      <div>
         <Link to={`/pg/${id}/add-room`}>
            <button>Add Room</button>
         </Link>
         <form onSubmit={handleSubmit}>
            Name :{' '}
            <input type="text" placeholder={''} onChange={handleChange} />
            Gender : <input type="text" onChange={handleChange} />
            Address : <input type="text" onChange={handleChange} />
            City : <input type="text" onChange={handleChange} />
            Description : <input type="text" onChange={handleChange} />
            Pg TYpe : <input type="text" onChange={handleChange} />
            Amenities : <input type="text" onChange={handleChange} />
            Food Type : <input type="text" onChange={handleChange} />
            <button type="submit">Save changes</button>
            <button>Cancel</button>
         </form>
      </div>
   );
};

export default EditPg;
