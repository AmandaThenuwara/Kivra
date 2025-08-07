import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(formData.email, formData.password, formData.firstName, formData.lastName);
      navigate('/');
    } catch (error) {
      setErrors({ general: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-black via-charcoal to-primary-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Geometric Shapes */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary-gold/20 to-burgundy/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-burgundy/20 to-primary-gold/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-gold-light/10 to-primary-gold/10 rounded-full blur-2xl animate-pulse-slow"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary-gold rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-burgundy rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-primary-gold rounded-full animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-gold to-transparent animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-burgundy to-transparent animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 group">
              <div className="relative">
                <span className="text-4xl font-bold bg-gradient-to-r from-primary-gold via-gold-light to-burgundy bg-clip-text text-transparent animate-shimmer">
                  KIVRA
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-gold to-burgundy group-hover:w-full transition-all duration-300"></div>
              </div>
            </Link>
          </div>
          
          <h2 className="text-3xl font-bold text-primary-white mb-2">
            Create Account
          </h2>
          <p className="text-gold-light">
            Join our luxury fashion community
          </p>
        </div>

        {/* Enhanced Registration Form */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 to-burgundy/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
          
          {/* Form Container */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 hover:border-primary-gold/30 rounded-2xl p-8 shadow-2xl transition-all duration-500 transform group-hover:scale-[1.02]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-burgundy/20 border border-burgundy/30 text-burgundy-light px-4 py-3 rounded-lg text-sm animate-fade-in">
                {errors.general}
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-primary-white mb-2">
                  First Name
                </label>
                <div className="relative group">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-primary-white placeholder-gold-light focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-all duration-300 transform group-hover:scale-[1.02] ${
                      errors.firstName ? 'border-burgundy-light' : 'border-white/20'
                    }`}
                    placeholder="First name"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-gold/0 to-burgundy/0 group-hover:from-primary-gold/5 group-hover:to-burgundy/5 transition-all duration-300 pointer-events-none"></div>
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-burgundy-light animate-fade-in">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-primary-white mb-2">
                  Last Name
                </label>
                <div className="relative group">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-primary-white placeholder-gold-light focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-all duration-300 transform group-hover:scale-[1.02] ${
                      errors.lastName ? 'border-burgundy-light' : 'border-white/20'
                    }`}
                    placeholder="Last name"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-gold/0 to-burgundy/0 group-hover:from-primary-gold/5 group-hover:to-burgundy/5 transition-all duration-300 pointer-events-none"></div>
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-burgundy-light animate-fade-in">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-primary-white placeholder-gold-light focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-all duration-300 ${
                    errors.email ? 'border-burgundy-light' : 'border-white/20'
                  }`}
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gold-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-burgundy-light animate-fade-in">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 bg-white/10 border rounded-lg text-primary-white placeholder-gold-light focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-all duration-300 ${
                    errors.password ? 'border-burgundy-light' : 'border-white/20'
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gold-light hover:text-primary-white transition-colors duration-200"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-burgundy-light animate-fade-in">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 bg-white/10 border rounded-lg text-primary-white placeholder-gold-light focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-all duration-300 ${
                    errors.confirmPassword ? 'border-burgundy-light' : 'border-white/20'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gold-light hover:text-primary-white transition-colors duration-200"
                >
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-burgundy-light animate-fade-in">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-gold focus:ring-primary-gold border-white/20 rounded bg-white/10 mt-1"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gold-light">
                I agree to the{' '}
                <a href="#" className="text-primary-gold hover:text-gold-light transition-colors duration-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-gold hover:text-gold-light transition-colors duration-300">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Enhanced Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-semibold rounded-xl text-primary-black bg-gradient-to-r from-primary-gold via-gold-light to-gold-dark hover:from-gold-dark hover:via-primary-gold hover:to-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-gold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-primary-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {isLoading ? (
                  <div className="relative z-10 flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-black border-t-transparent"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <span className="relative z-10 flex items-center space-x-3">
                    <span>Create Account</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gold-light">Or continue with</span>
              </div>
            </div>

            {/* Enhanced Social Registration Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="group relative w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-lg bg-white/10 text-sm font-medium text-primary-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-gold transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/0 to-burgundy/0 group-hover:from-primary-gold/10 group-hover:to-burgundy/10 transition-all duration-300"></div>
                <svg className="relative z-10 w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="relative z-10 ml-2 transform group-hover:translate-x-1 transition-transform duration-300">Google</span>
              </button>
              <button
                type="button"
                className="group relative w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-lg bg-white/10 text-sm font-medium text-primary-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-gold transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/0 to-burgundy/0 group-hover:from-primary-gold/10 group-hover:to-burgundy/10 transition-all duration-300"></div>
                <svg className="relative z-10 w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                <span className="relative z-10 ml-2 transform group-hover:translate-x-1 transition-transform duration-300">Twitter</span>
              </button>
            </div>
          </form>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-gold-light">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-gold hover:text-gold-light transition-colors duration-300 group"
            >
              <span className="relative">
                Sign in
                <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-gold group-hover:w-full transition-all duration-300"></div>
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;