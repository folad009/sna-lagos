import {useState} from 'react'


const LoginView = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin({ id: '1', name: 'Adekunle Olusegun', email: 'ade@art.ng' });
      setLoading(false);
    }, 1500);
  };
  const handleForgotPassword = () => alert("Please contact support at support@snalagos.ng to reset your password.");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <div className="max-w-md w-full p-8 bg-white rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:shadow-emerald-900/10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 art-gradient rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg">S</div>
          <h2 className="text-3xl font-bold">Member Login</h2>
          <p className="text-gray-500 mt-2">Manage your profile and showcase your art.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-emerald-800 transition-colors">Member Email</label>
            <input type="email" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all duration-300 focus:scale-[1.02] shadow-sm" placeholder="e.g. artist@example.com"/>
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-emerald-800 transition-colors">Password</label>
            <input type="password" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all duration-300 focus:scale-[1.02] shadow-sm" placeholder="••••••••"/>
          </div>
          <div>
            <button type="submit" disabled={loading} className="w-full bg-emerald-800 text-white py-4 rounded-xl font-bold hover:bg-emerald-900 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-emerald-900/30 hover:scale-[1.02] active:scale-[0.98]">
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Sign In'}
            </button>
            <div className="mt-4 text-center">
              <button type="button" onClick={handleForgotPassword} className="text-xs font-bold text-emerald-800 hover:text-emerald-900 transition-colors underline underline-offset-4">Forgot Password?</button>
            </div>
          </div>
        </form>
        <div className="mt-8 text-center text-sm"><span className="text-gray-500">Not a member yet?</span><button className="ml-2 text-emerald-800 font-bold hover:underline transition-colors">Apply for Membership</button></div>
      </div>
    </div>
  );
};

export default LoginView