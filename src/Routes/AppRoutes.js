/** @format */

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Pg from '../Pages/PG/Pg';
import PgDetails from '../Pages/PgDetails/PgDetails';
import Profile from '../Pages/Profile/Profile';

const AppRoutes = () => {
   return (
      <div>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pg" element={<Pg />} />
            <Route path="/pg/:id" element={<PgDetails />} />

            {/**Protected routes */}
            <Route path="/profile" element={<Profile />} />
         </Routes>
      </div>
   );
};

export default AppRoutes;
