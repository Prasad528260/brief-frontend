import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, removeUser } from "../store/userSlice";
import axiosInstance from "../utils/axiosinstance";
import toast from "react-hot-toast";

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        dispatch(setUser(res.data.data));
      } catch (err) {
        setError(err?.response?.data?.message || "Unauthorized");
        dispatch(removeUser());
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  const logout = async () => {
    await axiosInstance.post("/auth/logout", {});
    dispatch(removeUser());
    toast.success("Logged out");
  };

  const updateUser = async (name) => {
    const res = await axiosInstance.put(
      "/profile/update-name",
        { name }
    );
    dispatch(setUser({ ...user, name }));
    toast.success("Name updated");
    return res.data.data;
  };

  return { user, loading, error, logout, updateUser };
};

export default useUser;
