/** @format */

import { Button, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { addPgImage, deletePgImage } from '../../Api/ApiRequests';
import { XMarkIcon } from '@heroicons/react/24/outline';

const AddImage = () => {
   // eslint-disable-next-line no-undef
   const API_URL = process.env.REACT_APP_API_URL;

   const pgDetails = useRouteLoaderData('pg-detail');

   const [images, setImages] = useState([]);
   const [showForm, setShowForm] = useState(false);

   useEffect(() => {
      setImages(pgDetails?.image);
   }, [pgDetails]);

   const handleDeleteImage = async (index) => {
      const imageNameReq = { imageName: images[index] };

      // Delete the image from the server
      const res = await deletePgImage(pgDetails.id, imageNameReq);

      if (!res.ok) {
         alert('Something went wrong');
         return;
      }

      // Now delete the image from the list of images
      const newImages = images.filter((image, i) => i !== index);
      setImages(newImages);
   };

   const handleImageUpload = async (event) => {
      const file = event.target.files[0];

      if (file.size > 1000000) {
         alert('Image size should be less than 1MB');
         event.target.value = null;
         return;
      }

      const res = await addPgImage(pgDetails.id, file);

      if (!res.ok) {
         alert('Something went wrong');
         return;
      }

      const resData = await res.json();

      // Set the list of images with the new list of images
      setImages(resData.data);
   };

   return (
      <div>
         <Typography variant="h5" className="justify-center">
            Manage Pg images
         </Typography>
         <Typography>Click on add Image to add images</Typography>
         <Typography>You can also delete Images here</Typography>
         <div className="flex flex-wrap justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            {images &&
               images.map((image, index) => {
                  return (
                     <div
                        key={index}
                        className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 relative overflow-hidden" // Add overflow-hidden
                     >
                        <img
                           src={`${API_URL}/api/v1/images/pg/${image}`}
                           alt="image"
                           loading="lazy"
                           className="object-cover w-full h-full rounded-lg shadow-md transform group-hover:scale-110 transition-transform duration-200" // Add transform group-hover:scale-110 transition-transform duration-200
                        />
                        <button
                           className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                           onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteImage(index);
                           }}
                        >
                           <XMarkIcon className="h-4 w-4 text-red-500" />
                        </button>
                     </div>
                  );
               })}
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 flex items-center justify-center">
               <Button
                  color="red"
                  variant="outlined"
                  className="hover:text-red-800 text-red-500 border-red-500"
                  onClick={() => setShowForm(!showForm)}
               >
                  Add Image
               </Button>
            </div>
         </div>
         {showForm && (
            <input
               type="file"
               accept="image/*"
               onChange={handleImageUpload}
               className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            />
         )}
      </div>
   );
};

export default AddImage;
