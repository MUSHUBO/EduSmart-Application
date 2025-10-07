"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import profile from "../../../../../public/lotttie-file/profile.json"
import Lottie from 'lottie-react';
import Link from 'next/link';
import { useAuth } from '@/Hooks/UseAuth/UseAuth';
import { Bounce, toast } from 'react-toastify';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import GitHubButton from '../../components/GitHubButton/GitHubButton';
import { checkLoginAttempt, recordFailedAttempt, resetAttempts } from '@/utils/loginLimiter';
import axios from 'axios';
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
</svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
</svg>;
const EyeOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
</svg>;


const LoginFormNey = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { loginAccount } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";
    const [attemptInfo, setAttemptInfo] = useState({ locked: false, remaining: 0 });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, e) => {
        e.preventDefault()
        const { password, email } = data
        const attempt = checkLoginAttempt(email);
        setAttemptInfo(attempt);
        if (attempt.locked) {
            toast.error(`Account locked. Try again after ${attempt.remaining} seconds`, {
                position: "top-right",
                autoClose: 2000,
                theme: "colored",
            });
            return;
        }
        loginAccount(email, password)
            .then(async () => {
                resetAttempts(email);
                setAttemptInfo({ locked: false, remaining: 0 });

                const userInfo = {
                    email: email,
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString()
                }

                try {
                    const res = await axios.post("/api/users", userInfo);
                    setMessage(res.data.message);
                    console.log("Signup Success:", res.data);
                    toast.success('Login Successfully', {
                        position: "top-right",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce
                    });
                    router.push(redirect);
                    reset()
                } catch (error) {
                    console.error("Login Error:", error.response?.data || error.message);
                    setMessage(error.response?.data?.message || "Something went wrong!");
                }

            })
            .catch((error) => {
                recordFailedAttempt(email);
                const updated = checkLoginAttempt(email);
                setAttemptInfo(updated);
                toast.error(`${error.code}`, {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce
                });
            })
    }

    return <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
            { }
            <div className="signin-card bg-muted dark:bg-muted border-2 border-primary/45 dark:border-primary/45 rounded-lg shadow-sm p-6">
                { }
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 dark:bg-primary/20 rounded-full mb-4">

                        <Lottie animationData={profile} loop={true} />
                    </div>
                    <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Welcome back
                    </h1>
                    {attemptInfo.locked && (
                        <h1 className="text-base font-medium text-red-600 mb-2">
                            Account locked. Try again after {attemptInfo.remaining} seconds
                        </h1>
                    )}

                </div>


                { }
                <div className="grid grid-cols-2 gap-4">
                    <GoogleButton></GoogleButton>
                    <GitHubButton></GitHubButton>

                </div>

                { }

                { }
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-black px-2 text-gray-500 dark:text-gray-400">
                            Or continue with
                        </span>
                    </div>
                </div>

                { }

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    { }
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Email
                        </label>
                        <div className='relative'>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                                <MailIcon />
                            </div>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="name@example.com"
                                className="signin-input w-full pl-9 pr-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md text-sm text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        {errors.email && (
                            <p className="text-red-500 text-xs">
                                {String(errors.email.message)}
                            </p>
                        )}
                    </div>

                    { }
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message:
                                            "Password must include uppercase, lowercase, number & special character",
                                    },
                                })}
                                placeholder="Enter your password"
                                className="signin-input w-full pl-3 pr-10 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md text-sm text-gray-900 dark:text-gray-100"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3  flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs">
                                {String(errors.password.message)}
                            </p>
                        )}
                    </div>
                    { }
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900" />
                            <label htmlFor="remember-me" className="ml-2 min-w-[190px] block text-sm text-gray-700 dark:text-gray-300">
                                Keep me signed in
                            </label>
                        </div>
                        <Link href="/reset" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
                            Reset password
                        </Link>
                    </div>

                    { }
                    <button
                        type="submit"
                        className="signin-button cursor-pointer w-full bg-primary dark:bg-primary text-white dark:text-gray-900 py-2 px-4 rounded-md text-sm font-medium"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-gray-900 dark:text-gray-100 font-medium hover:underline">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>;
};
export default LoginFormNey;
const styles = `
  .signin-input:focus {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  .dark .signin-input:focus {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }

  .signin-button:hover {
    transform: translateY(-1px);
  }

  .signin-checkbox:checked + label .checkbox-icon {
    background-color: currentColor;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .signin-card {
    animation: fadeIn 0.3s ease-out;
  }
`;
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}
