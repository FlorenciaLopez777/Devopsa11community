import { useState } from 'react';
import { LoginForm } from './components/login-form';
import { SignUpForm } from './components/sign-up-form';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col md:items-center md:justify-center bg-white md:bg-gradient-to-br md:from-blue-50 md:to-indigo-100 md:p-4">
      <div className="flex-1 flex flex-col md:flex-initial md:w-full md:max-w-md">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 px-6 pt-12 pb-8 md:hidden">
          <h1 className="text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Get Started'}
          </h1>
          <p className="text-indigo-100">
            {isLogin
              ? 'Sign in to your account'
              : 'Create your account'}
          </p>
        </div>

        <div className="flex-1 bg-white rounded-t-3xl -mt-6 px-6 pt-8 pb-6 overflow-y-auto md:flex-initial md:mt-0 md:rounded-2xl md:shadow-xl md:p-8">
          <div className="hidden md:block text-center mb-8">
            <h1 className="text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600">
              {isLogin
                ? 'Sign in to continue to your account'
                : 'Sign up to get started'}
            </p>
          </div>

          {isLogin ? <LoginForm /> : <SignUpForm />}

          <div className="mt-8 text-center pb-6 md:mt-6 md:pb-0">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}