// import { Routes, Route, useLocation } from "react-router-dom";
// import Blogs from "../pages/Blogs";
// import BlogDetails from "../pages/BlogDetails";
// import Header from "../components/atoms/Header";
// import Footer from "../components/atoms/Footer";
// import HomePage from "../pages/HomePage";
// import { useEffect } from "react";

// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" }); // Switch between 'instant' & 'smooth' if needed
//   }, [pathname]);

//   return null;
// };

// const AppRoutes = () => {
//   return (
//     <>
//       <ScrollToTop />
//       <Header />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/blogs" element={<Blogs />} />
//         <Route path="/blogs/:id" element={<BlogDetails />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// };

// export default AppRoutes;



import { Routes, Route, useLocation } from "react-router-dom";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";
import Header from "../components/atoms/Header";
import Footer from "../components/atoms/Footer";
import HomePage from "../pages/HomePage";
import { useEffect } from "react";
import { Layout } from "lucide-react";
import PostContentPanel from "../components/PostContentPanel";
import Documents from "../pages/Documents";
import ResourceCRUD from "../pages/ResourceCRUD";
import { Navigate } from "react-router-dom";
// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" }); // Switch between 'instant' & 'smooth' if needed
//   }, [pathname]);

//   return null;
// };

const AppRoutes = () => {
  return (
    <>
      {/* <ScrollToTop />
      <Header /> */}

      <Routes>
         <Route path="/" element={<Navigate to="/km/blog/create" replace />} /> 
        <Route path="/km/:resourceType/create" element={<ResourceCRUD />} />
        <Route path="/km/:resourceType/:resourceId/edit" element={<ResourceCRUD />} />
        {/* <Route path="/" element={<Layout />} />

          <Route path="km" element={<HomePage />}>
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:id" element={<BlogDetails />} />
          
            <Route path="docs" element={<Documents />} />


          </Route> */}
      </Routes>

     
      {/* <Footer /> */}
    </>
  );
};

export default AppRoutes;
