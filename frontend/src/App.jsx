import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const {theme} = useThemeStore()

  console.log({onlineUsers});
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); // Ensure theme is applied on mount
  }, [theme]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )
    return (
      <div data-theme = {theme}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Homepage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>

        <Toaster />
      </div>
    );
};

export default App;
