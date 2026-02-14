'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, Building2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type LoginFormData = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        console.log('Login data:', data);
    };

    return (
        <div className="min-h-screen flex">
            <Link href="/" className="absolute top-4 right-4 z-50">
                <Button variant="outline" size="sm">
                    Back to Home
                </Button>
            </Link>
            {/* Left Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 bg-gradient-to-br from-neutral-50 to-stone-100">
                <div className="w-full max-w-md animate-fade-in">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg">
                            <Building2 className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-neutral-900 tracking-tight">
                            EstateBridge
                        </h1>
                    </div>

                    {/* Welcome Text */}
                    <div className="mb-10">
                        <h2 className="text-4xl font-serif font-bold text-neutral-900 mb-3">
                            Welcome Back
                        </h2>
                        <p className="text-neutral-600 text-lg">
                            Sign in to manage your properties and saved listings.
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                            value: 6,
                                            message: 'Password must be at least 6 characters',
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
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        {/* Create Account Link */}
                        <div className="text-center pt-4">
                            <p className="text-neutral-600">
                                Don't have an account?{' '}
                                <a
                                    href="/register"
                                    className="text-teal-700 font-semibold hover:text-teal-800 transition-colors"
                                >
                                    Create Account
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Side - Hero Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-700 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center px-16 text-center">
                    <h2 className="text-6xl font-serif font-bold text-white mb-6 leading-tight animate-fade-in-up">
                        Find Your Dream Home
                    </h2>
                    <p className="text-xl text-teal-50 max-w-lg leading-relaxed animate-fade-in-up animation-delay-200">
                        Join thousands of homeowners who found their perfect property through
                        EstateBridge.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in-up animation-delay-400">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">50K+</div>
                            <div className="text-teal-100 text-sm">Properties</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">30K+</div>
                            <div className="text-teal-100 text-sm">Happy Clients</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">98%</div>
                            <div className="text-teal-100 text-sm">Satisfaction</div>
                        </div>
                    </div>
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
        </div>
    );
}