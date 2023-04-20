/** @format */

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Pg from '../Pages/PG/Pg';
import PgDetails from '../Pages/PgDetails/PgDetails';
import Profile from '../Pages/Profile/Profile';
import Rooms from '../Pages/Rooms/Rooms';

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
            <Route path="/pg/:id/room" element={<Rooms />} />
         </Routes>
      </div>
   );
};

export default AppRoutes;
