/** @format */

import { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar/NavBar';
import AppRoutes from '../Routes/AppRoutes';
import './App.css';

function App() {
   const [login, setLogin] = useState(false);

   useEffect(() => {
      if (localStorage.getItem('jwt') !== null) setLogin(true);
   }, [localStorage.getItem('jwt')]);

   return (
      <div className="App">
         <NavBar isLoggedIn={login} />
         <AppRoutes />
      </div>
   );
}

export default App;
