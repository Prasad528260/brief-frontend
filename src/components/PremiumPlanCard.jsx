import { Zap, CheckCircle, Loader2 } from "lucide-react";
import axiosInstance from "../utils/axiosinstance.js";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function PremiumPlanCard() {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/payment/verify");
      console.log(response?.data);
      if (response?.data?.data?.plan === "premium") {
        toast.success(response?.data?.message);
        setIsUserPremium(true);
      } else {
        setIsUserPremium(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setIsUserPremium(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBuyPremium = async () => {
    try {
      const response = await axiosInstance.post("/payment/create");
      console.log(response.data.data);
      const order = response.data.data;
      const key_id = response.data.key_id;
      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: "BriefAi",
        description: "Premium Plan",
        order_id: order.orderId,
        prefill: {
          name: order.notes.name,
        },
        theme: {
          color: "#F37224",
        },
        handler: verifyPremiumUser,
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  // Premium User Badge
  if (isUserPremium) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8">
        <div className="max-w-sm mx-auto">
          <div className="relative bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5"></div>
            
            <div className="relative p-8 text-center">
              <div className="inline-flex w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <CheckCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">You're Premium!</h3>
              <p className="text-sm text-gray-400 mb-6">
                Enjoy unlimited access to advanced AI summaries
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                <Zap className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-semibold text-emerald-500">Premium Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Premium Plan Card
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-sm mx-auto">
        <div className="relative bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-600/5"></div>
          
          <div className="relative p-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
              <Zap className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
            <p className="text-sm text-gray-400 mb-6">Unlock advanced AI summaries</p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <p className="text-sm text-gray-300">10 AI-powered summaries</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-violet-500" />
                </div>
                <p className="text-sm text-gray-300">Google Gemini 2.0 Flash</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <p className="text-sm text-gray-300">Credits never expire</p>
              </div>
            </div>

            <button 
              onClick={handleBuyPremium}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-lg hover:from-blue-500 hover:to-violet-500 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
            >
              Buy Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}