/** @format */

import React from 'react';
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

   const isSubmitting = navigation.state === 'submitting';

   const handleCancel = () => {
      navigate('..');
   };

   return (
      <div>
         <Form method={method}>
            <p>{data && data.message}</p>
            Name :{' '}
            <input
               type="text"
               name="name"
               defaultValue={event ? event.name : ''}
            />
            Gender :{' '}
            <input
               type="text"
               name="gender"
               defaultValue={event ? event.gender : ''}
            />
            Address :{' '}
            <input
               type="text"
               name="address"
               defaultValue={event ? event.address : ''}
            />
            City :{' '}
            <input
               type="text"
               name="city"
               defaultValue={event ? event.city : ''}
            />
            Description :{' '}
            <input
               type="text"
               name="description"
               defaultValue={event ? event.description : ''}
            />
            Pg TYpe :{' '}
            <input
               type="text"
               name="pgType"
               defaultValue={event ? event.pgType : ''}
            />
            <button disabled={isSubmitting}>
               {isSubmitting ? 'Saving..' : 'Save'}
            </button>
            <button
               type="button"
               onClick={handleCancel}
               disabled={isSubmitting}
            >
               Cancel
            </button>
         </Form>
      </div>
   );
};

export async function action({ request, params }) {
   const method = request.method;
   console.log(method);
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
