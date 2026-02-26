import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  LayoutDashboard, BarChart3, Users, Box, MessageSquare, 
  Search, PlusCircle, LogOut, ArrowUpRight, Bell, Sparkles
} from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("You must log in first");
      setLoading(false);
      return;
    }

    axios
      .get("https://task-api-eight-flax.vercel.app/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch dashboard data");
        setLoading(false);
      });
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const filteredUsers = data?.users?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loggedInAdmin = data?.users?.find(user => user.role === 'admin') || data?.users?.[0];

  if (loading) return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#05050a] text-indigo-500">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <div className="font-bold tracking-widest animate-pulse uppercase text-xs">Accessing Fluxalytica...</div>
    </div>
  );

  if (error) return <div className="flex h-screen items-center justify-center text-red-400 font-bold bg-[#05050a]">{error}</div>;

  return (
    <div className="flex h-screen bg-[#05050a] text-slate-400 overflow-hidden font-sans">
      
      {/* --- SIDEBAR (Deep Dark Indigo Style) --- */}
      <aside className="w-72 bg-[#080812] border-r border-white/5 p-8 flex flex-col gap-10 shadow-2xl">
        <div className="flex items-center gap-3 text-white font-bold text-2xl">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            <ArrowUpRight size={24} strokeWidth={3} />
          </div>
          <span className="tracking-tighter">Fluxalytica</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 mb-2 ml-2">Analytics</p>
          <NavItem icon={<LayoutDashboard size={20}/>} label="Overview" active />
          <NavItem icon={<BarChart3 size={20}/>} label="Performance" />
          <NavItem icon={<Users size={20}/>} label="Team" />
          <NavItem icon={<Box size={20}/>} label="Inventory" />
          <NavItem icon={<MessageSquare size={20}/>} label="Support" badge="13" />
        </nav>

        <div className="mt-auto flex flex-col gap-6 pt-6 border-t border-white/5">
          <button onClick={handleLogout} className="flex items-center gap-3 text-slate-500 hover:text-red-400 transition-colors text-sm font-bold px-2 group">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            <span>Exit System</span>
          </button>

          <div className="flex items-center gap-3 p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-lg">
              {loggedInAdmin?.name?.charAt(0) || "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm text-white font-bold truncate group-hover:text-indigo-400 transition-colors">{loggedInAdmin?.name || "Admin"}</p>
              <p className="text-[10px] text-slate-600 truncate italic tracking-tight">{loggedInAdmin?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto p-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#0c0c1f] via-[#05050a] to-[#05050a]">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter">Market Overview</h1>
            <p className="text-slate-500 text-sm mt-1 tracking-wide">Synthesizing real-time data flow...</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-slate-400 hover:text-indigo-400 hover:border-indigo-400/30 cursor-pointer transition-all">
                <Bell size={20} />
             </div>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2 font-black hover:scale-105 shadow-[0_10px_30px_rgba(79,70,229,0.3)] active:scale-95 transition-all">
              <PlusCircle size={20} /> Deploy Unit
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-800 to-purple-900 text-white p-8 rounded-[2.5rem] flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
            <div className="z-10">
              <Sparkles className="mb-4 text-indigo-300" size={24} />
              <h3 className="text-2xl font-black leading-none tracking-tighter uppercase italic">Welcome back, {loggedInAdmin?.name?.split(' ')[0]}!</h3>
              <p className="text-sm font-bold opacity-70 mt-3 tracking-wide">Systems are 100% operational.</p>
            </div>
            <button className="mt-8 text-[10px] font-black uppercase tracking-widest border-b border-indigo-300 w-fit hover:text-indigo-300 transition z-10">Global Report</button>
          </div>
          <StatCard title="Network Nodes" amount={data?.users?.length || 0} trend="+12.5% vs last month" />
          <StatCard title="Active Assets" amount={data?.products?.length || 0} trend="Optimized" color="indigo" />
        </div>

        {/* Team & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#080812] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white tracking-tight">Active Operatives</h2>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-lg font-black uppercase tracking-widest border border-indigo-500/20">
                  {filteredUsers?.length} Online
                </span>
              </div>
              <div className="relative group">
                <Search className="absolute left-4 top-3.5 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Filter by identity..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 w-full rounded-2xl bg-white/[0.02] border border-white/5 focus:bg-white/[0.04] focus:border-indigo-500/30 outline-none transition-all text-sm text-white" 
                />
              </div>
            </div>

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredUsers?.map((user) => (
                <UserItem key={user.id} name={user.name} email={user.email} role={user.role} />
              ))}
            </div>
          </div>

          <div className="bg-[#080812] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col">
            <h2 className="text-xl font-bold text-white tracking-tight mb-8">Data Flux</h2>
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" hide />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.02)'}} 
                    contentStyle={{ backgroundColor: '#080812', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} 
                  />
                  <Bar dataKey="income" radius={[4, 4, 4, 4]} barSize={10}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#312e81'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 flex justify-center gap-6 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-600"></div> Revenue
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#312e81]"></div> Expenses
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Helper Components ---
const NavItem = ({ icon, label, active, badge }) => (
  <div className={`flex items-center justify-between px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 ${active ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black shadow-[0_10px_20px_rgba(79,70,229,0.2)]' : 'text-slate-500 hover:text-white hover:bg-white/5 group'}`}>
    <div className="flex items-center gap-4">
      <span className={active ? "text-white" : "text-slate-600 group-hover:text-indigo-400"}>{icon}</span>
      <span className="text-[14px] tracking-tight">{label}</span>
    </div>
    {badge && <span className={`text-[10px] px-2 py-0.5 rounded-md font-black ${active ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'}`}>{badge}</span>}
  </div>
);

const StatCard = ({ title, amount, trend }) => (
  <div className="bg-[#080812] p-8 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 group shadow-xl">
    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 group-hover:text-indigo-400 transition-colors">{title}</p>
    <h2 className="text-5xl font-black text-white mb-6 tracking-tighter italic">{amount}</h2>
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
      <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest">{trend}</p>
    </div>
  </div>
);

const UserItem = ({ name, email, role }) => (
  <div className="flex items-center justify-between group p-4 hover:bg-white/[0.02] rounded-2xl transition-all border border-transparent hover:border-white/5">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-black text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
        {name?.charAt(0)}
      </div>
      <div className="flex flex-col">
        <p className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors">{name}</p>
        <p className="text-[11px] text-slate-600 truncate w-32 tracking-tight">{email}</p>
      </div>
    </div>
    <span className={`text-[8px] font-black px-2.5 py-1.5 rounded-lg uppercase tracking-[0.15em] transition-all ${role === 'admin' ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]' : 'bg-white/5 text-slate-500 border border-white/5'}`}>
      {role}
    </span>
  </div>
);

const chartData = [
  { name: 'P1', income: 400 }, { name: 'P2', income: 300 }, { name: 'P3', income: 500 },
  { name: 'P4', income: 278 }, { name: 'P5', income: 189 }, { name: 'P6', income: 600 },
  { name: 'P7', income: 450 }, { name: 'P8', income: 390 }, { name: 'P9', income: 520 },
];