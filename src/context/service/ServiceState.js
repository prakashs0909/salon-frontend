import React, { useState } from "react";
import ServiceContext from "./serviceContext";

const ServiceState = (props) => {
  const host = "http://localhost:3001";
  const initialServices = [];
  const [service, setService] = useState(initialServices);

  // get all service
  const getallservice = async () => {
    // api call
    const response = await fetch(`${host}/api/services/fetchallservices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // console.log(json)
    setService(json);
  };

  // Add a service
  const addservice = async (name, price, time) => {
    // api call
    const response = await fetch(`${host}/api/services/addservices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, time }),
    });
    const newService = await response.json();
    setService([...service, newService]);
  };

  // Delete service
  const deleteservice = async (id) => {
    // api call
    const response = await fetch(`${host}/api/services/deleteservices/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);

    const newservice = service.filter((newService) => {
      return newService._id !== id;
    });
    setService(newservice);
  };

  // Edit a service
  const editservice = async (id, name, price) => {
    // api call
    const response = await fetch(`${host}/api/services/updateservices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price }),
    });
    const json = await response.json();
    console.log(json);

    let NewService = JSON.parse(JSON.stringify(service));
    // logic for update
    for (let index = 0; index < NewService.length; index++) {
      const element = NewService[index];
      if (element._id === id) {
        NewService[index].name = name;
        NewService[index].price = price;
        // NewService[index].time = time;
        break;
      }
    }
    setService(NewService);
  };

  return (
    <div>
      <ServiceContext.Provider
        value={{
          service,
          addservice,
          deleteservice,
          editservice,
          getallservice,
        }}
      >
        {props.children}
      </ServiceContext.Provider>
    </div>
  );
};

export default ServiceState;
