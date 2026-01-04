import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Body from "./layout/Body";
import Profile from "./pages/Profile";
import Verify from "./pages/Verify";
import Workspace from "./pages/Workspace";
import Landing from "./pages/Landing";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    const user = useSelector(state => state.user);
    // console.log("User from Redux:", user);
  
  return (
   <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
          
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/verify" element={<Verify />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
