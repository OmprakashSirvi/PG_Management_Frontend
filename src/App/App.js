/** @format */

import { useEffect, useState } from 'react';

import NavBar from '../Components/NavBar/NavBar';
import AppRoutes from '../Routes/AppRoutes';

import './App.css';
import { useLocation } from 'react-router-dom';
import { CheckLogin } from '../utils/CheckLogin';

function App() {
   const [login, setLogin] = useState(false);
   const location = useLocation();

   useEffect(() => {
      setLogin(CheckLogin());
   }, [location.pathname]);

   return (
      <div className="App">
         <NavBar isLoggedIn={login} />
         <AppRoutes />
      </div>
   );
}

export default App;
