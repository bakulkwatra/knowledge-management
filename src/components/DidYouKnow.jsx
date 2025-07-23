// import React from "react";

// const DidYouKnow = () => {
//   return (
//     <div className="bg-white border border-gray-200 p-4 shadow-md rounded flex flex-col h-full">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="font-bold text-xl text-black">Did you Know ?</h2>
//         <a href="#" className="text-blue-600 text-sm hover:underline">
//           See All
//         </a>
//       </div>

//       {/* Two-column layout */}
//       <div className="grid grid-cols-2 gap-4">
//         {/* Left Column */}
//         <div className="flex flex-col space-y-2">
//           <img
//             src="/image1.png"
//             alt="Traffic Infratech Expo"
//             className="w-full h-40 object-cover rounded"
//           />
//           <p className="font-semibold text-blue-700 text-base leading-snug">
//             CMS PARTICIPATES IN TRAFFIC INFRATECH EXPO 2016
//           </p>
//           <p className="text-base leading-snug">
//             CMS Computers was awarded as Digital Enterprise of the year for
//             successfully implementing and running.
//           </p>
//         </div>

//         {/* Right Column */}
//         <div className="flex flex-col space-y-4">
//           <div className="flex space-x-3">
//             <div>
//               <img
//                 src="/image2.png"
//                 alt="Clean Energy Awards"
//                 className="w-24 h-16 object-cover rounded"
//               />
//             </div>
//             <div>
//               <p className="font-semibold text-blue-700 text-base leading-snug">
//                 CMS grabs Clean Energy Awards for its Energy Management
//                 Solutions, Mumbai, India - 18-02-2015
//               </p>
//               <p className="text-sm text-gray-800 leading-snug">
//                 CMS Computers was awarded as Digital Enterprise of the year for
//                 successfully implementing and running.
//               </p>
//             </div>
//           </div>

//           {/* Divider */}
//           <hr className="border-t border-gray-200" />

//           <div className="flex space-x-3">
//             <div>
//               <img
//                 src="/image3.png"
//                 alt="ELETs eIndia Awards"
//                 className="w-24 h-16 object-cover rounded"
//               />
//             </div>
//             <div>
//               <p className="font-semibold text-blue-700 text-base leading-snug">
//                 ELETs eIndia Awards 2015 at Taj Presidency, Mumbai on 30th Nov
//                 2015
//               </p>
//               <p className="text-sm text-gray-800 leading-snug">
//                 CMS Computers was awarded as Smart service provider of the Year
//                 for "BangaloreOne" Project.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DidYouKnow;



const DidYouKnow = () => {
  return (
    <div className="bg-white border border-gray-200 p-4 shadow-md rounded flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-black">Did you Know ?</h2>
        <a href="#" className="text-blue-600 text-sm hover:underline">See All</a>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="flex flex-col space-y-2">
          <img
            src="/blog1.jpg"
            alt="Traffic Infratech Expo"
            className="w-full h-48 object-cover"
          />
          <p className="font-semibold text-blue-700 text-sm leading-tight">
            CMS PARTICIPATES IN TRAFFIC INFRATECH EXPO 2016
          </p>
          <p className="text-sm text-gray-800 leading-tight">
            CMS Computers was awarded as Digital Enterprise of the year for
            successfully implementing and running.
          </p>
        </div>

        {/* Right Column */}
        <div className="flex flex-col divide-y divide-gray-200">
          {/* First item */}
          <div className="flex pt-1 pb-3 space-x-3">
            <img
              src="/blog3.jpg"
              alt="Clean Energy Awards"
              className="w-26 h-26 object-cover"
            />
            <div>
              <p className="font-semibold text-blue-700 text-sm leading-tight">
                CMS grabs Clean Energy Awards for its Energy Management
                Solutions, Mumbai, India - 18-02-2015
              </p>
              <p className="text-sm text-gray-800 leading-tight">
                CMS Computers was awarded as Digital Enterprise of the year for
                successfully implementing and running.
              </p>
            </div>
          </div>

          {/* Second item */}
          <div className="flex pt-3 space-x-3">
            <img
              src="/blog5.jpg"
              alt="ELETs eIndia Awards"
              className="w-26 h-26 object-cover"
            />
            <div>
              <p className="font-semibold text-blue-700 text-sm leading-tight">
                ELETs eIndia Awards 2015 at Taj Presidency, Mumbai on 30th Nov 2015
              </p>
              <p className="text-sm text-gray-800 leading-tight">
                CMS Computers was awarded as Smart service provider of the Year
                for "BangaloreOne" Project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DidYouKnow;
