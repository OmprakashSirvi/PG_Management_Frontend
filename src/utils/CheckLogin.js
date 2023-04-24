/** @format */
import { getMe } from './ApiRequests';

export function CheckLogin() {
   if (localStorage.getItem('jwt') === null) {
      return false;
   }

   const verifyUser = async () => {
      try {
         const data = await getMe();
         if (data !== null) {
            return true;
         }
      } catch (err) {
         return false;
      }
   };

   return verifyUser();
}
