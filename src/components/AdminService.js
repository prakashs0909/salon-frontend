import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import serviceContext from "../context/service/serviceContext";
import barbarContext from "../context/barbars/barbarContext";
import { Link } from "react-router-dom";

const AdminService = () => {
  const serviceCtx = useContext(serviceContext);
  const barbarCtx = useContext(barbarContext);

  const {
    service,
    addservice,
    deleteservice,
    editservice,
    getallservice,
  } = serviceCtx;

  const {
    barbar,
    getallbarbar,
    addbarbar,
    deletebarbar,
    editbarbar,
  } = barbarCtx;

  const [editingService, setEditingService] = useState(null);
  const [editingBarbar, setEditingBarbar] = useState(null);
  const [services, setService] = useState({ name: "", price: "", time: "" });
  const [barbars, setBarbar] = useState({ name: "" });
  const [isSalonOpen, setIsSalonOpen] = useState(true);
  const [closedDates, setClosedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchSalonStatus = async () => {
      try {
        const response = await axios.get(
          "https://salon-backend-sigma.vercel.app/api/salonStatus/status"
        );
        setIsSalonOpen(response.data.isSalonOpen);
      } catch (error) {
        console.error("Error fetching salon status:", error);
      }
    };

    const fetchClosedDates = async () => {
      try {
        const response = await axios.get(
          "https://salon-backend-sigma.vercel.app/api/salonStatus/status"
        );
        setClosedDates(response.data.closedDates);
      } catch (error) {
        console.error("Error fetching closed dates:", error);
      }
    };

    fetchSalonStatus();
    fetchClosedDates();
    getallservice();
    getallbarbar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateService = (e) => {
    e.preventDefault();
    addservice(services.name, services.price, services.time);
    setService({ name: "", price: "", time: "" });
  };

  const handleCreateBarbar = (e) => {
    e.preventDefault();
    addbarbar(barbars.name);
    setBarbar({ name: "" });
  };

  const handleInputChange = (e) => {
    setService({ ...services, [e.target.name]: e.target.value });
    setBarbar({ ...barbars, [e.target.name]: e.target.value });
  };

  const handleUpdateService = (e) => {
    e.preventDefault();
    editservice(editingService._id, editingService.name, editingService.price);
    setEditingService(null);
  };

  const handleUpdateBarbar = (e) => {
    e.preventDefault();
    editbarbar(editingBarbar._id, editingBarbar.name);
    setEditingBarbar(null);
  };

  const handleEditInputChange = (e) => {
    setEditingService({ ...editingService, [e.target.name]: e.target.value });
    setEditingBarbar({ ...editingBarbar, [e.target.name]: e.target.value });
  };

  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const toggleSalonStatus = async () => {
    try {
      const newStatus = !isSalonOpen;
      setIsSalonOpen(newStatus);

      // Update status in the database
      await axios.put(
        "https://salon-backend-sigma.vercel.app/api/salonStatus/status",
        {
          isSalonOpen: newStatus,
        }
      );
    } catch (error) {
      console.error("Error updating salon status:", error);
    }
  };

  const handleAddClosedDate = async () => {
    try {
      if (!selectedDate) return;
      const response = await axios.put(
        "https://salon-backend-sigma.vercel.app/api/salonStatus/closedDates",
        {
          date: selectedDate,
        }
      );
      setClosedDates(response.data.closedDates);
      setSelectedDate("");
    } catch (error) {
      console.error("Error adding closed date:", error);
    }
  };

  const handleRemoveClosedDate = async (date) => {
    try {
      const response = await axios.delete(
        "https://salon-backend-sigma.vercel.app/api/salonStatus/closedDates",
        {
          data: { date },
        }
      );
      setClosedDates(response.data.closedDates);
    } catch (error) {
      console.error("Error removing closed date:", error);
    }
  };

  let result = service.map((service) => {
    let unit;
    if (service.time <= 5) {
      unit = "hrs";
    } else {
      unit = "min";
    }
    return (
      <tr key={service._id}>
        {/* <td className="px-3">{service._id}</td> */}
        <td className="px-3">{capitalize(service.name)}</td>
        <td className="px-3">{service.price} Rs.</td>
        <td className="pl-3">
          {service.time} {unit}
        </td>
        <td className="pl-3 d-flex">
          <div className="mr-2 ">
            <button
              className=" bg-purple-600 text-white px-3 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 "
              onClick={() => setEditingService(service)}
            >
              Edit
            </button>
          </div>
          <div className="mr-2">
            <button
              className=" bg-purple-600 text-white px-3 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
              onClick={() => deleteservice(service._id)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });

  let barbarResult = barbar.map((barbar) => {
    return (
      <tr key={barbar._id}>
        {/* <td className="px-3">{barbar._id}</td> */}
        <td className="px-3">{capitalize(barbar.name)}</td>
        <td className="pl-3 d-flex">
          <div className="mr-2 ">
            <button
              className=" bg-purple-600 text-white px-3 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 "
              onClick={() => setEditingBarbar(barbar)}
            >
              Edit
            </button>
          </div>
          <div className="mr-2">
            <button
              className=" bg-purple-600 text-white px-3 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
              onClick={() => deletebarbar(barbar._id)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="mt-16 bg-gray-200 ">
        <h1 className="text-4xl font-bold text-gray-800 p-3">Services</h1>

        <div className="p-3">
          <h2 className="fs-5 font-bold text-gray-800 mb-3 pl-2">
            Add New Service
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={services.name}
            onChange={handleInputChange}
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={services.price}
            onChange={handleInputChange}
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
          />
          <input
            type="number"
            name="time"
            placeholder="Time"
            value={services.time}
            onChange={handleInputChange}
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
          />
          <button
            disabled={
              services.name.length < 3 ||
              services.price.length < 1 ||
              services.time.length < 1
            }
            onClick={handleCreateService}
            className=" bg-purple-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          >
            Add Service
          </button>
        </div>

        {editingService && (
          <div className="p-3">
            <h2 className="fs-5 font-bold text-gray-800 mb-3 pl-2">
              Edit Service
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editingService.name}
              onChange={handleEditInputChange}
              className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={editingService.price}
              onChange={handleEditInputChange}
              className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
            />
            <div className="d-flex">
              <div className="mr-3">
                <button
                  className=" bg-purple-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
                  onClick={handleUpdateService}
                >
                  Update Service
                </button>
              </div>
              <div>
                <button
                  className=" bg-purple-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
                  onClick={() => setEditingService(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              {/* <th className="fs-5 px-3">ID</th> */}
              <th className="fs-5 px-3">Name</th>
              <th className="fs-5 px-3"> Price</th>
              <th className="fs-5 px-3"> Time</th>
              <th className="fs-5 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>{result}</tbody>
        </table>
      </div>

      <div className=" bg-gray-200 ">
        <h1 className="text-4xl font-bold text-gray-800 p-3">Barbars</h1>

        <div className="p-3">
          <h2 className="fs-5 font-bold text-gray-800 mb-3 pl-2">
            Add New Barbars
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={barbars.name}
            onChange={handleInputChange}
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
          />

          <button
            disabled={barbars.name.length < 3}
            onClick={handleCreateBarbar}
            className=" bg-purple-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          >
            Add Barbar
          </button>
        </div>

        {editingBarbar && (
          <div className="p-3">
            <h2 className="fs-5 font-bold text-gray-800 mb-3 pl-2">
              Edit Barbar
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editingBarbar.name}
              onChange={handleEditInputChange}
              className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
            />
            <div className="d-flex">
              <div className="mr-3">
                <button
                  className=" bg-purple-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
                  onClick={handleUpdateBarbar}
                >
                  Update Barbar
                </button>
              </div>
              <div>
                <button
                  className=" bg-purple-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
                  onClick={() => setEditingBarbar(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              {/* <th className="fs-5 px-3">ID</th> */}
              <th className="fs-5 px-3">Name</th>
              <th className="fs-5 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>{barbarResult}</tbody>
        </table>
      </div>

      <div className="p-3 bg-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-3 pt-2">
          Salon Closed/Open Detail
        </h1>
        <div className="mb-4 md:w-1/3">
          <label htmlFor="date" className="block text-gray-700 font-medium">
            Select Date:
            <input
              type="date"
              className="form-input mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-400 focus:ring-opacity-50 px-3"
              id="date"
              name="date"
              min={minDate}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              // disabled={!isSalonOpen}
            />
          </label>
        </div>
        <div className="mb-3 flex">
          <button
            className={`mx-3 text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              isSalonOpen
                ? "bg-red-600 hover:bg-red-700 focus:ring-purple-400"
                : "bg-green-600 hover:bg-green-700 focus:ring-green-400"
            }`}
            onClick={async () => {
              const newStatus = !isSalonOpen;
              await toggleSalonStatus();

              if (!newStatus) {
                await handleAddClosedDate();
              } else {
                await handleRemoveClosedDate(selectedDate);
              }
            }}
          >
            {isSalonOpen ? "Closed" : "Open"}
          </button>
        </div>
        <div className="mb-3">
          <p
            className={`${
              isSalonOpen ? "text-green-600" : "text-red-600"
            } font-bold md:text-3xl text-2xl mx-3 `}
          >
            {isSalonOpen ? (
              "Salon is open"
            ) : (
              <>
                {closedDates.map((date) => (
                  <span className="flex ">
                    Salon is closed at
                    <div key={date}>
                      <span className="ml-2">{date}</span>
                    </div>
                  </span>
                ))}
              </>
            )}
          </p>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-300 body-font rounded-top">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Link
            to="/Home"
            className="flex title-font font-medium items-center md:justify-start justify-center"
          >
            <svg
              fill="#b690f9"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 376.715 376.715"
              className="w-8 h-8"
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
            <span className="ml-3 text-xl pt-3">Salon</span>
          </Link>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-700 sm:py-2 sm:mt-0 mt-4">
            © 2024 Salon —
            <a
              href="https://twitter.com/knyttneve"
              className="text-gray-400 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @knyttneve
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a
              href="https://www.facebook.com/"
              className="text-gray-400 hover:text-gray-100 ml-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://x.com/?lang=en-in"
              className="text-gray-400 hover:text-gray-100 ml-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/?hl=en"
              className="text-gray-400 hover:text-gray-100 ml-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              href="https://in.linkedin.com/"
              className="text-gray-400 hover:text-gray-100 ml-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </>
  );
};

export default AdminService;
