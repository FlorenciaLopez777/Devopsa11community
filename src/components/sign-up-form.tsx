import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Sign up submitted:', { name, email, password });
      // Handle sign up logic here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-gray-700 mb-2">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-4 md:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full pl-12 md:pl-10 pr-4 py-4 md:py-3 border rounded-xl md:rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-base ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
          />
        </div>
        {errors.name && (
          <p className="mt-2 md:mt-1 text-red-500 text-sm">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="signup-email" className="block text-gray-700 mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 md:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full pl-12 md:pl-10 pr-4 py-4 md:py-3 border rounded-xl md:rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-base ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="you@example.com"
          />
        </div>
        {errors.email && (
          <p className="mt-2 md:mt-1 text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="signup-password" className="block text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 md:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full pl-12 md:pl-10 pr-14 md:pr-12 py-4 md:py-3 border rounded-xl md:rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-base ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Create a password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 md:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-2 md:mt-1 text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirm-password" className="block text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 md:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full pl-12 md:pl-10 pr-14 md:pr-12 py-4 md:py-3 border rounded-xl md:rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-base ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 md:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-2 md:mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="flex items-start pt-2">
        <input
          type="checkbox"
          id="terms"
          className="w-5 h-5 md:w-4 md:h-4 mt-0.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="terms" className="ml-3 md:ml-2 text-gray-700">
          I agree to the{' '}
          <button type="button" className="text-indigo-600">
            Terms of Service
          </button>{' '}
          and{' '}
          <button type="button" className="text-indigo-600">
            Privacy Policy
          </button>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 md:py-3 rounded-xl md:rounded-lg transition-colors shadow-lg shadow-indigo-600/30"
      >
        Create Account
      </button>

      <div className="relative my-8 md:my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl md:rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
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
        </button>
        <button
          type="button"
          className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl md:rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
        </button>
      </div>
    </form>
  );
}