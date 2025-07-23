// // import Header from "../components/Header";
// // import Navbar from "../components/Navbar";
// import PostContentPanel from "../components/PostContentPanel";
// import DidYouKnow from "../components/DidYouKnow";
// import Announcements from "../components/Announcements";
// import KnowledgeHeader from "../components/KnowledgeHeader";
// import BusinessUnitPanel from "../components/BusinessUnitPanel";
// import PracticesPanel from "../components/PracticesPanel";
// import HaveAQuestion from "../components/HaveAQuestion";
// import { Outlet } from "react-router-dom";

// export default function HomePage() {
//   return (
//     <div className="min-h-screen">
     
//       {/* <Navbar /> */}
//       <KnowledgeHeader />
//       <main className="grid grid-cols-12 gap-4 p-4">
//         <div className="col-span-2 sm:col-span-2 flex flex-col">
//           <PostContentPanel />
//           <BusinessUnitPanel />
//           <PracticesPanel />
//         </div>

//         <div className="col-span-10 ">
//           <div className="grid grid-cols-10 gap-4">
//             <div className="col-span-6">
//               <DidYouKnow />
//             </div>
//             <div className="col-span-4">
//               <Announcements />
//             </div>
//           </div>
//           <HaveAQuestion />
//         </div>
//       </main>
//     </div>
//   );
// }


// import { Outlet } from "react-router-dom";
// import PostContentPanel from "../components/PostContentPanel";
// import DidYouKnow from "../components/DidYouKnow";
// import Announcements from "../components/Announcements";
// import KnowledgeHeader from "../components/KnowledgeHeader";
// import BusinessUnitPanel from "../components/BusinessUnitPanel";
// import PracticesPanel from "../components/PracticesPanel";
// import HaveAQuestion from "../components/HaveAQuestion";

// export default function HomePage() {
//   return (
//     <div className="min-h-screen">

//  <Outlet />

//  <>

//       <KnowledgeHeader />
//       <main className="grid grid-cols-12 gap-4 p-4">
//         {/* Sidebar - 2 columns */}
//         <div className="col-span-2 sm:col-span-2 flex flex-col">
//           <PostContentPanel />
//           <BusinessUnitPanel />
//           <PracticesPanel />
//         </div>

//         {/* Main Content - 10 columns */}
//         <div className="col-span-10 space-y-4">
//           {/* 🟢 Here we render dynamic nested routes like Blogs or BlogDetails */}
         

//           {/* 🟡 Below stays static */}
//           <div className="grid grid-cols-10 gap-4">
//             <div className="col-span-6">
//               <DidYouKnow />
//             </div>
//             <div className="col-span-4">
//               <Announcements />
//             </div>
//           </div>
//           <HaveAQuestion />
//         </div>
//       </main>
//       </>
//     </div>
//   );
// }


import { Outlet, useLocation } from "react-router-dom";
import PostContentPanel from "../components/PostContentPanel";
import DidYouKnow from "../components/DidYouKnow";
import Announcements from "../components/Announcements";
import KnowledgeHeader from "../components/KnowledgeHeader";
import BusinessUnitPanel from "../components/BusinessUnitPanel";
import PracticesPanel from "../components/PracticesPanel";
import HaveAQuestion from "../components/HaveAQuestion";

export default function HomePage() {
  const location = useLocation();

  const isRootKM = location.pathname === "/km"; // only show layout on base path

  return (
    <div className="min-h-screen">
      {isRootKM ? (
        <>
          <KnowledgeHeader />
          <main className="grid grid-cols-12 gap-4 p-4">
            {/* Sidebar */}
            <div className="col-span-2 sm:col-span-2 flex flex-col">
              <PostContentPanel />
              <BusinessUnitPanel />
              <PracticesPanel />
            </div>

            {/* Main Content */}
            <div className="col-span-10 space-y-4">
              <div className="grid grid-cols-10 gap-4">
                <div className="col-span-6">
                  <DidYouKnow />
                </div>
                <div className="col-span-4">
                  <Announcements />
                </div>
              </div>
              <HaveAQuestion />
            </div>
          </main>
        </>
      ) : (
        // 🟢 For /km/blogs or /km/blogs/:id → only render nested component
        <Outlet />
      )}
    </div>
  );
}
