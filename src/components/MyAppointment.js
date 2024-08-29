import React, { useState, useEffect, useContext } from "react";
import bookingContext from "../context/booking/bookingContext";
import { Link, useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const context = useContext(bookingContext);
  const { booking, fetchuserbooking } = context;

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchuserbooking();
      setLoading(false);
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
  };

  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
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
          <Link className="nav-link active text-white fs-4" aria-current="page">
            History
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
      <div className="mt-16 p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Appointments</h1>
        {booking.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          <div>
            <ol className="list-group list-group-numbered fw-bold">
              {booking.map((appointment) => (
                <li
                  key={appointment._id}
                  className="bg-gray-100 border border-gray-300 mb-4 p-4 rounded-lg shadow-md d-flex fs-5"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold text-1xl ">
                      {capitalize(appointment.name)}
                    </div>
                    <p className="font-semibold">
                      Date:
                      <span className="text-gray-700">
                        {formatDate(appointment.date)}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Time:
                      <span className="text-gray-700">
                        {appointment.time}
                      </span>
                    </p>
                    {appointment.service.map((service, index) => (
                      <span key={index} className="text-gray-700 block">
                        {capitalize(service)}
                      </span>
                    ))}
                    {appointment.status === "canceled" && (
                      <div className="text-red-500 font-bold">
                        Your appointment has been canceled because the barber is not available
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  );
};

export default MyAppointments;
