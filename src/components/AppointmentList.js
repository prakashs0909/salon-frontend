import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppointmentCard from "./AppointmentCard";

const AppointmentList = () => {
  const navigate = useNavigate();

  const handleLogout =(e)=>{
    e.preventDefault();
    localStorage.removeItem("token");
    navigate('/');
  };
  
  return (
    <>
      <div className="container mx-auto mt-16 px-4">
        <ul className="flex items-center bg-gray-800 justify-content-between p-2 fixed-top">  
          <button
            className="d-flex border-0 btn btn-outline-light fs-4"
            onClick={() => navigate("/Home")}
          > 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="25"
              height="36"
              className="fill-current"
            > 
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M14.41 7.41L13 6l-6 6 6 6 1.41-1.41L9.83 12z" />
            </svg>
          </button>
          <li className="nav-item ">
            
            <Link
              className="nav-link active text-white fs-4"
              aria-current="page"
            >  
              Appointments
            </Link>
          </li>
          <button
            className="d-flex border-0 btn btn-outline-light fs-4"
              onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="38"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </ul>
        <AppointmentCard/>
      </div>
    </>
  );
};

export default AppointmentList;
