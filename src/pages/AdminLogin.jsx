import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem('adminEmail') || 'admin@tawakkal.com';
    const storedPassword = localStorage.getItem('adminPassword') || 'admin123';

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin-panel');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(37,99,235,0.1)] border border-blue-50">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-blue-600/5 rounded-3xl flex items-center justify-center mb-8 border border-blue-100">
            <Lock className="text-blue-600" size={36} strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Welcome back.</h2>
          <p className="mt-3 text-gray-400 text-sm font-medium tracking-wide uppercase">Admin Portal Control</p>
        </div>
        
        <form className="mt-10 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-xs py-4 px-4 rounded-2xl text-center font-bold">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="text-gray-300 group-focus-within:text-blue-600 transition-colors" size={20} strokeWidth={1.5} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all"
                placeholder="Email Address"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="text-gray-300 group-focus-within:text-blue-600 transition-colors" size={20} strokeWidth={1.5} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} strokeWidth={1.5} /> : <Eye size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
          >
            Login to Dashboard
            <ArrowRight size={20} strokeWidth={2} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
