import React, { useState, useEffect, useContext } from "react";
import bookingContext from "../context/booking/bookingContext";
import Filters from "./Filters";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Scissors } from "lucide-react";

const AppointmentCard = () => {
  const host = "https://salon-backend-sigma.vercel.app";
  const context = useContext(bookingContext);
  const { booking, fetchbooking } = context;
  const [searchTerm, setSearchTerm] = useState({
    search: "",
    sort: "",
    status: "",
  });
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointments = await fetchbooking();
        if (Array.isArray(appointments)) {
          setFilteredAppointments(appointments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    if (!localStorage.getItem("token")) {
      navigate("/Login");
      return;
    }

    fetchAppointments();

    const interval = setInterval(fetchAppointments, 60000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filtered = Array.isArray(booking)
      ? booking.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.search.toLowerCase()) ||
          item.date.includes(searchTerm.search) ||
          item.service.some((service) =>
            service.toLowerCase().includes(searchTerm.search.toLowerCase())
          )
      )
      : [];

    if (searchTerm.status) {
      if (Array.isArray(searchTerm.status)) {
        filtered = filtered.filter((item) =>
          searchTerm.status.includes(item.status)
        );
      } else if (searchTerm.status === "canceled") {
        filtered = filtered.filter(
          (item) =>
            item.status === "canceled" || item.status === "canceled by user"
        );
      } else {
        filtered = filtered.filter((item) => item.status === searchTerm.status);
      }
    }
    if (searchTerm.sort === "newest") {
      filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (searchTerm.sort === "oldest") {
      filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredAppointments(filtered);
  }, [searchTerm, booking]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const capitalize = (word) => {
    if (!word) return "";
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const resetFilters = () => {
    setSearchTerm({ search: "", sort: "", status: "" });
  };

  const toggleAppointmentStatus = async (appointmentId) => {
    const appointment = filteredAppointments.find(
      (appt) => appt._id === appointmentId
    );

    if (appointment) {
      const updatedStatus = appointment.status === "done" ? "pending" : "done";

      try {
        const response = await fetch(
          `${host}/api/appointment/${appointmentId}/status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: updatedStatus }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update appointment status");
        }

        setFilteredAppointments((prevAppointments) =>
          prevAppointments.map((appt) =>
            appt._id === appointmentId
              ? { ...appt, status: updatedStatus }
              : appt
          )
        );
      } catch (error) {
        console.error("Error updating appointment status:", error);
      }
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await fetch(
        `${host}/api/appointment/${appointmentId}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }
      const { appointment } = await response.json();

      setFilteredAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt._id === appointmentId
            ? {
              ...appt,
              status: appointment.status,
              canceled: appointment.canceled,
            }
            : appt
        )
      );
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  return (
    <>
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resetFilters={resetFilters}
      />

      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          <AnimatePresence>
            {filteredAppointments.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <p className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      <User className="w-4 h-4 " />
                      Customer: <span className="font-semibold">{capitalize(item.name)}</span>
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" /> Date: {formatDate(item.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" /> Time: {item.time}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-gray-800">
                        <Scissors className="w-4 h-4 text-purple-600" /> Barber: {capitalize(item.barbar)}
                      </span>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2">
                      {item.service.map((srv, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-md border border-purple-200"
                        >
                          {capitalize(srv)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                    {item.status === "pending" && (
                      <button
                        className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-500 hover:bg-gray-600 text-white text-xs font-semibold transition"
                        onClick={() => cancelAppointment(item._id)}
                      >
                        Cancel Booking
                      </button>
                    )}
                    {item.status === "canceled by user" && (
                      <div className="text-red-600 font-bold text-sm bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
                        Canceled by customer
                      </div>
                    )}
                    {item.status === "canceled" && (
                      <div className="text-red-600 font-bold text-sm bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
                        Canceled appointment
                      </div>
                    )}
                    {item.status !== "canceled" &&
                      item.status !== "canceled by user" && (
                        <button
                          className={`px-4 py-2 rounded-lg font-bold text-xs transition shadow-sm ${item.status === "done"
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-amber-400 text-gray-900 hover:bg-amber-500"
                            }`}
                          onClick={() => toggleAppointmentStatus(item._id)}
                        >
                          {item.status === "done" ? "Done (Mark Pending)" : "Mark as Done"}
                        </button>
                      )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p className="text-gray-500 text-center py-8 bg-white rounded-xl border border-gray-200">
            No bookings available.
          </p>
        )}
      </div>
    </>
  );
};

export default AppointmentCard;
