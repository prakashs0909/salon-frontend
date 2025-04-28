import React, { useState, useEffect, useContext } from "react";
import bookingContext from "../context/booking/bookingContext";
import Filters from "./Filters";

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

  // Fetch appointments when the component mounts
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
    fetchAppointments();
  }, [fetchbooking]);

  // Update filteredAppointments based on searchTerm and booking changes
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
        // Handle multiple statuses (e.g., "canceled" and "canceled by user")
        filtered = filtered.filter((item) =>
          searchTerm.status.includes(item.status)
        );
      } else if (searchTerm.status === "canceled") {
        // Include both "canceled" and "canceled by user" for the "canceled" filter
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
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const capitalize = (word) => {
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
          const errorText = await response.text();
          console.error("Error updating appointment status:", errorText);
          throw new Error("Failed to update appointment status");
        }

        // Update the status locally in the state
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
        const errorText = await response.text();
        console.error("Error canceling appointment:", errorText);
        throw new Error("Failed to cancel appointment");
      }
      const { appointment } = await response.json();

      // Update state to reflect the canceled status
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

      <ol className="list-group list-group-numbered font-semibold">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((item) => (
            <li
              key={item._id}
              className="bg-gray-100 border border-gray-300 mb-4 p-4 rounded-lg shadow-md d-flex fs-5"
            >
              <div className="ms-2 me-auto">
                <p className="font-semibold">
                  Customer:{" "}
                  <span className="text-gray-700">{capitalize(item.name)}</span>
                </p>
                <p className="font-semibold">
                  Date:{" "}
                  <span className="text-gray-700">{formatDate(item.date)}</span>
                </p>
                <p className="font-semibold">
                  Time: <span className="text-gray-700">{item.time}</span>
                </p>
                {item.service.map((service, index) => (
                  <span
                    key={index}
                    className="text-gray-700 block font-semibold"
                  >
                    {capitalize(service)}
                  </span>
                ))}
                <div className="mt-2 d-flex">
                  {item.status === "pending" && (
                    <button
                      className="p-2 border border-gray-300 rounded-md bg-gray-500 text-white mr-8"
                      onClick={() => cancelAppointment(item._id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                  {item.status === "canceled by user" && (
                    <div className="text-red-500 font-bold">
                      Canceled by customer
                    </div>
                  )}
                  {item.status === "canceled" && (
                    <div className="text-red-500 font-bold">
                      Canceled appointment
                    </div>
                  )}
                  {item.status !== "canceled" &&
                    item.status !== "canceled by user" && (
                      <button
                        className={`p-2 border border-gray-300 rounded-md mr-2 ${
                          item.status === "done" ? "bg-green-300" : "bg-red-300"
                        }`}
                        onClick={() => toggleAppointmentStatus(item._id)}
                      >
                        {item.status === "done" ? "Mark as Pending" : "Done"}
                      </button>
                    )}
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </ol>
    </>
  );
};

export default AppointmentCard;
