import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
 import { appfb } from "../../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
const navigate = useNavigate()
  const handleSignUp = async (e) => {
    e.preventDefault();
    const auth = getAuth(appfb);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem('user',JSON.stringify(result));
      navigate('/home')
   toast.success("signup Successfull")
    } catch (error) {
      setError(error.message);
    }
  };

  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <ToastContainer/>
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSignUp} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
         
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
             <Link to={'/'} className="text-sm text-blue-600">Already Have Account</Link>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
                <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
            </div>          
        </form>
      </div>
    </div>
  );
}

export default SignUp;
