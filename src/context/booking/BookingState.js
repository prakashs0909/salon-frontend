import React, { useState } from "react";
import BookingContext from "./bookingContext";

const BookingState = (props) => {
  const host = "https://salon-backend-sigma.vercel.app";
  const initialBooking = [];
  const [booking, setBooking] = useState(initialBooking);

  // Get all booking
  const fetchbooking = async () => {
    const response = await fetch(
      `${host}/api/appointment/fetchallappointments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    // console.log(json)
    setBooking(json.appointments || json);
  };
  // Get user's booking
  const fetchuserbooking = async () => {
    const response = await fetch(
      `${host}/api/appointment/fetchuserappointments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    // console.log(json)
    setBooking(json);
  };

  // Add a booking
  const addbooking = async (name, date, time, service) => {
    const checkresponse = await fetch(`${host}/api/appointment/checkbooking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ date, time }),
    });
  
    const existingBookings = await checkresponse.json();
  
    if (existingBookings.length > 0) {
      return { error: "This time slot is already booked. Please select a different time." };
    }

    const response = await fetch(`${host}/api/appointment/addbooking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ name, date, time, service }),
    });
    const newBooking = await response.json();
    console.log(newBooking);
    setBooking([...booking, newBooking]);
  };

  return (
    <div>
      <BookingContext.Provider
        value={{ booking, addbooking, fetchbooking, fetchuserbooking }}
      >
        {props.children}
      </BookingContext.Provider>
    </div>
  );
};

export default BookingState;
