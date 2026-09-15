import React, { useState, useContext, useEffect } from "react";
import bookingContext from "../context/booking/bookingContext";
import serviceContext from "../context/service/serviceContext";
import barberContext from "../context/barbars/barbarContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Calendar, Scissors, AlertCircle } from "lucide-react";

const BookingForm = (props) => {
  const navigate = useNavigate();
  const context = useContext(bookingContext);
  const { addbooking } = context;
  const { barbar, getallbarbar } = useContext(barberContext);
  const { service, getallservice } = useContext(serviceContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    date: "",
    time: "",
    service: "",
    checklist: [],
    barbar: "",
  });
  const [closedDates, setClosedDates] = useState([]);

  useEffect(() => {
    try {
      getallservice();
      getallbarbar();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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

    fetchClosedDates();
  }, []);

  const generateTimeSlots = () => {
    const times = [];
    const startHour = 9;
    const endHour = 18;

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute of [0, 30]) {
        const time = new Date(0, 0, 0, hour, minute, 0);
        const formattedTime = time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        times.push(formattedTime);
      }
    }
    return times;
  };

  const timeSlots = generateTimeSlots();

  const handleChecklistChange = (srv) => {
    setAppointmentData((prevData) => {
      const checklist = prevData.checklist.some(
        (item) => item.text === srv.name
      )
        ? prevData.checklist.filter((item) => item.text !== srv.name)
        : [...prevData.checklist, { text: srv.name, done: false }];
      return { ...prevData, checklist };
    });
  };

  const onchange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
    navigate("/Login");
    return;
  }

    const currentDate = new Date();
    const selectedDate = new Date(appointmentData.date);

    if (!appointmentData.name) {
      setError("Customer name is required.");
      return;
    }

    if (!appointmentData.date) {
      setError("Appointment date is required.");
      return;
    }

    if (!appointmentData.time) {
      setError("Appointment time is required.");
      return;
    }

    if (appointmentData.checklist.length === 0) {
      setError("Please select at least one service.");
      return;
    }

    if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
      setError("Cannot book an appointment in the past.");
      return;
    }

    if (!appointmentData.barbar) {
      setError("Please select a barber.");
      return;
    }

    if (closedDates.includes(appointmentData.date)) {
      setError("The salon is closed on the selected date.");
      return;
    }

    const servicesList = appointmentData.checklist.map((item) => item.text);

    const result = await addbooking(
      appointmentData.name,
      appointmentData.date,
      appointmentData.time,
      servicesList,
      appointmentData.barbar
    );
    if (result?.error) {
      setError(result.error);
    } else {
      setAppointmentData({ name: "", date: "", time: "", checklist: [], barbar: "" });
      setError("");
      navigate("/MyAppointments");
    }
  };

  const capitalize = (word) => {
    if (!word) return "";
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="px-5 py-8 ">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-lg bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
            <Calendar className="w-7 h-7 text-purple-600" />
            Book Appointment
          </h2>

          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Customer Name:
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={appointmentData.name || ""}
              onChange={onchange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">
              Date:
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              id="date"
              name="date"
              min={minDate}
              value={appointmentData.date || ""}
              onChange={onchange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="time" className="block text-gray-700 font-semibold mb-2">
              Time:
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition bg-white"
              id="time"
              name="time"
              value={appointmentData.time || ""}
              onChange={onchange}
              required
            >
              <option value="" disabled>
                Select Time Slot
              </option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <fieldset className="block">
              <legend className="block text-gray-700 font-semibold mb-2">
                Select Services:
              </legend>
              <div className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
                {loading ? (
                  <p className="text-gray-500">Loading services...</p>
                ) : (
                  service &&
                  service.map((srv) => (
                    <label
                      key={srv._id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id={srv._id}
                        checked={
                          appointmentData.checklist &&
                          appointmentData.checklist.some(
                            (item) => item.text === srv.name
                          )
                        }
                        onChange={() => handleChecklistChange(srv)}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="text-gray-800 font-medium">
                        {capitalize(srv.name)} (Rs {srv.price})
                      </span>
                    </label>
                  ))
                )}
              </div>
            </fieldset>
          </div>

          <div className="mb-5">
            <fieldset className="block">
              <legend className="block text-gray-700 font-semibold mb-2">
                Select Barber:
              </legend>
              <div className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
                {loading ? (
                  <p className="text-gray-500">Loading barbers...</p>
                ) : (
                  barbar &&
                  barbar.map((b) => (
                    <label
                      key={b._id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition cursor-pointer"
                    >
                      <input
                        type="radio"
                        id={b._id}
                        name="barbar"
                        value={b.name}
                        checked={appointmentData.barbar === b.name}
                        onChange={onchange}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-800 font-medium">
                        {capitalize(b.name)}
                      </span>
                    </label>
                  ))
                )}
              </div>
            </fieldset>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-purple-700 transition"
          >
            Book Now
          </motion.button>
        </motion.form>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 body-font mt-16">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Link
            to="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-white gap-2"
          >
            <div className="p-1.5 rounded-lg bg-violet-600">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Fashion Corner</span>
          </Link>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-700 sm:py-2 sm:mt-0 mt-4">
            © 2026 Salon —
            <a
              href="https://twitter.com/knyttneve"
              className="text-gray-400 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @knyttneve
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start gap-4">
            <a href="https://www.facebook.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a href="https://x.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a href="https://in.linkedin.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default BookingForm;
