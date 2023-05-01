/** @format */
import { useSelector } from 'react-redux';
import { getMe } from './ApiRequests';

export function CheckLogin() {
   const auth = useSelector((state) => state.auth.user);

   if (auth.status)
      if (localStorage.getItem('jwt') === null) {
         return false;
      }

   const verifyUser = async () => {
      try {
         const data = await getMe();
         if (data !== null) {
            localStorage.setItem('currRole', data[0].role);
            return true;
         }
      } catch (err) {
         return false;
      }
   };

   return verifyUser();
}
