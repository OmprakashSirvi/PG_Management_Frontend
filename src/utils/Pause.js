/** @format */

export const Pause = (duration) => {
   return new Promise((resolve) => {
      setTimeout(resolve, duration);
   });
};
