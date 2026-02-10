import { Mail, BarChart3, TrendingUp, Award  } from "lucide-react";


const DashboardView = ({ user, onEdit }: { user: any, onEdit: () => void }) => (
  <div className="pt-32 pb-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-emerald-800 rounded-[3rem] p-12 text-white mb-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-emerald-100 opacity-80 font-medium">Lagos Chapter Professional Member • Since 2018</p>
        </div>
        <button onClick={onEdit} className="relative z-10 bg-white text-emerald-800 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all duration-300 hover:scale-[1.05] shadow-lg active:scale-95">Edit Profile Information</button>
      </div>
      <div className="grid md:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-800 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"><TrendingUp size={28} /></div>
          <h3 className="text-4xl font-bold mb-1">15,742</h3>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Lifetime Profile Views</p>
          <div className="mt-4 flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-lg">Since joining in 2018</div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 bg-purple-50 text-purple-800 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"><BarChart3 size={28} /></div>
          <h3 className="text-4xl font-bold mb-1">124</h3>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Profile Views Today</p>
          <div className="mt-4 flex items-center text-xs font-bold text-purple-600 bg-purple-50 w-fit px-2 py-1 rounded-lg">↑ 5% from yesterday</div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 bg-blue-50 text-blue-800 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"><Mail size={28} /></div>
          <h3 className="text-4xl font-bold mb-1">12</h3>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Inquiries & Commissions</p>
          <div className="mt-4 flex items-center text-xs font-bold text-blue-600 bg-blue-50 w-fit px-2 py-1 rounded-lg">8 new messages</div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 bg-amber-50 text-amber-800 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"><Award size={28} /></div>
          <h3 className="text-4xl font-bold mb-1">3</h3>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Active Exhibitions</p>
          <div className="mt-4 flex items-center text-xs font-bold text-amber-600 bg-amber-50 w-fit px-2 py-1 rounded-lg">Nike Art Gallery + 2 more</div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardView