/** @format */

import React from 'react';
import { useParams } from 'react-router';

const AddRoom = () => {
   const { id } = useParams();
   return <div>AddRoom Page for {id}</div>;
};

export default AddRoom;
