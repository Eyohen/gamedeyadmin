// src/components/dashboard/DashboardLayout.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Package,
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
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const notifRef = useRef(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const fetchUnreadCount = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;
      const res = await axios.get(`${URL}/api/admin/notifications/unread-count`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.data.success) setUnreadCount(res.data.data.count);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;
      const res = await axios.get(`${URL}/api/admin/notifications?limit=20`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.data.success) setNotifications(res.data.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  }, []);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.patch(`${URL}/api/admin/notifications/${id}/read`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.patch(`${URL}/api/admin/notifications/read-all`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const getTimeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'new_player': return '👤';
      case 'new_coach': return '🏋️';
      case 'new_facility': return '🏟️';
      case 'new_booking': return '📅';
      default: return '🔔';
    }
  };

  // Fetch unread count on mount and poll every 30s
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleNotifDropdown = () => {
    if (!showNotifDropdown) fetchNotifications();
    setShowNotifDropdown(prev => !prev);
  };

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
    { path: "/players", title: "Players", icon: <img src={community} className="w-5 h-5" alt="Players" /> },
    { path: "/session-packages", title: "Session Packages", icon: <Package size={20} /> },
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
              <p>Admin</p>
              <div className="relative" ref={notifRef}>
                <button
                  onClick={toggleNotifDropdown}
                  className="p-2 text-gray-500 hover:text-black rounded-full transition-colors relative"
                >
                  <Bell size={18} className="sm:w-5 sm:h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-xs text-[#946BEF] hover:underline">
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-sm text-gray-400">
                          No notifications yet
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => !notif.isRead && markAsRead(notif.id)}
                            className={`px-4 py-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${
                              !notif.isRead ? 'bg-purple-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-lg flex-shrink-0 mt-0.5">{getNotifIcon(notif.type)}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className={`text-sm ${!notif.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                                    {notif.title}
                                  </p>
                                  {!notif.isRead && (
                                    <span className="w-2 h-2 bg-[#946BEF] rounded-full flex-shrink-0"></span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 truncate">{notif.message}</p>
                                <p className="text-[10px] text-gray-400 mt-1">{getTimeAgo(notif.createdAt)}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link to={'/profile'}>
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
              </Link>
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