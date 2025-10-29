"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthContext/AuthContext";
import { useRouter } from "next/navigation";
import { Bars } from "react-loader-spinner";

export default function AdminProvider({ children }) {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchRole = async () => {
            if (!user?.email) return;

            try {
                const res = await fetch(`/api/getUserRole?email=${user.email}`);
                const data = await res.json();

                if (data.role === "admin") {
                    setRole("admin");
                } else {
                    router.push("/");
                }
            } catch (err) {
                console.error("Failed to fetch role:", err);
                router.push("/");
            }
        };
        fetchRole();
    }, [user]);

    if (!role) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Bars
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }

    return <>{children}</>;
}
