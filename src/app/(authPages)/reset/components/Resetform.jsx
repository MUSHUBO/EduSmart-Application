"use client";
import { useAuth } from "@/Hooks/UseAuth/UseAuth";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";

const Resetform = () => {
  const { register, handleSubmit, formState: { errors }  } = useForm();
  const { resetPassword } = useAuth()

  const resetHandler = (data) => {
    const {email} = data
    if (email) {
      resetPassword(email)
        .then(() => {
          toast.success('Password reset email sent!', {
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
        .catch((error) => {
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
    else {
      console.log("email nai,,,,,,,!");
    }

  }
  return <div className="flex items-center justify-center p-4 font-sans relative overflow-hidden">
    <div className="p-8 rounded-xl border max-w-md w-full relative z-10 transform transition-all duration-300 border-primary/50">
      <h1 className="text-foreground text-3xl md:text-4xl font-semibold mb-3 text-center tracking-tight">
        Recover Password
      </h1>
      <p className="text-muted-foreground text-base md:text-lg mb-8 text-center leading-relaxed">
        Enter your email to receive a reset link
      </p>
      <form onSubmit={handleSubmit(resetHandler)}>
        <div className="mb-6 relative">
          <label htmlFor="email" className="block text-foreground text-sm font-medium mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email" id="email"
              {...register("email", { required: "Email is required" })}
              placeholder="name@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary border border-border hover:border-primary/50 transition-all duration-200 text-base" aria-label="Email address for password recovery" />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs">
              {String(errors.email.message)}
            </p>
          )}
        </div>

        <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75 transition-all duration-200 active:scale-95 transform hover:scale-105" aria-label="Send password reset link">
          Send Reset Link
        </button>
      </form>


      <p className="text-muted-foreground text-center text-sm mt-6 mb-8 leading-relaxed">
        We&apos;ll send you a secure link to reset your password.
      </p>

      <div className="border-t border-border pt-6 text-center">
        <p className="text-muted-foreground text-sm">
          Remembered your password?{" "}
          <Link href="/login" className="text-blue-700 hover:underline" aria-label="Log in to your account">
            Log in
          </Link>
        </p>
      </div>
    </div>
  </div>;
};
export default Resetform;