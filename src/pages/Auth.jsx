// src/pages/AuthForm.jsx

import React, { useState } from 'react';

// İkonlar doğru, onlara dokunmuyoruz.
const GoogleIcon = (props) => ( <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 488 512" {...props}><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-69.5 69.5c-24.3-23.4-58.2-37.3-95.4-37.3-84.3 0-152.3 68.1-152.3 152.4s68 152.4 152.3 152.4c97.9 0 130.4-78.4 134.8-113.3H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>);
const FacebookIcon = (props) => ( <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" {...props}><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>);
const TwitterIcon = (props) => ( <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" {...props}><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.214 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>);


// DÜZELTME: Sosyal medya ikonlarını tekrar kullanılabilir bir bileşen yapalım
const SocialLoginSection = () => (
    <div className="mt-6">
        <div className="flex items-center gap-4">
            <hr className="w-full border-slate-700" />
            <span className="text-slate-500 text-xs shrink-0">OR</span>
            <hr className="w-full border-slate-700" />
        </div>
        <div className="flex justify-center gap-4 mt-4">
            <button className="p-3 bg-slate-800/60 border border-slate-700 rounded-full hover:bg-slate-700 transition-colors"><FacebookIcon className="w-5 h-5 text-white"/></button>
            <button className="p-3 bg-slate-800/60 border border-slate-700 rounded-full hover:bg-slate-700 transition-colors"><TwitterIcon className="w-5 h-5 text-white"/></button>
            <button className="p-3 bg-slate-800/60 border border-slate-700 rounded-full hover:bg-slate-700 transition-colors"><GoogleIcon className="w-5 h-5 text-white"/></button>
        </div>
    </div>
);


const AuthForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const inputClasses = "w-full px-4 py-3 bg-slate-800/60 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-400";
  const buttonClasses = "w-full py-3 font-bold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-opacity duration-300";
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4 [perspective:1000px]">
      
      {/* Kartın ana dönme kapsayıcısı */}
      <div className={`relative w-full max-w-md transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        
        {/* ÖN YÜZ (LOGIN) */}
        <div className="absolute w-full p-8 space-y-6 bg-slate-800/40 rounded-3xl shadow-2xl border border-slate-700 text-white [backface-visibility:hidden]">
          <div className="text-center"><h1 className="text-3xl font-bold">Welcome Back</h1><p className="text-slate-400 mt-2">Please login to your account</p></div>
          <form className="space-y-4">
            <div><label className="block mb-2 text-sm font-medium text-slate-300">Email</label><input type="email" placeholder="Enter your email" className={inputClasses}/></div>
            <div><label className="block mb-2 text-sm font-medium text-slate-300">Password</label><input type="password" placeholder="Enter your password" className={inputClasses}/></div>
            <div className="flex items-center justify-between text-sm"><label className="flex items-center gap-2 text-slate-300"><input type="checkbox" className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500" />Remember me</label><a href="#" className="font-medium text-purple-400 hover:underline">Forgot password?</a></div>
            <button type="submit" className={buttonClasses}>Login</button>
          </form>
          <p className="text-center text-sm text-slate-400">Don't have an account?{' '}<button onClick={() => setIsFlipped(true)} className="font-medium text-purple-400 hover:underline">Sign up</button></p>
          {/* DÜZELTME: Sosyal medya bölümü ARTIK BURADA */}
          <SocialLoginSection />
        </div>
        
        {/* ARKA YÜZ (SIGN UP) */}
        <div className="w-full p-8 space-y-6 bg-slate-800/40 rounded-3xl shadow-2xl border border-slate-700 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="text-center"><h1 className="text-3xl font-bold">Create Account</h1><p className="text-slate-400 mt-2">Sign up to get started</p></div>
            <form className="space-y-4">
                <div><label className="block mb-2 text-sm font-medium text-slate-300">Full Name</label><input type="text" placeholder="Enter your name" className={inputClasses}/></div>
                <div><label className="block mb-2 text-sm font-medium text-slate-300">Email</label><input type="email" placeholder="Enter your email" className={inputClasses}/></div>
                <div><label className="block mb-2 text-sm font-medium text-slate-300">Password</label><input type="password" placeholder="Create a password" className={inputClasses}/></div>
                <div className="flex items-start text-sm"><input type="checkbox" id="terms" className="w-4 h-4 mt-1 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500" /><label htmlFor="terms" className="ml-3 text-slate-400">I agree to the <a href="#" className="text-purple-400 hover:underline">Terms of Service</a> and <a href="#" className="text-purple-400 hover:underline">Privacy Policy</a></label></div>
                <button type="submit" className={buttonClasses}>Create Account</button>
            </form>
            <p className="text-center text-sm text-slate-400">Already have an account?{' '}<button onClick={() => setIsFlipped(false)} className="font-medium text-purple-400 hover:underline">Login</button></p>
            {/* DÜZELTME: Sosyal medya bölümü ARTIK BURADA */}
            <SocialLoginSection />
        </div>

      </div>
    </div>
  );
};

export default AuthForm;