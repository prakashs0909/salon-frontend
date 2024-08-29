import React, { useContext, useEffect, useState } from "react";
import serviceContext from "../context/service/serviceContext";

const AdminService = () => {
  const context = useContext(serviceContext);
  const { service, addservice, deleteservice, editservice, getallservice } =
    context;
  useEffect(() => {
    getallservice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [editingService, setEditingService] = useState(null);
  const [services, setService] = useState({ name: "", price: "", time: "" });

  const handleCreateService = (e) => {
    e.preventDefault();
    addservice(services.name, services.price, services.time);
    setService({ name: "", price: "", time: "" });
  };

  const handleInputChange = (e) => {
    setService({ ...services, [e.target.name]: e.target.value });
  };

  const handleUpdateService = (e) => {
    // console.log("update", editingService)
    e.preventDefault();
    editservice(editingService._id, editingService.name, editingService.price);
    setEditingService(null);
  };

  const handleEditInputChange = (e) => {
    setEditingService({ ...editingService, [e.target.name]: e.target.value });
  };

  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
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
        <td className="px-3">{service.price}</td>
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

  return (
    <>
      {/* <Service/> */}
      <div className="mt-16 bg-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 p-3">Services</h1>

        {/* Add New Service */}
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

        {/* Edit Service */}
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

        {/* Service List */}
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
    </>
  );
};

export default AdminService;
