import React, { useState, useEffect, useContext } from "react";
import userContext from "../context/user/userContext";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Scissors, Menu, X, Home, Tag, Calendar, Phone, Info, History, ShieldCheck, LogIn } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(userContext);
  const { getuser, user } = context;
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getuser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  let a, b, c, d;
  if (user && user.role === "admin") {
    a = "/AppointmentList";
    b = "Appointment List";
    c = "/AdminService";
    d = "Admin Service";
  } else if (user && user.role === "user") {
    a = "/MyAppointments";
    b = "My History";
  } else{
    a = "/Login";
    b = "Login";
  }

  return (
    <header className="bg-gray-900 text-white fixed-top shadow-md z-50">
      <div className="container mx-auto flex flex-wrap p-3 flex-row items-center justify-between">

        {/* Brand Logo */}
        <Link className="flex title-font font-medium items-center text-white gap-2 group" to="/" onClick={closeMenu}>
          <div className="p-2 rounded-lg bg-violet-600 group-hover:bg-violet-500 transition-colors shadow-sm">
            <Scissors className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Demo</span>
        </Link>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center">
          <button className="text-white p-2 rounded-lg hover:bg-gray-800 transition-colors" onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex md:items-center md:ml-auto gap-1">
          <NavLink to="/" active={location.pathname === "/"}>
            <Home className="w-4 h-4 inline mr-1.5" /> Home
          </NavLink>
          <NavLink to="/Price" active={location.pathname === "/Price"}>
            <Tag className="w-4 h-4 inline mr-1.5" /> Price
          </NavLink>
          <NavLink to="/BookingForm" active={location.pathname === "/BookingForm"}>
            <Calendar className="w-4 h-4 inline mr-1.5" /> Book Now
          </NavLink>
          <NavLink to="/Contact" active={location.pathname === "/Contact"}>
            <Phone className="w-4 h-4 inline mr-1.5" /> Contact Us
          </NavLink>
          <NavLink to="/About" active={location.pathname === "/About"}>
            <Info className="w-4 h-4 inline mr-1.5" /> About
          </NavLink>
          <NavLink to={a} active={location.pathname === a}>
            {b === "Login" ? <LogIn className="w-4 h-4 inline mr-1.5" /> : <History className="w-4 h-4 inline mr-1.5" />}
            {b}
          </NavLink>
          {c && d && (
            <NavLink to={c} active={location.pathname === c}>
              <ShieldCheck className="w-4 h-4 inline mr-1.5" /> {d}
            </NavLink>
          )}
        </nav>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden w-full flex flex-col gap-1 mt-3 pt-3 border-t border-gray-700"
            >
              <MobileNavLink to="/" onClick={closeMenu}>Home</MobileNavLink>
              <MobileNavLink to="/Price" onClick={closeMenu}>Price</MobileNavLink>
              <MobileNavLink to="/BookingForm" onClick={closeMenu}>Book Now</MobileNavLink>
              <MobileNavLink to="/Contact" onClick={closeMenu}>Contact Us</MobileNavLink>
              <MobileNavLink to="/About" onClick={closeMenu}>About</MobileNavLink>
              <MobileNavLink to={a} onClick={closeMenu}>{b}</MobileNavLink>
              {c && d && <MobileNavLink to={c} onClick={closeMenu}>{d}</MobileNavLink>}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

const NavLink = ({ to, active, children }) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${active
        ? "bg-violet-600 text-white shadow"
        : "text-gray-300 hover:text-white hover:bg-gray-800"
      }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white hover:bg-gray-800 rounded-lg"
  >
    {children}
  </Link>
);

export default Navbar;
