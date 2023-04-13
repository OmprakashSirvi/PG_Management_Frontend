/** @format */

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Pg from '../Components/PG/Pg';

const AppRoutes = () => {
   return (
      <div>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pg" element={<Pg />} />
         </Routes>
      </div>
   );
};

export default AppRoutes;
