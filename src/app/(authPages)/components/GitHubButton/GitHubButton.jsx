"use client";
import { useAuth } from '@/Hooks/UseAuth/UseAuth';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { Bounce, toast } from 'react-toastify';
const GitHubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
</svg>;
const GitHubButton = () => {
    const { gitHubLogin } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";
    const [message, setMessage] = useState('');
    const gitHubHandler = () => {
        gitHubLogin()
            .then(async (result) => {
                console.log(result.user);
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    role: "user",
                    photo: result?.user?.photoURL,
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString()
                }
                toast.success('GitHub Login Successfully', {
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
                try {
                    const res = await axios.post("/api/users", userInfo);
                    console.log("Signup Success:", res.data);
                    toast.success('GitHub Login Successfully new user', {
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
                } catch (error) {
                    console.log("GitHub Login Error:", error.message);
                    setMessage(error.response?.data?.message || "Something went wrong!");
                    console.log(message);
                }

            })
            .catch(error => {
                console.log(error);
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
    return (
        <button onClick={gitHubHandler} className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-950 hover:text-gray-900 dark:hover:text-gray-50 h-10 px-4 py-2">
            <GitHubIcon />
            <span className="ml-2">GitHub</span>
        </button>
    );
};

export default GitHubButton;