import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../context/user/userContext";
import Loader from "./Loader";
import { motion } from "framer-motion";
import { Scissors, Mail, Lock, LogIn, AlertCircle } from "lucide-react";

const host = "https://salon-backend-sigma.vercel.app" || "http://localhost:3001";

const Login = () => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const context = useContext(userContext);
  const { getuser } = context;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credential.email,
          password: credential.password,
        }),
      });
      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        const userData = await getuser();

        if (userData && userData.role === "admin") {
          navigate("/AppointmentList");
        } else {
          navigate("/");
        }
      } else {
        setError(json.error || "Invalid username and password");
        if (json.resendVerification) {
          await fetch(`${host}/api/auth/resend-verification`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credential.email,
            }),
          });
        }
      }
    } catch (err) {
      setError("Invalid username and password");
    } finally {
      setLoading(false);
    }
  };

  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <Loader />
        </div>
      )}
      <div className="flex min-h-screen flex-col justify-center px-6 py-16 bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-2xl bg-purple-600 shadow-md text-white">
              <Scissors className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 mb-6">
            Login to Account
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
                  value={credential.email}
                  autoComplete="email"
                  onChange={onchange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
                  value={credential.password}
                  onChange={onchange}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="flex w-full justify-center items-center gap-2 rounded-lg bg-purple-600 px-4 py-3 text-sm font-bold text-white shadow hover:bg-purple-700 transition"
              disabled={loading}
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm font-semibold text-gray-600">Don't have an account?</span>
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition"
                onClick={() => navigate("/Signup")}
              >
                Sign Up
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
