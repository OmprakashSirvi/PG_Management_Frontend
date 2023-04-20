/** @format */

import { useEffect, useState } from 'react';

import NavBar from '../Components/NavBar/NavBar';
import AppRoutes from '../Routes/AppRoutes';

import { getMe } from '../utils/ApiRequests';

import './App.css';
import { useLocation } from 'react-router-dom';
import { getCurrUserRole } from '../Contexts/CurrUserRole';

function App() {
   const [login, setLogin] = useState(false);
   const location = useLocation();

   useEffect(() => {
      console.log('Refreshing App.js');
      console.log(getCurrUserRole());
      if (localStorage.getItem('jwt') === null) {
         setLogin(false);
         return;
      }

      const verifyUser = async () => {
         try {
            const data = await getMe();

            if (data !== null) {
               setLogin(true);
            }

            if (data === false) {
               setLogin(false);
               return;
            }
         } catch (err) {
            setLogin(false);
         }
      };

      verifyUser();
   }, [location.pathname]);

   return (
      <div className="App">
         <NavBar isLoggedIn={login} />
         <AppRoutes />
      </div>
   );
}

export default App;
