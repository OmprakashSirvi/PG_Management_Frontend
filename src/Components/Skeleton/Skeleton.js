/** @format */

import React from 'react';
import classNames from 'classnames';

function Skeleton({ times, className }) {
   const outerCLassNames = classNames(
      'relative',
      'overflow-hidden',
      'bg-gray-200',
      'rounded',
      'mb-2.5',
      className
   );
   const innerClassNames = classNames(
      'animate-shimmer',
      'absolute',
      'inset-0',
      '-translate-x-full',
      'bg-gradient-to-r',
      'from-gray-200',
      'via-white',
      'to-gray-200'
   );

   const boxes = Array(times)
      .fill(0)
      .map((_, index) => {
         return (
            <div key={index} className={outerCLassNames}>
               <div className={innerClassNames} />
            </div>
         );
      });

   return boxes;
}

export default Skeleton;
