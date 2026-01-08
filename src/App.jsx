import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Body from "./layout/Body";
import Profile from "./pages/Profile";
import Verify from "./pages/Verify";
import Workspace from "./pages/Workspace";
import Landing from "./pages/Landing";
import { Toaster } from "react-hot-toast";
import { setUser,removeUser } from "./store/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axiosInstance from "./utils/axiosinstance";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        // console.log(res.data.data);
        dispatch(setUser(res.data.data));
      } catch (err) {
        console.log(err?.response?.data?.message);
        dispatch(removeUser());
      }
    };

    getUser();
  }, [dispatch]);
  return (
   <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
          
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/verify" element={<Verify />} />
         
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
