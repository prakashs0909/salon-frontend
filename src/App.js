import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Price from "./components/Price";
import Login from "./components/Login";
import Contact from "./components/Contact";
import BookingForm from "./components/BookingForm";
import AppointmentList from "./components/AppointmentList";
import AdminService from "./components/AdminService";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import MyAppointments from "./components/MyAppointment";
import ServiceState from "./context/service/ServiceState";
import BookingState from "./context/booking/BookingState";
import UserState from "./context/user/UserState";
import MaybeShowNavbar from "./components/MaybeShowNavbar";
import VerifiedMail from "./components/VerifiedMail";
import MaybeShowAlert from "./components/MaybeShowAlert";
import { useState, Suspense } from "react";
import Alerts from "./components/Alerts";
import { BarbarState } from "./context/barbars/BarbarState";
import Loader from "./components/Loader";

function App() {
  const [alert, setAlert] = useState(null);

  const showalert = (message, type) => {
    setAlert({
      msg: message,
      typ: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  return (
    <>
      <BookingState>
        <ServiceState>
          <BarbarState>
            <UserState>
              <BrowserRouter>
                <MaybeShowNavbar>
                  <Navbar />
                </MaybeShowNavbar>
                <MaybeShowAlert>
                  <Alerts alert={alert} />
                </MaybeShowAlert>
                <Suspense fallback={<Loader />}>
                  <Routes>
                    <Route exact path="/" Component={Home} />
                    <Route exact path="/About" Component={About} />
                    <Route exact path="/Price" Component={Price} />
                    <Route
                      exact
                      path="/BookingForm"
                      Component={BookingForm}
                    />
                    <Route
                      exact
                      path="/AppointmentList"
                      Component={AppointmentList}
                    />
                    <Route exact path="/Contact" Component={Contact} />
                    <Route
                      exact
                      path="/AdminService"
                      Component={AdminService}
                    />
                    <Route
                      exact
                      path="/Login"
                      Component={Login} 
                    />
                    <Route
                      exact
                      path="/Signup"
                      element={<Signup showalert={showalert} />}
                    />
                    <Route
                      exact
                      path="/MyAppointments"
                      Component={MyAppointments}
                    />
                    <Route
                      exact
                      path="/VerifiedMail"
                      Component={VerifiedMail}
                    />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </UserState>
          </BarbarState>
        </ServiceState>
      </BookingState>
    </>
  );
}

export default App;
