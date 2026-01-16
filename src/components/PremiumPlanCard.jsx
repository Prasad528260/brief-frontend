import { Zap } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
export default function PremiumPlanCard() {
  const handleBuyPremium = async() => {
    try {   
      const response = await axiosInstance.post("/payment/create");
      console.log(response.data.data);
      const order = response.data.data;
      const key_id = response.data.key_id;
      const options = {
        key: key_id, // Replace with your Razorpay key_id
        amount: order.amount, // Amount is in currency subunits.
        currency: order.currency,
        name: "BriefAi",
        description: 'Premium Plan',
        order_id: order.orderId, // Your success URL
        prefill: {
          name: order.notes.name,
        },
        theme: {
          color: '#F37224'
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="max-w-sm mx-auto px-4">
      <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950 overflow-hidden shadow-xl">
        {/* Soft gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-600/10" />

        <div className="relative p-7 flex flex-col">
          {/* Icon */}
          <div className="mb-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-md shadow-blue-500/30">
              <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-semibold text-white tracking-tight">
            Premium
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Power summaries with premium AI
          </p>

          {/* Divider */}
          <div className="my-5 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

          {/* Features */}
          <ul className="space-y-2 mb-7">
            <li className="text-sm text-zinc-300 flex items-center gap-2">
              <span className="text-blue-500">•</span>
              10 AI-powered summaries
            </li>
            <li className="text-sm text-zinc-300 flex items-center gap-2">
              <span className="text-violet-500">•</span>
              Google Gemini 2.0 Flash
            </li>
            <li className="text-sm text-zinc-400">
              Credits-based usage (no expiry)
            </li>
          </ul>

          {/* CTA */}
          <button onClick={() => handleBuyPremium()}
            className="mt-auto w-full py-3.5 rounded-xl font-semibold text-white
        bg-gradient-to-r from-blue-600 to-violet-600
        hover:from-blue-500 hover:to-violet-500
        transition-all duration-200
        shadow-lg shadow-blue-600/20
        focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            Buy Premium
          </button>
        </div>
      </div>
    </div>
  );
}
