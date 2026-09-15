import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Scissors, User, Mail, Lock, UserPlus } from "lucide-react";

const host = "https://salon-backend-sigma.vercel.app" || "http://localhost:3001";

const Signup = (props) => {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credential.name,
          email: credential.email,
          password: credential.password,
        }),
      });

      const json = await response.json();

      if (json.success) {
        props.showalert(
          "Verification link sent to your email. Please verify your account.",
          "success"
        );
        localStorage.setItem("token", json.authToken);
        setCredential({
          name: "",
          email: "",
          password: "",
        });
        
      } else {
        props.showalert(json.error || "Failed to create user", "danger");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      props.showalert("Something went wrong. Please try again later.", "danger");
    } finally {
      setLoading(false);
    }
  };

  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 bg-gray-100">
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
          Create an Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                name="name"
                type="text"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
                value={credential.name}
                autoComplete="name"
                onChange={onchange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
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

          <button
            type="submit"
            className="flex w-full justify-center items-center gap-2 rounded-lg bg-purple-600 px-4 py-3 text-sm font-bold text-white shadow hover:bg-purple-700 transition"
            disabled={loading}
          >
            <UserPlus className="w-4 h-4" />
            Create Account
          </button>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <span className="text-sm font-semibold text-gray-600">Already have an account?</span>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition"
              onClick={() => navigate("/")}
            >
              Login
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
