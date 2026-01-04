import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, Zap, Loader2 } from "lucide-react";
import toast  from "react-hot-toast";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import axiosInstance from "../utils/axiosinstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser,removeUser } from "../store/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!name.trim()) {
        newErrors.name = "Name is required";
      }
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!isLogin) {
      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      setIsLoading(true);
      let res;
      if (isLogin) {
        res = await axiosInstance.post("/auth/login", {
          email,
          password,
        });
        res = res.data;
        // console.log(res?.data);
        dispatch(setUser(res?.data));
      } else {
        res = await axiosInstance.post("/auth/signup", {
          name,
          email,
          password,
        });
        res = res.data;
      }
      setIsLoading(false);
      console.log(res?.message);
      toast.success(res?.message);
      if(!res?.data?.isEmailVerified){
        navigate("/verify");
      }
      else{
        navigate("/workspace");
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      setIsLoading(false);
      console.log(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Logo heading = {isLogin ? "Login" : "Create Account"} paragraph ="BriefAi - From chaos to clarity"/>

        {/* Form Card */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            {isLogin ? null : (
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`w-full px-3 py-2.5 bg-zinc-900 border ${
                    errors.name ? "border-red-500" : "border-zinc-800"
                  } rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none ${
                    errors.name
                      ? "focus:border-red-500"
                      : "focus:border-blue-500"
                  } transition-all`}
                  placeholder="John Doe"
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className={`w-full px-3 py-2.5 bg-zinc-900 border ${
                  errors.email ? "border-red-500" : "border-zinc-800"
                } rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none ${
                  errors.email
                    ? "focus:border-red-500"
                    : "focus:border-blue-500"
                } transition-all`}
                placeholder="john@company.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  className={`w-full px-3 py-2.5 bg-zinc-900 border ${
                    errors.password ? "border-red-500" : "border-zinc-800"
                  } rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none ${
                    errors.password
                      ? "focus:border-red-500"
                      : "focus:border-blue-500"
                  } transition-all pr-10`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            {isLogin ? null : (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword)
                        setErrors({ ...errors, confirmPassword: "" });
                    }}
                    className={`w-full px-3 py-2.5 bg-zinc-900 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-zinc-800"
                    } rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none ${
                      errors.confirmPassword
                        ? "focus:border-red-500"
                        : "focus:border-blue-500"
                    } transition-all pr-10`}
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full mt-6 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold rounded-lg hover:from-blue-500 hover:to-violet-500 focus:outline-none transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isLogin ? "Logging In..." : "Creating Account..."}
                </>
              ) : isLogin ? (
                "Login"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <Footer paragraph={isLogin
                ? "Don't have an account ? "
                : "Already have an account ? "} linkText={isLogin ? "Sign Up" : "Sign In"} onClick={() => setIsLogin(!isLogin)}/>
      
        
        </div>
      </div>
    </div>
  );
};

export default Signup;
