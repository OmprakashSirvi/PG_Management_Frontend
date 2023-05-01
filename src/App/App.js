/** @format */

import React, { useEffect, useState } from 'react';

import AppRoutes from '../Routes/AppRoutes';

import './App.css';
import { useLocation } from 'react-router-dom';
import AppNavbar from '../Components/AppNavbar/AppNavbar';
import { useSelector } from 'react-redux';

function App() {
   const auth = useSelector((state) => state.auth.user);

   const [login, setLogin] = useState(false);
   const location = useLocation();

   useEffect(() => {
      if (auth.status === 'Success') {
         setLogin(true);
      } else {
         setLogin(false);
      }
   }, [location.pathname]);

   return (
      <div className="App">
         <AppNavbar login={login} />
         <AppRoutes className="routes" />
      </div>
   );
}

export default App;
