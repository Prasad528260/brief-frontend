import { useEffect, useState } from "react";
import {
  Zap,
  Mail,
  User,
  CheckCircle,
  XCircle,
  Edit2,
  Save,
  X,
  Loader2,
} from "lucide-react";
import useUser from "../hooks/useUser";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { updateUser, loading, error: updateError, logout, user } = useUser();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.name) {
      setEditedName(user.name);
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedName(user?.name || "");
    setError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(user?.name || "");
    setError("");
  };

  // console.log(user);

  const handleSave = async () => {
    if (!editedName.trim()) {
      setError("Name cannot be empty");
      return;
    }

    try {
      await updateUser(editedName);
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
  };

  // 🔥 block UI until user is actually loaded
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Loader2 className="animate-spin text-white" size={24} />
      </div>
    );
  }

  if (updateError)
    return (
      <div className="text-red-500">
        {typeof updateError === "string" ? updateError : "An error occurred"}
      </div>
    );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Logo heading="Profile" paragraph="Manage your account settings" />

        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 shadow-2xl">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                Available Tokens
              </label>
              <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">
                      {user?.token || 0}
                    </p>
                    <p className="text-xs text-gray-500">tokens remaining</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/pricing")}
                  className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-xs text-gray-300 font-semibold rounded-lg hover:bg-zinc-700 hover:text-white transition-all"
                >
                  Get More
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <User className="w-4 h-4" />
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => {
                      setEditedName(e.target.value);
                      setError("");
                    }}
                    className={`w-full pl-10 pr-3 py-2.5 bg-zinc-900 border ${
                      error ? "border-red-500" : "border-zinc-800"
                    } rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none ${
                      error ? "focus:border-red-500" : "focus:border-blue-500"
                    } transition-all`}
                    placeholder="Enter your name"
                  />
                ) : (
                  <div className="w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white">
                    {user?.name}
                  </div>
                )}
              </div>
              {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-gray-500">
                  {user?.email}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                Verification Status
              </label>

              <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-2">
                  {user?.isEmailVerified ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500 font-medium">
                        Email Verified
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-amber-500 font-medium">
                        Not Verified
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {isEditing ? (
              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold rounded-lg hover:from-blue-500 hover:to-violet-500 focus:outline-none transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center"
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  Save Changes
                </button>

                <button
                  onClick={handleCancel}
                  className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 text-gray-400 text-sm font-bold rounded-lg hover:border-zinc-700 hover:text-gray-300 focus:outline-none transition-all flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="w-full mt-6 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold rounded-lg hover:from-blue-500 hover:to-violet-500 focus:outline-none transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center"
              >
                <Edit2 className="w-4 h-4 mr-1.5" />
                Edit Profile
              </button>
            )}
          </div>

          <div className="mt-6 text-center border-t border-zinc-900 pt-5">
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="text-red-400 hover:text-red-300 font-semibold text-xs transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
