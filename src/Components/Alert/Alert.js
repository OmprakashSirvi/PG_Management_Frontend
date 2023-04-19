/** @format */

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Alert.css';

const Alert = ({ type, message }) => {
   const notify = () => {
      toast[type](message);
   };

   const alertClass = `${styles.alert} ${styles[type]}`;

   return (
      <>
         <div className={alertClass} onClick={notify}>
            <span className={styles.message}>{message}</span>
         </div>
         <ToastContainer />
      </>
   );
};

export default Alert;
