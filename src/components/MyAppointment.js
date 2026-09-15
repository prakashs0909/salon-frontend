import { useState, useEffect, useContext } from "react";
import bookingContext from "../context/booking/bookingContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, LogOut, History, Calendar, Clock, Scissors } from "lucide-react";


const MyAppointments = () => {
  const host = "https://salon-backend-sigma.vercel.app";
  const context = useContext(bookingContext);
  const { booking, fetchuserbooking } = context;

  const [loading, setLoading] = useState(true);
  const [localBookings, setLocalBookings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchuserbooking();
      setLoading(false);
    } else {
      navigate("/Login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Array.isArray(booking)) {
      setLocalBookings(booking);
    }
  }, [booking]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/Login");
  };

  const capitalize = (word) => {
    if (!word) return "";
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const cancelAppointmentbyUSer = async (appointmentId) => {
    try {
      const response = await fetch(
        `${host}/api/appointment/${appointmentId}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "canceled by user" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }

      setLocalBookings((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId
            ? { ...appt, status: "canceled by user" }
            : appt
        )
      );
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* Header */}
      <ul className="flex items-center bg-gray-900 justify-between p-3 fixed-top z-40 text-white shadow-md">
        <button
          className="flex items-center gap-2 text-white hover:text-purple-400 transition"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold"></span>
        </button>

        <li className="flex items-center gap-2 text-xl font-bold text-white">
          <History className="w-5 h-5 text-purple-400" />
          <span>History</span>
        </li>

        <button
          className="flex items-center gap-2 text-white hover:text-red-400 transition"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Logout</span>
        </button>
      </ul>
      
      <div className="container mx-auto mt-6 px-4 max-w-4xl">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          My Appointments
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading your history...</p>
        ) : localBookings.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
            <p className="text-gray-600 text-lg">No appointments found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {localBookings.map((appointment) => (
                <motion.div
                  key={appointment._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="space-y-2">
                    <div className="font-semibold text-xl ">
                      {capitalize(appointment.name)}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" /> Date: {formatDate(appointment.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" /> Time: {appointment.time}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-gray-800">
                        <Scissors className="w-4 h-4 text-purple-600" /> Barber: {capitalize(appointment.barbar)}
                      </span>
                    </div>

                    <p className="text-xs text-amber-600 font-semibold bg-amber-50 p-2 rounded-md border border-amber-200 inline-block">
                      Please reach on time, otherwise your appointment will be canceled.
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      {appointment.service.map((srv, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-md border border-purple-200"
                        >
                          {capitalize(srv)}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3">
                      {appointment.status === "canceled by user" ? (
                        <div className="text-red-600 font-bold text-sm bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 inline-block">
                          Your appointment has been canceled by you
                        </div>
                      ) : appointment.status === "canceled" ? (
                        <div className="text-red-600 font-bold text-sm bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 inline-block">
                          Your appointment has been canceled because the barber is not available
                        </div>
                      ) : (
                        <button
                          className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold text-xs transition"
                          onClick={() => cancelAppointmentbyUSer(appointment._id)}
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
