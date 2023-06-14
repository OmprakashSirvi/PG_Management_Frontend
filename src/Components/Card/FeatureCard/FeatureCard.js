/** @format */

import {
   Card,
   CardHeader,
   CardBody,
   CardFooter,
   Typography,
   Button,
} from '@material-tailwind/react';

import React from 'react';
import { Link } from 'react-router-dom';

export default function FeatureCard({
   image,
   title,
   description,
   buttonName,
   buttonLinkTo,
}) {
   return (
      <Card className="m-2 w-96">
         <CardHeader color="blue-gray" className="relative h-56">
            <img
               src={image}
               alt="img-blur-shadow"
               loading="lazy"
               //    layout="fill"
            />
         </CardHeader>
         <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
               {title}
            </Typography>
            <Typography>{description}</Typography>
         </CardBody>
         <CardFooter className="pt-0">
            <Button>
               <Link to={buttonLinkTo}>{buttonName}</Link>
            </Button>
         </CardFooter>
      </Card>
   );
}
