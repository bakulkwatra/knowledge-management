
import { Bell, Settings } from "lucide-react";
import cmslogo from '../../assets/cmslogo.png'

const Header = () => {
  return (
    <header className="w-full shadow fixed top-0 left-0 z-50">
      {/* Top White Bar */}
      <div className="bg-white bg-black flex items-center justify-between px-3">
        {/* Logo */}
        <img src={cmslogo} alt="CMS Logo" className="h-10" />

        {/* Search Box */}
        <div className="w-[400px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-2 py-1 text-sm border rounded shadow-sm focus:outline-none"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          <Settings className="cursor-pointer" />
          <div className="relative">
            <Bell className="cursor-pointer" />
            {/* Red dot for notification */}
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full" />
          </div>
          <img
            src="https://i.pravatar.cc/32"
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Blue Bar */}
      <div className="bg-blue-900 text-white px-3 py-3 flex items-center gap-8 text-sm font-medium">
        <a href="#" className="hover:underline">Knowledge center</a>
        <a href="#" className="hover:underline">About ▼</a>
        <a href="#" className="hover:underline">Products ▼</a>
        <a href="#" className="hover:underline">Community ▼</a>
      </div>
      
    </header>
  );
};

export default Header;
