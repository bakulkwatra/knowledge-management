import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-500 text-center text-sm py-4 border-t">
      Powered By{" "}
      <a href="#" className="text-blue-600 hover:underline">
        CMS Computers
      </a>{" "}
      Copyright 2025. All Rights Reserved.
    </footer>
  );
};

// const Footer = () => {
//     return (
//       <footer className="w-full fixed bottom-0 left-0 bg-white text-gray-500 text-center text-sm py-4 shadow z-50">
//         Powered By <a href="#" className="text-blue-600 hover:underline">CMS Computers</a> Copyright 2025. All Rights Reserved.
//       </footer>
//     );
//   };

export default Footer;
