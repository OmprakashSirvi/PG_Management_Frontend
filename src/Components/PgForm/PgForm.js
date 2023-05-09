/** @format */

import React, { useState } from 'react';
import {
   Form,
   json,
   redirect,
   useActionData,
   useNavigate,
   useNavigation,
} from 'react-router-dom';

import { createNewPg, editPg } from '../../utils/ApiRequests';

const PgForm = ({ method, event }) => {
   const navigate = useNavigate();
   const navigation = useNavigation();
   const data = useActionData();
   const [details, setDetails] = useState({
      name: "",address:"",gender:"",city:"",pg_type:"",description:""

   })
  
   const isSubmitting = navigation.state === 'submitting';

   const handleCancel = () => {
      navigate('..');
   };
   const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setDetails(details => ({ ...details, [name]: value }))
   }

   const handleSubmit = () => {
      console.log(details)
   }
   return (
      <div className='flex justify-center'>
         <div
            className=" bg-gray-700 sd:w-full md:px-5 md:py-5 lg:w-1/2 py-10 text-white h-max "
            style={{ padding: "20px 70px" }}
         >
            <Form method={method} onSubmit={handleSubmit} className="form flex flex-col gap-2">
               <p>{data && data.message}</p>
               <div>

               <div className='flex flex-col gap-2'>
                  <div className='flex gap-4'>

                     <div className='flex flex-col items-start gap-2'>

                        <label htmlFor="fname"> Name</label>
                        <input
                           type="text"
                           id="name"
                           className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline w-full"
                           name="name"
                           onChange={handleChange}
                           value={details.name}
                        />
                     </div>
                     <div className='flex flex-col items-start gap-2 flex-1'>

                        <label htmlFor="gender">Gender</label>
                        <select
                           name="gender"
                           id="gender"
                           className="shadow appearance-none border rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline  w-full  "
                           onChange={handleChange}



                        >
                           <option selected disabled>
                              Select Gender
                           </option>

                           <option value="MALE">Male</option>
                           <option value="FEMALE">Female</option>

                        </select>
                     </div>
                  </div>
                  <div className='flex flex-col items-start gap-2'>
                     <label htmlFor="address">Address</label>
                     <textarea
                        type="textarea"
                        id="address"
                        className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline w-full"
                        name="address"
                        onChange={handleChange}
                        value={details.address}
                     />
                  </div>


                 
                     <div className='flex gap-4'>

                        <div className='flex flex-col items-start gap-2'>

                           <label htmlFor="city">City</label>
                           <input
                              type="text"
                              id="city"
                              className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline w-full"
                              name="city"
                              onChange={handleChange}
                              value={details.city}
                           />
                        </div>
                        <div className='flex flex-col items-start gap-2 flex-1'>

                           <label htmlFor="pg-type">PG Type</label>
                           <select
                              name="pg-type"
                              id="pg_type"
                              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline  w-full"
                              onChange={handleChange}
                              value={details.pg_type}

                           >
                              <option selected disabled>
                                 Select
                              </option>

                              <option value="AC">AC</option>
                              <option value="NON AC">NON AC</option>

                           </select>
                        </div>
                     </div>
                     <div className='flex flex-col items-start gap-2'>
                        <label htmlFor="description">Description</label>
                        <textarea
                           type="textarea"
                           id="description"
                           className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline w-full"
                           name="description"
                           onChange={handleChange}
                           value={details.description}
                        />
                     </div>

                  </div>
               </div>
               <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className="bg-#8b5cf6 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full" style={{ backgroundColor: "#8b5cf6", width: "30%", marginTop: "10px" }}>


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
   const newPg = {
      name: data.get('name'),
      gender: data.get('gender'),
      address: data.get('address'),
      city: data.get('city'),
      pgType: data.get('pgType'),
   };
   let res;
   if (method === 'POST') {
      res = await createNewPg(newPg);
   } else if (method === 'PATCH') {
      const id = params.id;
      res = await editPg(newPg, id);
   }

   if (!res) {
      throw json({ message: 'Not a valid method', status: 500 });
   }

   if (res.status === 400) {
      return res;
   }

   if (!res || !res.ok) {
      throw json({ message: 'something went wrong', status: 500 });
   }

   return redirect('/');
}

export default PgForm;
