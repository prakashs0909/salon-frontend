import React, { useState, useEffect, useContext} from "react";
import userContext from "../context/user/userContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(userContext);
  const { getuser, user } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getuser();
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let a, b, c, d;
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  if (user && user.role === "admin") {
    a = "/AppointmentList";
    b = "Appointment List";
    c = "/AdminService";
    d = "Admin Service";
  } else {
    a = "/MyAppointments";
    b = "My History";
  }

  return (
    <header className="bg-gray-800 text-gray-600 body-font fixed-top">
      <div className="container mx-auto flex flex-wrap p-3 flex-row items-center justify-between ">
        <div className="flex items-center">
          <Link
            className="flex title-font font-medium items-center text-white"
            to="/Home"
          >
            <svg
              fill="#b690f9"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 376.715 376.715"
            >
              <g>
                <path
                  d="M347.291,116.456c-10.813,16.763-20.879,9.692-20.879,9.692s25.725-18.018,14.911-35.417
                  c-9.318,17.031-19.01,12.687-19.01,12.687s15.285-31.435,1.868-35.417c-5.582,13.68-24.23,2.978-24.23,2.978
                  s10.93-9.079,17.516-4.46c0.129-9.208-26.46-11.192-26.46-11.192s3.468-7.952,0-11.561c-3.106,3.48-9.318,1.635-9.318,1.635
                  s4.601-15.554-5.593-16.908c3.094,10.428-12.051,11.42-11.935,6.971c-11.934-25.608-30.933-18.532-30.933-18.532
                  s-5.967-5.838,0-11.181c-4.718-3.731-27.569,8.945-27.569,8.945l-15.647-7.462c0,0-15.928-10.293-22.012-6.323
                  c8.571,6.458,5.967,21.614,5.967,21.614S160.795,5.144,156.078,7.246c3.736,5.109,0,7.83,0,7.83s-8.314-11.187-17.516-10.807
                  c-9.19,0.374-13.779,12.29-14.538,12.29s-2.371-7.818,0-12.29c-9.202,0.123-12.308,31.195-12.308,31.195s-6.972-10.819,0-19.653
                  c-18.894,2.616-4.834,21.626-4.834,21.626s-8.711-2.615-15.659,0c-6.948,2.61-11.059,8.192-17.143,10.439
                  c-6.083,2.225-14.036-5.103-13.417,7.824c3.597-0.759,10.813,0,10.813,0s-6.715,11.549-7.462,12.669
                  c-0.759,1.127-9.447-9.931-20.143-7.817c-10.685,2.119-3.094,14.777,1.133,7.817c4.227-6.942,21.649,11.292,27.208,4.846
                  c5.57-6.446,16.78-12.675,16.78-12.675s-5.722,15.414-11.561,17.147c-5.839,1.746-17.878,0.753-20.867,9.698
                  c-2.989,8.944,1.857,24.977,1.857,24.977s-46.58-6.837-21.614,19.74c-4.227-19.373,25.222-5.956,25.222-5.956
                  s-14.176,3.842-15.168,10.428c-0.993,6.592,8.944,11.304,5.593,19.758c-3.351,8.454-24.218,4.484-22.361-4.724
                  c-13.043,13.914,26.962,18.257,29.823,6.586c2.849-11.683-0.631-13.919,2.113-18.642c1.95-3.393,10.755-5.559,15.578-6.516
                  c0.666,10.906,2.989,20.23,4.962,25.281c0.141,0.526,0.245,1.063,0.374,1.612c-2.942,0.595-7.532,0.595-11.222-4.601
                  c-1.542,7.485,7.123,8.595,11.875,8.665c0.514,4.975-0.117,10.369-3.503,15.46c-7.111,10.679-15.063,15.577-17.632,22.724
                  c-3.644,9.984,15.554,11.724,15.554,11.724l0.047,3.783c0,0-6.166,5.967-4.846,10.626c1.74,6.225,14.106,4.018,14.106,4.018
                  s-11.864,4.367-11.304,10.158c0.549,5.77,5.512,8.291,5.512,8.291s-11.49,22.584,5.406,27.559
                  c16.897,4.951,51.181-15.672,55.653,8.43c4.32,16.641,23.576,57.464,16.908,65.101c-6.679,7.648-16.908,19.384-16.908,19.384
                  l175.425,5.465c0,0-54.17-70.074-59.623-78.015c-5.465-7.94-28.27-40.018-8.396-61.865c0.923-1.027,1.927-2.23,2.931-3.409
                  c5.874,3.082,17.68,7.449,26.705-0.877c12.483-11.571,12.483-21.812,12.483-21.812s22.735,5.22,16.955-1.296
                  c-5.769-6.516,12.121-27.762,12.121-27.762s6.819,5.085,3.725,13.796c11.047-1.751,3.363-20.143,3.363-20.143s3.095,3.106,9.681,0
                  c-6.972-3.24-4.1-21.988-4.1-21.988S355.733,141.183,347.291,116.456z"
                />
              </g>
            </svg>
            <span className="ml-3 text-xl ">Fashion Corner</span>
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-white" onClick={toggleMenu}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <nav
          className={`md:flex md:items-center md:ml-auto md:mr-auto w-full md:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Link
            className="block md:inline-block p-2 md:mt-0 mr-5 hover:text-violet-400 text-white md:text-lg"
            to="/Home"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            className="block md:inline-block p-2 md:mt-0 mr-5 hover:text-violet-400 text-white md:text-lg"
            to="/Price"
            onClick={closeMenu}
          >
            Price
          </Link>
          <Link
            className="block md:inline-block p-2 md:mt-0 mr-5 hover:text-violet-400 text-white md:text-lg"
            to="/BookingForm"
            onClick={closeMenu}
          >
            Book Now
          </Link>
          <Link
            className="block md:inline-block p-2 md:mt-0 mr-5 hover:text-violet-400 text-white md:text-lg"
            to="/Contact"
            onClick={closeMenu}
          >
            Contact Us
          </Link>
          <Link
            className="block md:inline-block p-2 md:mt-0 mr-5 hover:text-violet-400 text-white md:text-lg"
            to="/About"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            className="block md:inline-block p-2 md:mt-0 mr-5 hover:text-violet-400 text-white md:text-lg"
            to={a}
            onClick={closeMenu}
          >
            {b}
          </Link>
          <Link
            className="block md:inline-block p-2 md:mt-0 mr-5 hover:text-violet-400 text-white md:text-lg"
            to={c}
            onClick={closeMenu}
          >
            {d}
          </Link>
          
          
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
