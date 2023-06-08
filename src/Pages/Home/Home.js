/** @format */

import { Typography } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../../Components/FeatureCard/FeatureCard';
import './Home.css';

const Home = () => {
   const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

   return (
      <div className="home">
         <div className="pt-24">
            <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
               <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                  <h1 className="my-4 text-5xl font-bold leading-tight">
                     Paying Guest Management Tool
                  </h1>
                  <p className="leading-normal text-2xl mb-8">
                     Just the right tool you have been looking for to manage and
                     find your perfect PG
                  </p>
                  <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                     <Link to="/pg">Search Pg</Link>
                  </button>
               </div>
               <div className="w-full md:w-3/5 py-6 text-center">
                  <img
                     className="w-full md:w-4/5 z-50"
                     src={`${REACT_APP_API_URL}/api/v1/images/user/homepagepg.png`}
                  />
               </div>
            </div>
         </div>

         <hr className="w-48 h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-10 dark:bg-gray-900"></hr>

         <div className="items-center text-center">
            <Typography variant="h2" className="p-2 mb-4">
               Features
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 ml-4 mt-8">
               <FeatureCard
                  image="https://www.catoncommercial.com/wp-content/uploads/2020/08/property_management_services.jpg"
                  title="View Pgs in your area"
                  description="You can view approved pgs in different locations"
                  buttonName="View Pgs"
                  buttonLinkTo="/pg"
               />
               <FeatureCard
                  image="https://www.libertystaffing.ca/hubfs/Looking_for_an_Office_Role_Apply_to_Liberty_Staffing.jpg#keepProtocol"
                  title="Dynamic Role selection"
                  description="You can dynamically change your role, and this application will behave as you wish with dynamic permissions"
                  buttonName="Select Role"
                  buttonLinkTo="/select-role"
               />
               <FeatureCard
                  image="https://findlicensedcontractor.com/wp-content/uploads/2019/05/business-owner.jpg"
                  title="Manage your PGs"
                  description="You can sign up as an owner and manage your existing PGs with various features like guest management and rent collection management"
                  buttonName="View my Pgs"
                  buttonLinkTo="/pg?mode=owner"
               />
               <FeatureCard
                  image="https://thumbs.dreamstime.com/b/real-estate-finance-concept-money-glass-rent-word-107776472.jpg"
                  title="View Your rent information"
                  description="As a guest, you can view your existing stay in a registered PG and access certain basic services like payment proofs and raising a request for a new bed, etc."
                  buttonName="View Profile"
                  buttonLinkTo="/profile"
               />
            </div>
         </div>

         <hr className="w-48 h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-10 dark:bg-gray-900"></hr>
         <div className="m-4 p-4">
            <Typography variant="h2">Popular Cities</Typography>
         </div>
         <Typography variant="h4" className="p-2 mb-4">
            This is yet to be implemented
         </Typography>
      </div>
   );
};

export default Home;
