import React from 'react'
import { Zap, Loader2, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { useState, useRef,useEffect } from 'react';
import axiosInstance from '../utils/axiosinstance';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const Verify = () => {

   const user = useSelector((state) => state.user);
  //  console.log(user);

  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    // console.log(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
    
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    console.log('OTP Value:', otpValue); 
    if (otpValue.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }
    try {
    setIsLoading(true);
    const email = user?.email;
    const res = await axiosInstance.post('/auth/verify-otp', {
      email,
      otp: otpValue,
    });
    console.log(res?.data);
    toast.success(res?.data?.message);
    navigate('/workspace');
    }catch(error){
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }finally{
      setIsLoading(false);
    }
  
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
    console.log('OTP resent');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Logo heading="Verify OTP" paragraph="Enter the 6-digit code sent to your email" />

        {/* OTP Card */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 shadow-2xl">
          <div className="space-y-6">
            {/* OTP Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide text-center">
                Enter Code
              </label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={isLoading}
                    className={`w-12 h-12 text-center text-lg font-bold bg-zinc-900 border ${
                      error ? 'border-red-500' : 'border-zinc-800'
                    } rounded-xl text-white focus:outline-none ${
                      error ? 'focus:border-red-500' : 'focus:border-blue-500'
                    } transition-all disabled:opacity-50`}
                  />
                ))}
              </div>
              {error && (
                <p className="mt-3 text-xs text-red-500 text-center">{error}</p>
              )}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold rounded-lg hover:from-blue-500 hover:to-violet-500 focus:outline-none transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </button>

            {/* Resend Link */}
            <div className="text-center">
              <p className="text-gray-500 text-xs mb-2">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResend}
                disabled={isLoading}
                className="text-blue-400 hover:text-blue-300 font-semibold text-xs transition-colors disabled:opacity-50"
              >
                Resend OTP
              </button>
            </div>
          </div>

          {/* Footer */}
         <Footer paragraph="Didn't receive the code?" linkText="Resend OTP" onClick={handleResend}/>
        </div>
      </div>
    </div>
  )
}

export default Verify