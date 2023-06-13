/** @format */

import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { addPgImage } from '../../Api/ApiRequests';

const AddImage = () => {
   const pgDetails = useRouteLoaderData('pg-detail');

   const [images, setImages] = useState([]);
   const [showForm, setShowForm] = useState(false);

   useEffect(() => {
      setImages(pgDetails?.image);
   }, [pgDetails]);

   const handleImageUpload = async (event) => {
      const file = event.target.files[0];

      if (file.size > 1000000) {
         alert('Image size should be less than 1MB');
         event.target.value = null;
         return;
      }

      console.log('Uploading the image');
      const res = await addPgImage(pgDetails.id, file);

      console.log(res);

      // You would typically use a function from your backend here to upload the image
      //   const newImageUrl = await uploadImage(file);
      // placeholder function

      // Append the new image URL to the state
      //   setImages((prevImages) => [...prevImages, newImageUrl]);
   };

   return (
      <div>
         Add Pg Image page
         <div className="flex flex-wrap justify-center items-center">
            {images.map((image, index) => {
               return (
                  <div
                     key={index}
                     className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  >
                     {image}
                  </div>
               );
            })}
            <Button
               color="red"
               variant="outlined"
               className="hover:text-red-800"
               onClick={() => setShowForm(!showForm)}
            >
               Add Image
            </Button>
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
