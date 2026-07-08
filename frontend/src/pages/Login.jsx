import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  Sparkles,
  Shield,
  Zap,
  Users,
  Ticket,
  BarChart3,
  MessageSquare,
  Star
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const url = `${import.meta.env.VITE_API_URL}/auth/google`;
    window.location.href = url;
  };

  const features = [
    { icon: Zap, title: 'Real-time Updates', desc: 'Instant notifications on ticket changes' },
    { icon: Shield, title: 'Smart Escalation', desc: 'Automatic routing based on priority' },
    { icon: Users, title: 'Team Collaboration', desc: 'Work seamlessly with your team' },
    { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track performance metrics' },
    { icon: MessageSquare, title: 'Live Chat', desc: 'Real-time customer communication' },
    { icon: Star, title: 'Customer Satisfaction', desc: 'Measure and improve CSAT scores' },
  ];

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      {/* Left Side - Fixed Full Height */}
      <div className="hidden lg:flex lg:w-1/2 h-full overflow-hidden p-12 flex-col justify-between bg-black relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-purple-950/20 to-black"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"></div>
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Ticket size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">IntelliAssist</h1>
              <p className="text-sm text-gray-400">Enterprise Support Platform</p>
            </div>
          </div>
          
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Welcome Back</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Streamline Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Support Workflow</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              Everything you need to manage, track, and resolve customer tickets efficiently.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-2 gap-4">
            {features.slice(0, 4).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group p-4 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800/60 hover:border-blue-500/40 transition-all hover:bg-gray-900/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-sm">
          <span className="text-gray-600">© 2025 IntelliAssist. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">v3.0</span>
            <span className="w-1 h-1 rounded-full bg-blue-500/50"></span>
            <span className="text-gray-600">⚡ 99.9% Uptime</span>
          </div>
        </div>
      </div>

      {/* Right Side - Scrollable Container */}
      <div className="w-full lg:w-1/2 h-full overflow-y-auto bg-black">
        <div className="flex items-center justify-center min-h-full p-6 md:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden mb-8 text-center">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Ticket size={20} className="text-white" />
                </div>
                <h1 className="text-xl font-bold text-white">IntelliAssist</h1>
              </div>
              <p className="text-gray-400 text-sm">Sign in to your account</p>
            </div>

            <div className="mb-8 hidden lg:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Sign In</span>
              </div>
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="text-gray-400 mt-1.5">Sign in to access your dashboard</p>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3.5 px-4 bg-gray-900/50 border-2 border-gray-700/50 rounded-xl text-white font-medium hover:border-blue-500/50 hover:bg-gray-900/70 transition-all flex items-center justify-center gap-3 mb-6 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800/60"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-gray-500">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    required
                    placeholder="you@example.com"
                    className={`w-full pl-11 pr-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-gray-500 transition-all focus:outline-none ${
                      focused === 'email'
                        ? 'border-blue-500/60 ring-4 ring-blue-500/10'
                        : 'border-gray-700/50 hover:border-gray-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    required
                    placeholder="Enter your password"
                    className={`w-full pl-11 pr-12 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-gray-500 transition-all focus:outline-none ${
                      focused === 'password'
                        ? 'border-blue-500/60 ring-4 ring-blue-500/10'
                        : 'border-gray-700/50 hover:border-gray-600'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-base font-semibold transition-all hover:shadow-xl hover:shadow-blue-600/20 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-400 font-medium hover:text-blue-300 transition-colors hover:underline">
                  Create account
                </Link>
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <Shield size={14} className="text-gray-600" />
                <span>256-bit SSL</span>
              </div>
              <div className="w-px h-4 bg-gray-800"></div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <CheckCircle2 size={14} className="text-gray-600" />
                <span>GDPR Compliant</span>
              </div>
              <div className="w-px h-4 bg-gray-800"></div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <Sparkles size={14} className="text-gray-600" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;