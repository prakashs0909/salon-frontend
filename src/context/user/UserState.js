import React, { useState } from 'react';
import UserContext from "./userContext";

const UserState = (props) => {
  const host = "https://salon-backend-sigma.vercel.app/";
  const [user, setUser] = useState(null); // Initialize user state

  // get user details
  const getuser = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        // Handle server errors
        const errorData = await response.json();
        console.error("Failed to fetch user", errorData);
        return;
      }

      const json = await response.json();
      // console.log(json.role);
      setUser(json);// Save user data to state
      return json; 
    } catch (error) {
      console.error("An error occurred while fetching the user:", error);
      return null; // Save user data to state
    }
  };

  return (
    <UserContext.Provider value={{ getuser, user }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
