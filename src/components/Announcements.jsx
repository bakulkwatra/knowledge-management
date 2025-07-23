// export default function Announcements() {
//   return (
//     <div className="bg-white border border-gray-200 p-4 shadow-md rounded w-full">
//       <h2 className="font-bold mb-2">Announcements</h2>
//       <div className="space-y-2 text-sm">
//         <div>
//           <p className="font-medium">Holiday Notification</p>
//           <span className="text-xs text-gray-500">Holiday on occasion of Diwali 13th November 2023</span>
//         </div>
//         <div>
//           <p className="font-medium">Watsup @ CMS</p>
//           <span className="text-xs text-gray-500">CMS Computers IT empanelled under national urban digital mission</span>
//         </div>
//       </div>
//     </div>
//   )
// }



export default function Announcements() {
  return (
    <div className="bg-white border border-gray-200 p-4 shadow-md rounded w-full">
      {/* Header with View All */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg sm:text-xl text-black">Announcements</h2>
       <button
  className="text-white text-sm font-medium px-3 py-1 rounded hover:opacity-90"
  style={{ backgroundColor: 'oklch(0.9 0.14 189.9)' }}
>
  View All
</button>

      </div>

      {/* Content */}
      <div className="space-y-4 text-sm sm:text-base">
        {/* Item 1 */}
        <div className="flex justify-between items-start gap-3">
          <div>
            <p className="font-medium text-sm sm:text-base">Holiday Notification</p>
            <p className="text-xs sm:text-sm text-gray-600">
              Holiday on occasion of Diwali 13th November 2023
            </p>
            <p className="text-xs text-gray-400">08 August 10:37 AM</p>
          </div>
          <img
            src="/profileImg.webp"
            alt="Profile"
            className="w-24 h-24 sm:w-7 sm:h-7 object-contain mt-5"
          />
        </div>

        <hr className="border-gray-200" />

        {/* Item 2 */}
        <div className="flex justify-between items-start gap-3">
          <div>
            <p className="font-medium text-sm sm:text-base">Watsup @ CMS</p>
            <p className="text-xs sm:text-sm text-gray-600">
              CMS Computers IT empanelled under national urban digital mission
            </p>
            <p className="text-xs text-gray-400">04 September 05:37 PM</p>
          </div>
          <img
            src="/profileImg.webp"
            alt="Profile"
            className="w-24 h-24 sm:w-7 sm:h-7 object-contain mt-5"
          />
        </div>

        <hr className="border-gray-200" />

        {/* Item 3 */}
        <div className="flex justify-between items-start gap-3">
          <div>
            <p className="font-medium text-sm sm:text-base">Event @ CMS</p>
            <p className="text-xs sm:text-sm text-gray-600">
              A get together of the Kaveri project Stakeholders was held to celebrate...
            </p>
            <p className="text-xs text-gray-400">08 October 03:30 PM</p>
          </div>
          <img
            src="/profileImg.webp"
            alt="Profile"
            className="w-24 h-24 sm:w-7 sm:h-7 object-contain mt-5"
          />
        </div>
      </div>
    </div>
  );
}
