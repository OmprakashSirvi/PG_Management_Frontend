/** @format */

import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import './PgCard.css';

const PgCard = ({ item }) => {
   return (
      <Card sx={{ maxWidth: 345 }}>
         <CardMedia
            component="img"
            height="140"
            image={item.image}
            alt={item.name}
         />

         <CardContent>
            <Typography gutterBottom variant="h5" component="div">
               {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               {item.city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               {item.gender}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               {item.foodType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               Available Beds: {item.availableBeds}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               Minimum Rent: {item.minRent}
            </Typography>
            <Link to={`/pg/${item.id}`}>
               <button>View Details</button>
            </Link>
         </CardContent>
      </Card>
   );
};

export default PgCard;
