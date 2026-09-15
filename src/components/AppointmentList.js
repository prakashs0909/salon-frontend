import { useNavigate } from "react-router-dom";
import AppointmentCard from "./AppointmentCard";
import { ArrowLeft, LogOut, Calendar } from "lucide-react";

const AppointmentList = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Fixed Header */}
      <ul className="flex items-center bg-gray-900 justify-between p-3 fixed-top z-40 text-white shadow-md">
        <button
          className="flex items-center gap-2 text-white hover:text-purple-400 transition"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <li className="flex items-center gap-2 text-sm md:text-xl font-bold text-white">
          <Calendar className="w-5 h-5 text-purple-400" />
          <span>Appointments Dashboard</span>
        </li>

        <button
          className="flex items-center gap-2 text-white hover:text-red-400 transition"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Logout</span>
        </button>
      </ul>

      <div className="container mx-auto mt-6 px-4">
        <AppointmentCard />
      </div>
    </div>
  );
};

export default AppointmentList;
