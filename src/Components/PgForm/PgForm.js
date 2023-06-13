/** @format */

import React from 'react';
import { Form, json, useActionData, useNavigation } from 'react-router-dom';

import { createNewPg, editPg } from '../../Api/ApiRequests';
import { Typography } from '@material-tailwind/react';

const PgForm = ({ method, event }) => {
   const navigation = useNavigation();
   const data = useActionData();

   const isSubmitting = navigation.state === 'submitting';

   return (
      <div className="flex justify-center">
         <div
            className=" bg-gray-700 sd:w-full md:px-5 md:py-5 lg:w-1/2 py-10 text-white h-max "
            style={{ padding: '20px 70px' }}
         >
            <Form method={method} className="form flex flex-col gap-2">
               <Typography variant="h4" className="text-red-400">
                  {data && data.error && data.message}
               </Typography>
               <div>
                  <div className="flex flex-col gap-2">
                     <div className="flex gap-4">
                        <div className="flex flex-col items-start gap-2">
                           <label htmlFor="fname"> Name</label>
                           <input
                              type="text"
                              id="name"
                              className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline w-full"
                              name="name"
                              defaultValue={event ? event.name : ''}
                           />
                        </div>
                        <div className="flex flex-col items-start gap-2 flex-1">
                           <label htmlFor="gender">Gender</label>
                           <select
                              name="gender"
                              id="gender"
                              defaultValue={event ? event.gender : ''}
                              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline  w-full  "
                           >
                              <option value="MALE">Male</option>
                              <option value="FEMALE">Female</option>
                           </select>
                        </div>
                     </div>
                     <div className="flex flex-col items-start gap-2">
                        <label htmlFor="address">Address</label>
                        <textarea
                           type="textarea"
                           id="address"
                           defaultValue={event ? event.address : ''}
                           className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline w-full"
                           name="address"
                        />
                     </div>

                     <div className="flex gap-4">
                        <div className="flex flex-col items-start gap-2">
                           <label htmlFor="city">City</label>
                           <input
                              type="text"
                              id="city"
                              className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline w-full"
                              name="city"
                              defaultValue={event ? event.city : ''}
                           />
                        </div>
                        <div className="flex flex-col items-start gap-2 flex-1">
                           <label htmlFor="pg-type">PG Type</label>
                           <select
                              name="pgType"
                              id="pgType"
                              defaultValue={event ? event.pgType : ''}
                              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline  w-full"
                           >
                              <option value="Flat">Flat</option>
                              <option value="Tenament">Tenament</option>
                           </select>
                        </div>
                     </div>
                     <div className="flex flex-col items-start gap-2">
                        <label htmlFor="description">Description</label>
                        <textarea
                           type="textarea"
                           id="description"
                           className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline w-full"
                           name="description"
                        />
                     </div>
                  </div>
               </div>
               <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                     className="bg-#8b5cf6 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full"
                     style={{
                        backgroundColor: '#8b5cf6',
                        width: '30%',
                        marginTop: '10px',
                     }}
                  >
                     {isSubmitting ? 'Saving..' : 'Save'}
                  </button>
               </div>
            </Form>
         </div>
      </div>
   );
};

export async function action({ request, params }) {
   const method = request.method;
   const data = await request.formData();

   // BUG: pgType is null
   const newPg = {
      name: data.get('name') || 'TestPg1',
      gender: data.get('gender') || 'MALE',
      address: data.get('address') || 'TEST ADDRESS',
      city: data.get('city') || 'TEST CITY',
      pgType: data.get('pgType') || 'Flat',
      description: data.get('description') || 'Just a description',
   };

   console.log('New Pg is ', newPg);

   console.log('Method is ', method);

   if (newPg.name === '' || newPg.name === null) {
      return { message: 'Name is required', status: 400, error: true };
   }

   if (newPg.gender === '' || newPg.gender === null) {
      return { message: 'Gender is required', status: 400, error: true };
   }

   if (newPg.address === '' || newPg.address === null) {
      return { message: 'Address is required', status: 400, error: true };
   }

   if (newPg.city === '' || newPg.city === null) {
      return { message: 'City is required', status: 400, error: true };
   }

   if (newPg.pgType === '' || newPg.pgType === null) {
      return { message: 'PG Type is required', status: 400, error: true };
   }

   let res;

   if (method === 'POST') {
      console.log('Creating new Pg');
      res = await createNewPg(newPg);
   } else if (method === 'PATCH') {
      const id = params.id;
      res = await editPg(newPg, id);
   }

   console.log(res);

   if (!res) {
      throw json({
         message: 'You are unauthorized to access this, tokens are invalid',
         status: 403,
      });
   }

   if (!res.ok) {
      throw json({ message: 'something went wrong', status: 500 });
   }

   if (res.status === 400) {
      return res;
   }

   return { message: 'New Pg is created', status: 200, error: false };
}

export default PgForm;
