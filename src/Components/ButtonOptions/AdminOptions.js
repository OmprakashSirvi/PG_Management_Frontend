/** @format */

import React from 'react';
import { Button } from '@material-tailwind/react';
import { approvePg } from '../../Api/ApiRequests';
import { useRouteLoaderData } from 'react-router-dom';

function AdminOptions() {
   const pgDetails = useRouteLoaderData('pg-detail');
   const [approveSuccess, setApproveSuccess] = React.useState(false);

   const handleApprovePg = async () => {
      const res = await approvePg(pgDetails.id);

      if (!res) {
         setApproveSuccess(false);
         window.alert('Something went wrong, Pg was not approved ');
      }

      setApproveSuccess(true);
      window.alert('Pg Approved');
   };

   return (
      <>
         {!pgDetails.approved && !approveSuccess && (
            <Button variant="gradient" color="green" onClick={handleApprovePg}>
               Approve Pg
            </Button>
         )}
         {approveSuccess && <>Pg Approved</>}
         <Button variant="gradient" color="red">
            {!pgDetails.approved ? 'Reject Pg' : 'Disapprove Pg'}
         </Button>
      </>
   );
}

export default AdminOptions;
