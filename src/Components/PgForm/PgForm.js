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

import { createNewPg } from '../../utils/ApiRequests';

const PgForm = ({ method }) => {
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
            Name : <input type="text" name="name" />
            Gender : <input type="text" name="gender" />
            Address : <input type="text" name="address" />
            City : <input type="text" name="city" />
            Description : <input type="text" name="description" />
            Pg TYpe : <input type="text" name="pgType" />
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

export async function action({ request }) {
   const data = await request.formData();
   const newPg = {
      name: data.get('name'),
      gender: data.get('gender'),
      address: data.get('address'),
      city: data.get('city'),
      pgType: data.get('pgType'),
   };

   const res = await createNewPg(newPg);

   if (res.status === 400) {
      return res;
   }

   if (!res || !res.ok) {
      throw json({ message: 'something went wrong', status: 500 });
   }

   return redirect('/');
}

export default PgForm;
