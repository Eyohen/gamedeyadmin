// // src/components/dashboard/DashboardLayout.jsx
// import React, { useState } from 'react';
// import { 
//   Bell,
//   User,
//   Menu,
//   X,
//   LogOut,
//   Sun,
//   Moon,
//   LayoutDashboard,
//   Search,
//   Watch,
//   WalletMinimal,
//   OctagonAlert
// } from 'lucide-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { URL } from '../../url';
// import { useAuth } from '../../context/AuthContext';
// import logo from '../../assets/logo.png';
// import facilities from '../../assets/facilities.png';
// import bookings from '../../assets/bookings.png';
// import community from '../../assets/community.png';
// import financialoverview from '../../assets/financialoverview.png';
// import getpaid from '../../assets/getpaid.png';
// import reviews from '../../assets/reviews.png';
// import profile from '../../assets/profile.png';






// // MenuItem Component - Modified to handle special case for logout
// const MenuItem = ({ icon, title, path, collapsed, active, onClick }) => {

//   // If onClick is provided, use a button instead of a Link
//   if (onClick) {
//     return (
//       <button 
//         onClick={onClick}
//         className={`flex items-center w-full px-4 py-3 text-left rounded-xl
//             'text-gray-500 hover:bg-gray-50 hover:text-black'
//         } font-semibold transition-colors`}
//       >
//         <span className="flex-shrink-0">{icon}</span>
//         {!collapsed && <span className="ml-3">{title}</span>}
//       </button>
//     );
//   }
  
//   // Regular menu item with Link
//   return (
//     <Link 
//       to={path}
//       className={`flex items-center w-[200px] px-3 py-3 text-left rounded-xl ${active ?
//     'bg-[#7042D2] text-white font-semibold border-r-[6px] border-b-[4px] border-black'  : 'text-black font-normal hover:bg-gray-50 hover:text-black border-2 border-black' }`}
//     >
//       <span className="flex-shrink-0">{icon}</span>
//       {!collapsed && <span className="ml-3">{title}</span>}
//     </Link>
//   );
// };

// const DashboardLayout = ({ children }) => {
//   const { user, logout } = useAuth();
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const navigate = useNavigate();

//   console.log("layout user", user);

//   // Handle logout function
//   const handleLogout = () => {
//     // Clear access token from localStorage
//     localStorage.removeItem("access_token");
    
//     // Call the logout function from AuthContext
//     logout();
    
//     // Navigate to the home/login page
//     navigate("/");
//   };

//   // Menu items configuration
//   const menuItems = [
//     { path: "/dashboard", title: "Dashboard", icon: <LayoutDashboard size={20} /> },
//     { path: "/users", title: "Users", icon: <img src={community} size={25} /> },
//     { path: "/sessions", title: "Sessions", icon:<Watch /> },
//     { path: "/communities", title: "Communities", icon: <img src={community} size={25} /> },
//     { path: "/financial-oversight", title: "Financial Oversight", icon: <WalletMinimal /> },
//     { path: "/dispute-resolution", title: "Disputes Resolution", icon:<OctagonAlert /> },
//     // { path: "/bookings", title: "Bookings", icon: <img src={facilities} size={25} /> },
//     // { path: "/teams", title: "Teams", icon: <img src={bookings} size={25} /> },  
//     // { path: "/transaction-history", title: "Transaction History", icon: <img src={financialoverview} size={25} /> },
//     // { path: "/reviews", title: "Reviews", icon: <img src={getpaid} size={25} /> },  
//     { path: "/profile", title: "Profile", icon: <img src={reviews} size={25} /> },
//     // { path: "/settings", title: "Profile", icon: <img src={profile} size={25} /> },

//   ];

//   // Get page title based on current path
//   const getPageTitle = () => {
//     const page = menuItems.find(item => item.path === currentPath);
//     return page ? page.title : "Dashboard";
//   };

//   return (
//     <div className={`flex h-screen text-gray-800`}>
//       {/* Sidebar */}
//       <div className={`${collapsed ? 'w-16' : 'w-64'} bg-gray-100 transition-all duration-300 flex flex-col`}>
//         {/* Logo and collapse button */}
//         <div className={`flex items-center justify-between p-4 border-gray-200
//         `}>
//           {!collapsed && <div className="text-xl font-bold"><img src={logo} className='w-36' /></div>}
//           <button 
//             onClick={() => setCollapsed(!collapsed)} 
//             className={`text-gray-500 hover:text-black p-1 rounded-md`}
//           >
//             {collapsed ? <Menu size={20} /> : <X size={20} />}
//           </button>
//         </div>

//         {/* Menu Items */}
//         <nav className="flex-1 py-4 px-2 rounded-xl space-y-4">
//           {menuItems.map((item) => (
//             <MenuItem 
//               key={item.path}
//               icon={item.icon} 
//               title={item.title} 
//               path={item.path}
//               collapsed={collapsed} 
//               active={currentPath === item.path}
//             />
//           ))}
          
//           {/* Logout Item - Special handling */}
//           <MenuItem 
//             icon={<LogOut size={20} />} 
//             title="Logout" 
//             collapsed={collapsed}
//             onClick={handleLogout}
//           />
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <div className='bg-gray-100'>
//         <header className={`${
//           'bg-white rounded-t-3xl mt-4'
//         } py-4 px-12 flex items-center justify-between`}>
//           <h1 className={`text-2xl font-semibold text-gray-800`}>
//             {getPageTitle()}
//           </h1>
//           <div className="flex items-center gap-4">
    
//             <button className={`p-2
//         text-gray-500 hover:text-black
//             rounded-full`}>
//               <Bell size={20} />
//             </button>
            
//             <div className="flex items-center gap-2">
//               <div className={`w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center`}>
//                 <User size={16} />
//               </div>
//               <span className={`text-sm font-medium text-gray-800`}>
//                 {user?.firstName} {user?.lastName}
//               </span>
//             </div>
//           </div>
//         </header>
//         </div>

//         {/* Page Content */}
//         <main className={`flex-1 overflow-auto p-6 bg-white`}>
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



// src/components/dashboard/DashboardLayout.jsx - Mobile Responsive Version
import React, { useState } from 'react';
import { 
  Bell,
  User,
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
  LayoutDashboard,
  Search,
  Watch,
  WalletMinimal,
  OctagonAlert
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';
import facilities from '../../assets/facilities.png';
import bookings from '../../assets/bookings.png';
import community from '../../assets/community.png';
import financialoverview from '../../assets/financialoverview.png';
import getpaid from '../../assets/getpaid.png';
import reviews from '../../assets/reviews.png';
import profile from '../../assets/profile.png';

// MenuItem Component - Mobile responsive with conditional rendering
const MenuItem = ({ icon, title, path, collapsed, active, onClick, isMobile }) => {
  // If onClick is provided, use a button instead of a Link
  if (onClick) {
    return (
      <button 
        onClick={onClick}
        className={`flex items-center w-full px-4 py-3 text-left rounded-xl font-semibold transition-colors duration-200
          ${isMobile 
            ? 'text-gray-700 hover:bg-gray-100 hover:text-black' 
            : 'text-gray-500 hover:bg-gray-50 hover:text-black'
          }`}
      >
        <span className="flex-shrink-0">{icon}</span>
        {(!collapsed || isMobile) && <span className="ml-3">{title}</span>}
      </button>
    );
  }
  
  // Regular menu item with Link
  return (
    <Link 
      to={path}
      className={`flex items-center px-3 py-3 text-left rounded-xl transition-all duration-200
        ${isMobile ? 'w-full' : 'w-[200px]'}
        ${active 
          ? 'bg-[#7042D2] text-white font-semibold border-r-[6px] border-b-[4px] border-black' 
          : 'text-black font-normal hover:bg-gray-50 hover:text-black border-2 border-black hover:border-gray-300'
        }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      {(!collapsed || isMobile) && <span className="ml-3">{title}</span>}
    </Link>
  );
};

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  console.log("layout user", user);

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    logout();
    navigate("/");
  };

  // Close mobile menu when navigating
  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  // Menu items configuration
  const menuItems = [
    { path: "/dashboard", title: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/users", title: "Users", icon: <img src={community} className="w-5 h-5" alt="Users" /> },
    { path: "/sessions", title: "Sessions", icon: <Watch size={20} /> },
    { path: "/communities", title: "Communities", icon: <img src={community} className="w-5 h-5" alt="Communities" /> },
    { path: "/financial-oversight", title: "Financial Oversight", icon: <WalletMinimal size={20} /> },
    { path: "/dispute-resolution", title: "Disputes Resolution", icon: <OctagonAlert size={20} /> },
    { path: "/profile", title: "Profile", icon: <img src={reviews} className="w-5 h-5" alt="Profile" /> },
  ];

  // Get page title based on current path
  const getPageTitle = () => {
    const page = menuItems.find(item => item.path === currentPath);
    return page ? page.title : "Dashboard";
  };

  return (
    <div className="flex h-screen text-gray-800 relative">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex ${collapsed ? 'w-16' : 'w-64'} bg-gray-100 transition-all duration-300 flex-col`}>
        {/* Logo and collapse button */}
        <div className="flex items-center justify-between p-4 border-gray-200">
          {!collapsed && (
            <div className="text-xl font-bold">
              <img src={logo} className='w-36' alt="Logo" />
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className="text-gray-500 hover:text-black p-1 rounded-md transition-colors"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Desktop Menu Items */}
        <nav className="flex-1 py-4 px-2 rounded-xl space-y-4 overflow-y-auto">
          {menuItems.map((item) => (
            <MenuItem 
              key={item.path}
              icon={item.icon} 
              title={item.title} 
              path={item.path}
              collapsed={collapsed} 
              active={currentPath === item.path}
              isMobile={false}
            />
          ))}
          
          {/* Logout Item */}
          <MenuItem 
            icon={<LogOut size={20} />} 
            title="Logout" 
            collapsed={collapsed}
            onClick={handleLogout}
            isMobile={false}
          />
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 transform transition-transform duration-300 ease-in-out lg:hidden
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Mobile Logo and close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="text-xl font-bold">
            <img src={logo} className='w-36' alt="Logo" />
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-gray-500 hover:text-black p-1 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="py-4 px-2 space-y-2 overflow-y-auto h-full pb-20">
          {menuItems.map((item) => (
            <div key={item.path} onClick={handleMobileNavClick}>
              <MenuItem 
                icon={item.icon} 
                title={item.title} 
                path={item.path}
                collapsed={false} 
                active={currentPath === item.path}
                isMobile={true}
              />
            </div>
          ))}
          
          {/* Mobile Logout Item */}
          <MenuItem 
            icon={<LogOut size={20} />} 
            title="Logout" 
            collapsed={false}
            onClick={() => {
              handleLogout();
              handleMobileNavClick();
            }}
            isMobile={true}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className='bg-gray-100'>
          <header className="bg-white rounded-t-3xl mt-4 py-4 px-4 sm:px-6 lg:px-12 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-gray-500 hover:text-black rounded-md transition-colors mr-3"
              >
                <Menu size={20} />
              </button>
              
              <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 truncate">
                {getPageTitle()}
              </h1>
            </div>
            
            {/* Header Right Side */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-2 text-gray-500 hover:text-black rounded-full transition-colors">
                <Bell size={18} className="sm:w-5 sm:h-5" />
              </button>
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={14} className="sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-800 hidden sm:block">
                  {user?.firstName} {user?.lastName}
                </span>
                {/* Show just first name on very small screens */}
                <span className="text-xs font-medium text-gray-800 block sm:hidden">
                  {user?.firstName}
                </span>
              </div>
            </div>
          </header>
        </div>

        {/* Page Content - Mobile responsive padding */}
        <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;