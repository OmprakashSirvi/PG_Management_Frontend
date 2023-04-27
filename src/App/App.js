/** @format */

import React, { useEffect, useState } from 'react';

import AppRoutes from '../Routes/AppRoutes';

import './App.css';
import { useLocation } from 'react-router-dom';
import { CheckLogin } from '../utils/CheckLogin';
import AppNavbar from '../Components/AppNavbar/AppNavbar';

function App() {
   const [login, setLogin] = useState(false);
   const location = useLocation();

   useEffect(() => {
      setLogin(CheckLogin());
   }, [location.pathname]);

   return (
      <div className="App">
         <AppNavbar login={login} />
         <AppRoutes className="routes" />
      </div>
   );
}

export default App;
