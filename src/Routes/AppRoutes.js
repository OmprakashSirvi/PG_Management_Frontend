/** @format */

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Pg from '../Pages/PG/Pg';
import PgDetails from '../Pages/PgDetails/PgDetails';
import Profile from '../Pages/Profile/Profile';
import Rooms from '../Pages/Rooms/Rooms';
import EditPg from '../Pages/EditPg/EditPg';
import AddPg from '../Pages/AddPg/AddPg';
import AddRoom from '../Pages/AddRoom/AddRoom';
import ProtectedRoutes from '../utils/ProtectedRoutes';

const AppRoutes = () => {
   return (
      <div>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pg" element={<Pg />} />
            <Route path="/pg/:id" element={<PgDetails />} />

            {/**Protected routes */}
            <Route element={<ProtectedRoutes />}>
               <Route path="/add-pg" element={<AddPg />} />
               <Route path="/pg/:id/edit" element={<EditPg />} />
               <Route path="/pg/:id/add-room" element={<AddRoom />} />
               <Route path="/pg/:id/room" element={<Rooms />} />
               <Route path="/profile" element={<Profile />} />
            </Route>
         </Routes>
      </div>
   );
};

export default AppRoutes;
