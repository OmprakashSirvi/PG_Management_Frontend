/** @format */

import React from 'react';

import PropTypes from 'prop-types';

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

Alert.propTypes = {
   type: PropTypes.oneOf(['error', 'warning', 'success']),
   message: PropTypes.string,
};

export default Alert;
