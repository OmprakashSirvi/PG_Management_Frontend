/** @format */
import { getMe } from './ApiRequests';

export function CheckLogin() {
   if (localStorage.getItem('jwt') === null) {
      console.log('localstorage empty');
      return false;
   }

   const verifyUser = async () => {
      try {
         const data = await getMe();
         console.log('verifying user..');

         console.log(data);
         if (data !== null) {
            return true;
         }
      } catch (err) {
         return false;
      }
   };

   verifyUser();
}
