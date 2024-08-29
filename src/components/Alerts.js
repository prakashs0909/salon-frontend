import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Alerts(props) {
  const location = useLocation();
  const [bg, setBg] = useState("bg-gray-200");

  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  useEffect(() => {
    if (location.pathname === '/Signup' || location.pathname === '/') {
      setBg("bg-white-200");
    } else {
      setBg("bg-gray-200");
    }
  }, [location.pathname]);

  return (
    <div style={{ height: '38px' }} className={`mt-16 pt-2 ${bg}`}>
      {props.alert && (
        <div className={`alert alert-${props.alert.typ} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(props.alert.typ)}</strong>: {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alerts;
