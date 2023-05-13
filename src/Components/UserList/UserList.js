/** @format */

import {
   List,
   ListItem,
   ListItemPrefix,
   Avatar,
   Card,
   Typography,
} from '@material-tailwind/react';
import React from 'react';

export default function UserList({ user }) {
   return (
      <Card className="w-96">
         <List>
            <ListItem>
               <ListItemPrefix>
                  <Avatar variant="circular" alt="" src="" />
               </ListItemPrefix>
               <div>
                  <Typography variant="h6" color="blue-gray">
                     User1
                  </Typography>
                  <Typography
                     variant="small"
                     color="gray"
                     className="font-normal"
                  >
                     Guest
                  </Typography>
               </div>
            </ListItem>
         </List>
      </Card>
   );
}
