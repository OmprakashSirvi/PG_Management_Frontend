/** @format */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

function OwnerOptions({ handleDeletePg }) {
   return (
      <>
         <Button variant="filled">
            <Link to="edit">Edit Pg</Link>
         </Button>
         <Button color="green">
            <Link to="view-residents">View All Residents</Link>
         </Button>
         <Button color="red" onClick={handleDeletePg}>
            Delete Pg
         </Button>
      </>
   );
}

export default OwnerOptions;
