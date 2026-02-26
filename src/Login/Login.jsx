
import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../Api/Api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ArrowUpRight, Mail, Lock, LogIn } from "lucide-react"; 
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      
      // ২. সফল হলে টোস্ট মেসেজ দেখান
      toast.success("Successfully logged in!");

      // একটু সময় নিয়ে ন্যাভিগেট করুন যাতে ইউজার টোস্টটি দেখতে পায়
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (err) {
      toast.error("Invalid email or password");
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05050a] relative overflow-hidden font-sans">
      
      {/* ৩. Toaster কম্পোনেন্টটি এখানে রাখুন */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md z-10 px-4">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] mb-4 transition-transform hover:scale-110">
            <ArrowUpRight size={35} strokeWidth={3} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter italic">Fluxalytica</h1>
          <p className="text-slate-500 text-xs mt-1 tracking-[0.3em] uppercase font-bold">Secure Dashboard Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#080812] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

          <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Login Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/5 p-3.5 pl-12 rounded-2xl text-white outline-none focus:bg-white/[0.04] focus:border-indigo-500/30 transition-all placeholder:text-slate-700"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/5 p-3.5 pl-12 pr-12 rounded-2xl text-white outline-none focus:bg-white/[0.04] focus:border-indigo-500/30 transition-all placeholder:text-slate-700"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-600 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </span>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full relative mt-4 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:scale-105 group-active:scale-95 rounded-2xl"></div>
              <div className="relative py-4 text-white font-bold tracking-wide flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Login 
                    <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          <p className="text-center mt-8 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
            Fluxalytica Protection System
          </p>
        </div>
      </div>
    </div>
  );
}