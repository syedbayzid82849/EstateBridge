'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, User, Building2, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Signup data:', data);
    // Handle signup logic here
  };

  const handleSocialLogin = (provider: string) => {
    // Implement social login logic here
    alert(`Login with ${provider}`);
    // Example: window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="min-h-screen md:mt-0 flex">
      <Link href="/" className="absolute top-4 right-4 z-50">
        <Button variant="outline" size="sm">
          Back to Home
        </Button>
      </Link>
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-700 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-16 text-center">
          <h2 className="text-6xl font-serif font-bold text-white mb-6 leading-tight animate-fade-in-up">
            Start Your Journey
          </h2>
          <p className="text-xl text-white/90 max-w-lg leading-relaxed animate-fade-in-up animation-delay-200">
            Create your free account and unlock access to premium property listings worldwide.
          </p>
        </div>

        {/* Floating Cards Animation */}
        <div className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 w-64 animate-float">
          <div className="flex items-center gap-3 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg"></div>
            <div>
              <div className="h-3 bg-white/30 rounded w-32 mb-2"></div>
              <div className="h-2 bg-white/20 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 bg-gradient-to-br from-neutral-50 to-stone-100">
        <div className="w-full max-w-md animate-fade-in">
          {/* Welcome Text */}
          <div className="mb-10">
            <h2 className="text-4xl font-serif font-bold text-neutral-900 mb-3">
              Create Account
            </h2>
            <p className="text-neutral-600 text-lg">
              Join EstateBridge to discover and manage properties effortlessly.
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-8">
            <Button
              type="button"
              variant="outline"
              className="w-full py-6 bg-white border-2 border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 rounded-xl font-semibold text-neutral-700 transition-all duration-200"
              onClick={() => handleSocialLogin('google')}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full py-6 bg-white border-2 border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 rounded-xl font-semibold text-neutral-700 transition-all duration-200"
              onClick={() => handleSocialLogin('github')}
            >
              <Github className="w-5 h-5 mr-3" />
              Continue with GitHub
            </Button>
          </div>
          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-br from-neutral-50 to-stone-100 text-neutral-500 font-medium">
                Or continue with email
              </span>
            </div>
          </div>
          {/* Signup Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-neutral-700"
              >
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-teal-600 transition-colors" />
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  {...register('fullName', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                  className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-xl text-neutral-900 placeholder:text-neutral-400 
                    focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500
                    transition-all duration-200 ${errors.fullName ? 'border-red-400' : 'border-neutral-200'
                    }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1 animate-fade-in">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700"
              >
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-teal-600 transition-colors" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-xl text-neutral-900 placeholder:text-neutral-400 
                    focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500
                    transition-all duration-200 ${errors.email ? 'border-red-400' : 'border-neutral-200'
                    }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1 animate-fade-in">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700"
              >
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-teal-600 transition-colors" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: 'Password must contain uppercase, lowercase, and number',
                    },
                  })}
                  className={`w-full pl-12 pr-12 py-3.5 bg-white border-2 rounded-xl text-neutral-900 placeholder:text-neutral-400 
                    focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500
                    transition-all duration-200 ${errors.password ? 'border-red-400' : 'border-neutral-200'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1 animate-fade-in">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl
                hover:from-teal-700 hover:to-teal-800 
                focus:outline-none focus:ring-4 focus:ring-teal-500/30
                disabled:opacity-50 disabled:cursor-not-allowed
                transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-4">
              <p className="text-neutral-600">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="text-teal-700 font-semibold hover:text-teal-800 transition-colors"
                >
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}