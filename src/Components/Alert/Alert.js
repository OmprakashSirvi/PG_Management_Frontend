/** @format */

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = ({ type, message }) => {
   switch (type) {
      case 'success':
         toast.success(message);
         break;
      case 'error':
         toast.error(message);
         break;
      case 'warning':
         toast.warning(message);
         break;
      default:
         toast.info(message);
         break;
   }

   return (
      <div>
         <ToastContainer />
      </div>
   );
};

export default Alert;
