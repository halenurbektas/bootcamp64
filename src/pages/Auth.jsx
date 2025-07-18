import React, { useState } from 'react';
import { auth, db } from '../firebase-config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// İkonlar
const GoogleIcon = (props) => ( <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 488 512" {...props}><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-69.5 69.5c-24.3-23.4-58.2-37.3-95.4-37.3-84.3 0-152.3 68.1-152.3 152.4s68 152.4 152.3 152.4c97.9 0 130.4-78.4 134.8-113.3H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>);

const SocialLoginSection = () => (
  <div className="mt-6">
    <div className="flex items-center gap-4">
      <hr className="w-full border-slate-700" />
      <span className="text-slate-500 text-xs shrink-0">OR</span>
      <hr className="w-full border-slate-700" />
    </div>
    <div className="flex justify-center gap-4 mt-4">
      <button className="p-3 bg-slate-800/60 border border-slate-700 rounded-full hover:bg-slate-700 transition-colors"><GoogleIcon className="w-5 h-5 text-white"/></button>
    </div>
  </div>
);

const Auth = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const inputClasses = "w-full px-4 py-3 bg-slate-800/60 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-400";
  const buttonClasses = "w-full py-3 font-bold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-opacity duration-300";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      alert('Giriş başarılı');
    } catch (err) {
      alert('Giriş hatası: ' + err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: registerName,
        email: registerEmail,
        point: 0,
        authLevel: "user",
        joinedAt: serverTimestamp(),
      });

      alert('Kayıt başarılı, şimdi giriş yapabilirsiniz.');
      setIsFlipped(false);
    } catch (err) {
      alert('Kayıt hatası: ' + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4 [perspective:1000px]">
      <div className={`relative w-full max-w-md transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        
        {/* LOGIN */}
        <div className="absolute w-full p-8 space-y-6 bg-slate-800/40 rounded-3xl shadow-2xl border border-slate-700 text-white [backface-visibility:hidden]">
          <div className="text-center"><h1 className="text-3xl font-bold">Welcome Back</h1><p className="text-slate-400 mt-2">Please login to your account</p></div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div><label className="block mb-2 text-sm font-medium text-slate-300">Email</label><input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className={inputClasses} /></div>
            <div><label className="block mb-2 text-sm font-medium text-slate-300">Password</label><input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className={inputClasses} /></div>
            <button type="submit" className={buttonClasses}>Login</button>
          </form>
          <p className="text-center text-sm text-slate-400">Don't have an account? <button type="button" onClick={() => setIsFlipped(true)} className="font-medium text-purple-400 hover:underline">Sign up</button></p>
          <SocialLoginSection />
        </div>

        {/* REGISTER */}
        <div className="w-full p-8 space-y-6 bg-slate-800/40 rounded-3xl shadow-2xl border border-slate-700 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="text-center"><h1 className="text-3xl font-bold">Create Account</h1><p className="text-slate-400 mt-2">Sign up to get started</p></div>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div><label className="block mb-2 text-sm font-medium text-slate-300">Full Name</label><input type="text" value={registerName} onChange={(e) => setRegisterName(e.target.value)} className={inputClasses} /></div>
            <div><label className="block mb-2 text-sm font-medium text-slate-300">Email</label><input type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} className={inputClasses} /></div>
            <div><label className="block mb-2 text-sm font-medium text-slate-300">Password</label><input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} className={inputClasses} /></div>
            <button type="submit" className={buttonClasses}>Create Account</button>
          </form>
          <p className="text-center text-sm text-slate-400">Already have an account? <button type="button" onClick={() => setIsFlipped(false)} className="font-medium text-purple-400 hover:underline">Login</button></p>
          <SocialLoginSection />
        </div>

      </div>
    </div>
  );
};

export default Auth;
