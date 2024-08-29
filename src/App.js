import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Price from './components/Price';
import Login from './components/Login';
import Contact from './components/Contact';
import BookingForm from './components/BookingForm';
import AppointmentList from './components/AppointmentList';
import AdminService from './components/AdminService';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import MyAppointments from './components/MyAppointment';
import ServiceState from './context/service/ServiceState';
import BookingState from './context/booking/BookingState';
import UserState from './context/user/UserState';
import MaybeShowNavbar from './components/MaybeShowNavbar';
import MaybeShowAlert from './components/MaybeShowAlert';
import React, {useState} from 'react';
import Alerts from './components/Alerts';

function App() {
  const [alert, setAlert] = useState(null);

  const showalert=(message, type)=>{
    setAlert({
      msg: message,
      typ: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2500);
  }
  return (
    <>
    <BookingState>
    <ServiceState>
    <UserState>
      <BrowserRouter>
        <MaybeShowNavbar>
          <Navbar/>
        </MaybeShowNavbar>
        <MaybeShowAlert>
            {/* <div className="mt-16 bg-gray-200"> */}
              <Alerts alert={alert}/>
            {/* </div> */}
        </MaybeShowAlert>
        <Routes>
          <Route exact path="/Home" Component={Home} />
          <Route exact path="/About" Component={About} />
          <Route exact path="/Price" Component={Price} />
          <Route exact path="/BookingForm" element={<BookingForm showalert={showalert}/>} />
          <Route exact path="/AppointmentList" Component={AppointmentList} />
          <Route exact path="/Contact" Component={Contact} />
          <Route exact path="/AdminService" Component={AdminService} />
          <Route exact path="/" element={<Login showalert={showalert}/>} />
          <Route exact path="/Signup" element={<Signup showalert={showalert} />} />
          <Route exact path="/MyAppointments" Component={MyAppointments} />
        </Routes>
      </BrowserRouter>
    </UserState>
    </ServiceState>
    </BookingState>
    </>
  );
}

export default App;
