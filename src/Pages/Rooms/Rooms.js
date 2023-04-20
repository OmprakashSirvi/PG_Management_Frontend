/** @format */

import React from 'react';
import { useParams } from 'react-router';

const Rooms = () => {
   const { id } = useParams();

   return <div>Rooms of pg {id}</div>;
};

export default Rooms;
