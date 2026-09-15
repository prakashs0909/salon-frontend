import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import serviceContext from "../context/service/serviceContext";
import barbarContext from "../context/barbars/barbarContext";
import { Scissors, User, Calendar } from "lucide-react";

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
        setClosedDates(response.data.closedDates || []);
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
    if (editingService) {
      setEditingService({ ...editingService, [e.target.name]: e.target.value });
    }
    if (editingBarbar) {
      setEditingBarbar({ ...editingBarbar, [e.target.name]: e.target.value });
    }
  };

  const capitalize = (word) => {
    if (!word) return "";
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const toggleSalonStatus = async () => {
    try {
      const newStatus = !isSalonOpen;
      setIsSalonOpen(newStatus);
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
      setClosedDates(response.data.closedDates || []);
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
      setClosedDates(response.data.closedDates || []);
    } catch (error) {
      console.error("Error removing closed date:", error);
    }
  };

  let result = service.map((srv) => {
    let unit = srv.time <= 5 ? "hrs" : "min";
    return (
      <tr key={srv._id} className="border-b border-gray-200">
        <td className="px-4 py-3 font-semibold">{capitalize(srv.name)}</td>
        <td className="px-4 py-3 font-semibold text-purple-700">{srv.price} Rs.</td>
        <td className="px-4 py-3 text-gray-600">{srv.time} {unit}</td>
        <td className="px-4 py-3">
          <div className="flex gap-2">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs font-semibold"
              onClick={() => setEditingService(srv)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold"
              onClick={() => deleteservice(srv._id)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });

  let barbarResult = barbar.map((b) => {
    return (
      <tr key={b._id} className="border-b border-gray-200">
        <td className="px-4 py-3 font-semibold">{capitalize(b.name)}</td>
        <td className="px-4 py-3">
          <div className="flex gap-2">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs font-semibold"
              onClick={() => setEditingBarbar(b)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold"
              onClick={() => deletebarbar(b._id)}
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
    <div className="pt-7 bg-gray-100 min-h-screen pb-16">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        
        {/* Services Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <Scissors className="w-7 h-7 text-purple-600" />
            Services Management
          </h1>

          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Add New Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <input
                type="text"
                name="name"
                placeholder="Service Name"
                value={services.name}
                onChange={handleInputChange}
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <input
                type="number"
                name="price"
                placeholder="Price (Rs)"
                value={services.price}
                onChange={handleInputChange}
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <input
                type="number"
                name="time"
                placeholder="Time (mins/hrs)"
                value={services.time}
                onChange={handleInputChange}
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <button
              disabled={
                services.name.length < 3 ||
                services.price.length < 1 ||
                services.time.length < 1
              }
              onClick={handleCreateService}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-2 px-5 rounded-lg text-sm transition"
            >
              Add Service
            </button>
          </div>

          {editingService && (
            <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
              <h2 className="text-lg font-bold text-purple-900 mb-3">Edit Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={editingService.name}
                  onChange={handleEditInputChange}
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={editingService.price}
                  onChange={handleEditInputChange}
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>
              <div className="flex gap-3">
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition"
                  onClick={handleUpdateService}
                >
                  Update Service
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition"
                  onClick={() => setEditingService(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm font-bold border-b border-gray-200">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>{result}</tbody>
            </table>
          </div>
        </div>

        {/* Barbars Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <User className="w-7 h-7 text-purple-600" />
            Barbers Management
          </h1>

          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Add New Barber</h2>
            <div className="max-w-md mb-3">
              <input
                type="text"
                name="name"
                placeholder="Barber Name"
                value={barbars.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <button
              disabled={barbars.name.length < 2}
              onClick={handleCreateBarbar}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-2 px-5 rounded-lg text-sm transition"
            >
              Add Barber
            </button>
          </div>

          {editingBarbar && (
            <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
              <h2 className="text-lg font-bold text-purple-900 mb-3">Edit Barber</h2>
              <div className="max-w-md mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={editingBarbar.name}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>
              <div className="flex gap-3">
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition"
                  onClick={handleUpdateBarbar}
                >
                  Update Barber
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition"
                  onClick={() => setEditingBarbar(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm font-bold border-b border-gray-200">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>{barbarResult}</tbody>
            </table>
          </div>
        </div>

        {/* Salon Closed/Open Detail Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <Calendar className="w-7 h-7 text-purple-600" />
            Salon Closed
          </h1>

          <div className="max-w-md">
            <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">
              Select Date:
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 text-sm"
              id="date"
              name="date"
              min={minDate}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button
              className={`px-6 py-2.5 rounded-lg text-white font-bold transition shadow ${
                isSalonOpen
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
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
              {isSalonOpen ? "Set Salon Closed" : "Set Salon Open"}
            </button>
          </div>

          <div>
            <div
              className={`${
                isSalonOpen ? "text-green-600" : "text-red-600"
              } font-bold text-2xl sm:text-3xl`}
            >
              {isSalonOpen ? (
                "Salon is currently OPEN"
              ) : (
                <div className="space-y-1">
                  <span>Salon is closed at:</span>
                  {closedDates.map((d) => (
                    <div key={d} className="text-xl text-gray-800 font-semibold">
                      • {d}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminService;
