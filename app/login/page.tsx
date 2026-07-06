"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

type AuthMode = "signup" | "login" | "forgot" | "verify" | "reset";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  // Check query parameters to set initial mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get("mode");
      if (modeParam === "signup") {
        setMode("signup");
      }
    }
  }, []);

  const heights: Record<AuthMode, string> = {
    signup: "lg:h-[789px]",
    login: "lg:h-[606px]",
    forgot: "lg:h-[336px]",
    verify: "lg:h-[386px]",
    reset: "lg:h-[416px]",
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input if value is entered
    if (element.value !== "" && element.nextElementSibling) {
      (element.nextElementSibling as HTMLInputElement).focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && e.currentTarget.previousElementSibling) {
        (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate simulation
    if (mode === "login") {
      window.location.href = "/dashboard";
    } else if (mode === "signup") {
      setMode("verify");
    } else if (mode === "forgot") {
      setMode("verify");
    } else if (mode === "verify") {
      setMode("reset");
    } else if (mode === "reset") {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F3FF] flex flex-col justify-between overflow-x-hidden font-sans relative">
      
      {/* Floating decorative celebration shapes in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[8%] size-3 rounded-full bg-purple-300 opacity-60 animate-pulse" />
        <div className="absolute top-[15%] right-[15%] size-4 rounded-full bg-pink-300 opacity-50" />
        <div className="absolute bottom-[40%] left-[10%] size-5 rounded-full bg-pink-200 opacity-40" />
        <div className="absolute bottom-[25%] right-[20%] size-3.5 rounded-full bg-purple-200 opacity-50 animate-pulse" />
        
        {/* Diamonds */}
        <div className="absolute top-[35%] right-[8%] size-4 bg-teal-300 rotate-45 opacity-40" />
        <div className="absolute bottom-[50%] right-[12%] size-3.5 bg-pink-300 rotate-45 opacity-30" />
        <div className="absolute bottom-[30%] left-[6%] size-4.5 bg-amber-300 rotate-45 opacity-40" />
        <div className="absolute top-[48%] left-[12%] size-3 bg-amber-400 rotate-45 opacity-30" />
      </div>

      {/* Top Navigation Row */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[50px] h-20 md:h-[124px] flex items-center justify-between relative z-10 shrink-0">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <img 
            src="/images/logo.png" 
            alt="WishPool Logo" 
            className="w-auto h-14 md:h-18 object-contain" 
          />
        </Link>
        <Link href="/">
          <Button variant="outline" className="border-purple-200 text-zinc-700 bg-white hover:bg-purple-50 rounded-full px-5 h-[44px] text-sm font-semibold shadow-xs flex items-center gap-2 transition-all">
            <span>←</span> Back to home
          </Button>
        </Link>
      </div>

      {/* Form Content Wrapper */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div 
          className={`w-full max-w-[528px] bg-white rounded-lg shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] border-t-[1.5px] border-t-[#EC003F] p-8 md:p-10 flex flex-col justify-center transition-all duration-300 ${heights[mode]}`}
        >
          <div className="w-full flex flex-col gap-5">
            
            {/* RENDER VIEW: SIGN UP (CREATE ACCOUNT) */}
            {mode === "signup" && (
              <>
                <div className="text-center flex flex-col gap-1.5 mb-2">
                  <h1 className="text-3xl md:text-[32px] font-extrabold tracking-tight text-zinc-900">
                    Create your account
                  </h1>
                  <p className="text-sm text-zinc-500 font-light">
                    Start celebrating for free — no credit card needed
                  </p>
                </div>

                <div className="flex flex-col gap-4 text-left">
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label className="text-xs font-extrabold text-zinc-800 mb-1.5">
                      Full Name<span className="text-[#EC003F] ml-0.5">*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Emma Watson" 
                      className="bg-[#F9F6FF] border border-purple-100/80 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[46px] px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none w-full transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-xs font-extrabold text-zinc-800 mb-1.5">
                      Email Address<span className="text-[#EC003F] ml-0.5">*</span>
                    </label>
                    <input 
                      type="email" 
                      required 
                      placeholder="emma@example.com" 
                      className="bg-[#F9F6FF] border border-purple-100/80 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[46px] px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none w-full transition-all"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col">
                    <label className="text-xs font-extrabold text-zinc-800 mb-1.5">
                      Password<span className="text-[#EC003F] ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required 
                        placeholder="At least 8 characters" 
                        className="bg-[#F9F6FF] border border-purple-100/80 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[46px] pl-4 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none w-full transition-all"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col">
                    <label className="text-xs font-extrabold text-zinc-800 mb-1.5">
                      Confirm Password<span className="text-[#EC003F] ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        required 
                        placeholder="At least 8 characters" 
                        className="bg-[#F9F6FF] border border-purple-100/80 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[46px] pl-4 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none w-full transition-all"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-2.5 mt-1 select-none">
                    <input 
                      type="checkbox" 
                      required 
                      id="terms-checkbox"
                      className="mt-0.5 accent-[#7C3AED] size-4 border-purple-200 rounded cursor-pointer"
                    />
                    <label htmlFor="terms-checkbox" className="text-xs text-zinc-500 font-light leading-snug cursor-pointer">
                      I agree to Celebr's <Link href="/terms" className="text-[#7C3AED] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#7C3AED] hover:underline">Privacy Policy</Link>
                    </label>
                  </div>
                </div>

                <Button onClick={handleSubmit} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-base h-[46px] rounded-lg shadow-sm transition-all mt-1">
                  Create account
                </Button>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-1">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100" /></div>
                  <span className="relative px-3 bg-white text-[11px] text-zinc-400 font-light tracking-wide uppercase">or sign up with email</span>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3.5">
                  <button type="button" className="flex items-center justify-center border border-zinc-200 bg-white hover:bg-zinc-50 rounded-lg h-[46px] text-sm text-zinc-700 font-semibold transition-all">
                    <svg className="size-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </button>
                  <button type="button" className="flex items-center justify-center border border-zinc-200 bg-white hover:bg-zinc-50 rounded-lg h-[46px] text-sm text-zinc-700 font-semibold transition-all">
                    <svg className="size-5 mr-2 fill-zinc-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.05 20.28c-.98.95-2.05 1.88-3.08 1.88-1.03 0-1.36-.62-2.54-.62-1.19 0-1.55.62-2.54.62-1.03 0-2.17-1-3.15-1.92-2-1.9-3.51-5.36-3.51-8.59 0-5.12 3.33-7.83 6.61-7.83 1.03 0 2 .64 2.64.64.63 0 1.64-.67 2.88-.67 1.28 0 2.45.47 3.23 1.26-3.23 1.94-2.7 6.45.54 7.77-1.18 2.85-2.63 5.75-4.07 7.46zM12.03 5c.57-2.3 2.5-4.08 4.67-4.1 0 2.3-2.48 4.28-4.67 4.1z" />
                    </svg>
                    Apple
                  </button>
                </div>

                <div className="text-center text-xs mt-1 text-zinc-500 font-light">
                  Already have an account? <button type="button" onClick={() => setMode("login")} className="text-[#7C3AED] font-bold hover:underline">Sign in</button>
                </div>
              </>
            )}

            {/* RENDER VIEW: LOGIN (SIGN IN) */}
            {mode === "login" && (
              <>
                <div className="text-center flex flex-col gap-1.5 mb-2">
                  <h1 className="text-3xl md:text-[32px] font-extrabold tracking-tight text-zinc-900">
                    Welcome back
                  </h1>
                  <p className="text-sm text-zinc-500 font-light">
                    Sign in to your Celebr account
                  </p>
                </div>

                <div className="flex flex-col gap-4 text-left">
                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-xs font-extrabold text-zinc-800 mb-1.5">
                      Email Address<span className="text-[#EC003F] ml-0.5">*</span>
                    </label>
                    <input 
                      type="email" 
                      required 
                      placeholder="emma@example.com" 
                      className="bg-[#F9F6FF] border border-purple-100/80 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[46px] px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none w-full transition-all"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-extrabold text-zinc-800">
                        Password<span className="text-[#EC003F] ml-0.5">*</span>
                      </label>
                      <button 
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-xs text-[#7C3AED] font-bold hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required 
                        placeholder="At least 8 characters" 
                        className="bg-[#F9F6FF] border border-purple-100/80 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[46px] pl-4 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none w-full transition-all"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me */}
                  <div className="flex items-center gap-2.5 mt-1 select-none">
                    <input 
                      type="checkbox" 
                      id="remember-checkbox"
                      className="accent-[#7C3AED] size-4 border-purple-200 rounded cursor-pointer"
                    />
                    <label htmlFor="remember-checkbox" className="text-xs text-zinc-500 font-light cursor-pointer">
                      Remember me
                    </label>
                  </div>
                </div>

                <Button onClick={handleSubmit} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-base h-[46px] rounded-lg shadow-sm transition-all mt-1">
                  Sign In
                </Button>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-1">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100" /></div>
                  <span className="relative px-3 bg-white text-[11px] text-zinc-400 font-light tracking-wide uppercase">or sign in with email</span>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3.5">
                  <button type="button" className="flex items-center justify-center border border-zinc-200 bg-white hover:bg-zinc-50 rounded-lg h-[46px] text-sm text-zinc-700 font-semibold transition-all">
                    <svg className="size-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </button>
                  <button type="button" className="flex items-center justify-center border border-zinc-200 bg-white hover:bg-zinc-50 rounded-lg h-[46px] text-sm text-zinc-700 font-semibold transition-all">
                    <svg className="size-5 mr-2 fill-zinc-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.05 20.28c-.98.95-2.05 1.88-3.08 1.88-1.03 0-1.36-.62-2.54-.62-1.19 0-1.55.62-2.54.62-1.03 0-2.17-1-3.15-1.92-2-1.9-3.51-5.36-3.51-8.59 0-5.12 3.33-7.83 6.61-7.83 1.03 0 2 .64 2.64.64.63 0 1.64-.67 2.88-.67 1.28 0 2.45.47 3.23 1.26-3.23 1.94-2.7 6.45.54 7.77-1.18 2.85-2.63 5.75-4.07 7.46zM12.03 5c.57-2.3 2.5-4.08 4.67-4.1 0 2.3-2.48 4.28-4.67 4.1z" />
                    </svg>
                    Apple
                  </button>
                </div>

                <div className="text-center text-xs mt-1 text-zinc-500 font-light">
                  Don't have an account? <button type="button" onClick={() => setMode("signup")} className="text-[#7C3AED] font-bold hover:underline">Create one free</button>
                </div>
              </>
            )}

            {/* RENDER VIEW: FORGOT PASSWORD */}
            {mode === "forgot" && (
              <>
                <div className="text-center flex flex-col gap-1.5">
                  <h1 className="text-2xl md:text-[28px] font-extrabold tracking-tight text-zinc-900">
                    Forgot your password?
                  </h1>
                  <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed max-w-sm mx-auto">
                    No worries — enter your email and we'll send you OTP code for verification.
                  </p>
                </div>

                <div className="flex flex-col gap-4 text-left">
                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-xs font-extrabold text-zinc-800 mb-1.5">
                      Email Address<span className="text-[#EC003F] ml-0.5">*</span>
                    </label>
                    <input 
                      type="email" 
                      required 
                      placeholder="emma@example.com" 
                      className="bg-[#F9F6FF] border border-purple-100/80 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[46px] px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none w-full transition-all"
                    />
                  </div>
                </div>

                <Button onClick={handleSubmit} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-base h-[46px] rounded-lg shadow-sm transition-all mt-1">
                  Send OTP
                </Button>
              </>
            )}

            {/* RENDER VIEW: VERIFY EMAIL (OTP INPUTS) */}
            {mode === "verify" && (
              <>
                <div className="text-center flex flex-col gap-1.5">
                  <h1 className="text-2xl md:text-[28px] font-extrabold tracking-tight text-zinc-900">
                    Verify your email
                  </h1>
                  <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed max-w-sm mx-auto">
                    We sent a 6-digit code to emma@example.com
                  </p>
                </div>

                <div className="flex flex-col gap-6 items-center">
                  {/* OTP Digit Inputs */}
                  <div className="flex gap-2 justify-center w-full max-w-[360px]">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        type="text"
                        name="otp-digit"
                        maxLength={1}
                        value={data}
                        onChange={(e) => handleOtpChange(e.target, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        onFocus={(e) => e.target.select()}
                        className="w-10 h-12 md:w-11 md:h-13 bg-[#F9F6FF] border border-purple-100/80 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg text-center text-lg font-bold text-zinc-900 outline-none transition-all shadow-2xs"
                      />
                    ))}
                  </div>

                  <Button onClick={handleSubmit} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-base h-[46px] rounded-lg shadow-sm transition-all mt-1">
                    Verify email
                  </Button>
                </div>

                <div className="text-center flex flex-col gap-2.5 mt-1 select-none">
                  <p className="text-xs text-zinc-500 font-light">
                    Didn't receive a code? <button type="button" className="text-[#7C3AED] font-bold hover:underline">Resend code</button>
                  </p>
                  <button type="button" onClick={() => setMode("login")} className="text-xs text-zinc-500 font-medium hover:text-[#7C3AED] transition-colors flex items-center justify-center gap-1">
                    ← Back to sign in
                  </button>
                </div>
              </>
            )}

            {/* RENDER VIEW: SET NEW PASSWORD */}
            {mode === "reset" && (
              <>
                <div className="text-center flex flex-col gap-1.5">
                  <h1 className="text-2xl md:text-[28px] font-extrabold tracking-tight text-zinc-900">
                    Set new password
                  </h1>
                  <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed max-w-sm mx-auto">
                    Create a strong password for your Celebr account
                  </p>
                </div>

                <div className="flex flex-col gap-4 text-left">
                  {/* New Password */}
                  <div className="flex flex-col">
                    <label className="text-xs font-extrabold text-zinc-800 mb-1.5">
                      New Password<span className="text-[#EC003F] ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required 
                        placeholder="At least 8 characters" 
                        className="bg-[#F9F6FF] border border-purple-100/80 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[46px] pl-4 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none w-full transition-all"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col">
                    <label className="text-xs font-extrabold text-zinc-800 mb-1.5">
                      Confirm New Password<span className="text-[#EC003F] ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        required 
                        placeholder="At least 8 characters" 
                        className="bg-[#F9F6FF] border border-purple-100/80 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg h-[46px] pl-4 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none w-full transition-all"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSubmit} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-base h-[46px] rounded-lg shadow-sm transition-all mt-1">
                  Reset Password
                </Button>
              </>
            )}

          </div>
        </div>
      </div>

      {/* Footer component at bottom with CTA hidden */}
      <Footer hideCTA={true} />

    </div>
  );
}
