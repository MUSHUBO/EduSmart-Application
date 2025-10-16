"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { Bars } from "react-loader-spinner";

export default function BookInfoTabs({ params }) {
    const [activeTab, setActiveTab] = useState("details");
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(0);
    const [booksData, setbooksData] = useState([]);

    // ✅ include setValue
    const { register, handleSubmit, reset, setValue } = useForm();
    const { id } = React.use(params);

    useEffect(() => {
        axios.get("/api/books")
            .then((res) => {
                console.log("Data:", res.data.data);
                setbooksData(res.data.data);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, []);

    const singleData = booksData.find(data => data._id === id)

    const handleClick = (value) => {
        setRating(value);
        setValue("rating", value);
    };

    const onSubmit = async (data) => {
        const newReview = {
            rating: data.rating,
            comment: data.comment,
            createdAt: new Date().toISOString(),
        };

        try {
            const { data: result } = await axios.patch(
                `/api/singleBooks/${singleData._id}/review`,
                newReview
            );

            if (result.success) {
                toast.success('Review Successfully', {
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
                reset();
                setRating(0);
            } else {
                console.error("Error adding review:", result.message);
                toast.error(`Error adding review: ${result.message}`, {
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
            }
        } catch (error) {
            console.error("Network error:", error.response?.data || error.message);
            toast.error(`Network error: ${error.response?.data || error.message}`, {
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
        }
    };

    return (
        <div className="px-6 md:px-9 lg:px-12 py-18 md:py-24 lg:py-28">
            {
                singleData ?
                    <div className="max-w-5xl mx-auto my-10 bg-muted dark:bg-muted shadow-lg rounded-2xl overflow-hidden">
                        {/* ===== Top Book Info Section ===== */}
                        <div className="flex flex-col md:flex-row items-start gap-8 p-8">
                            <img
                                src={singleData.photoUrl}
                                alt="Book Cover"
                                className="w-[300px] md:w-[400px] rounded-lg shadow-md"
                            />
                            <div>
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-popover mb-2">
                                    {singleData.name}
                                </h1>
                                <p className="text-popover-foreground font-semibold mb-1 text-lg md:text-xl">
                                    <span className="font-semibold">Publisher:</span>                             {singleData.publisher}
                                </p>
                                <p className="text-popover-foreground">
                                    <span className="font-semibold">Edition:</span>{singleData.edition} ||
                                    <span className="font-semibold"> Category:</span> {singleData.category} → Class {singleData.class}
                                </p>

                                <div className="flex items-center gap-3 mt-5">
                                    <Link
                                        href={"/"}
                                        className="relative inline-flex items-center rounded-lg justify-center px-3 py-3 md:px-4 md:py-2 lg:px-5 lg:py-2.5 overflow-hidden font-mono font-medium tracking-tighter text-white bg-primary group"
                                    >
                                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56"></span>
                                        <span className="relative flex text-sm md:text-base duration-500 lg:text-lg font-semibold items-center gap-3">
                                            <FaCartPlus size={23} /> Add to Cart
                                        </span>
                                    </Link>
                                    <Link
                                        href={`${singleData.pdfDriveUrl}`}
                                        target="blank"
                                        className="relative inline-flex items-center rounded-lg justify-center px-3 py-3 md:px-4 md:py-2 lg:px-5 lg:py-2.5 overflow-hidden font-mono font-medium tracking-tighter text-white bg-secondary group"
                                    >
                                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-secondary rounded-full group-hover:w-56 group-hover:h-56"></span>
                                        <span className="relative flex text-sm md:text-base duration-500 lg:text-lg font-semibold items-center gap-3">
                                            <FaDownload size={23} /> Download
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* ===== Tabs ===== */}
                        <div className="max-w-5xl mx-auto mt-8 shadow-md rounded-xl overflow-hidden">
                            <div className="flex border-b">
                                <button
                                    onClick={() => setActiveTab("details")}
                                    className={`flex-1 py-3 text-center font-semibold transition-all ${activeTab === "details"
                                        ? "bg-primary text-popover border-b-4 border-primary"
                                        : "text-popover hover:text-primary"
                                        }`}
                                >
                                    Book Details
                                </button>
                                <button
                                    onClick={() => setActiveTab("reviews")}
                                    className={`flex-1 py-3 text-center font-semibold transition-all ${activeTab === "reviews"
                                        ? "bg-primary text-popover border-b-4 border-primary"
                                        : "text-popover hover:text-primary"
                                        }`}
                                >
                                    Reviews
                                </button>
                            </div>

                            {/* ===== Content Section ===== */}
                            <div className="p-6">
                                {activeTab === "details" && (
                                    <table className="w-full text-popover border border-gray-200 text-left">
                                        <tbody>
                                            <tr className="border-b">
                                                <th className="w-1/4 p-3 font-semibold">Title</th>
                                                <td className="p-3">
                                                    {singleData.name}
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="w-1/4 p-3 font-semibold">Publisher</th>
                                                <td className="p-3">{singleData.publisher}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="w-1/4 p-3 font-semibold">Edition</th>
                                                <td className="p-3">{singleData.edition}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="w-1/4 p-3 font-semibold">Country</th>
                                                <td className="p-3">{singleData.country}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="w-1/4 p-3 font-semibold">Language</th>
                                                <td className="p-3">{singleData.language}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="w-1/4 p-3 font-semibold">Description</th>
                                                <td className="p-3">{singleData.description}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}

                                {/* ===== Reviews Section ===== */}
                                {activeTab === "reviews" && (
                                    <div>
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className=" rounded-lg p-4 mb-6 bg-muted"
                                        >
                                            {/* ===== Rating ===== */}
                                            <div className="mb-3">
                                                <label className="block font-medium mb-1">Rating</label>
                                                <div className="flex gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => handleClick(star)}
                                                            onMouseEnter={() => setHover(star)}
                                                            onMouseLeave={() => setHover(0)}
                                                            className="focus:outline-none"
                                                        >
                                                            <span
                                                                className={`text-3xl transition-colors ${star <= (hover || rating)
                                                                    ? "text-yellow-400"
                                                                    : "text-gray-300"
                                                                    }`}
                                                            >
                                                                ★
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                                <input
                                                    type="hidden"
                                                    {...register("rating", { required: true })}
                                                    value={rating}
                                                />
                                            </div>

                                            {/* ===== Comment ===== */}
                                            <div className="mb-3">
                                                <label className="block font-medium mb-1">Comment</label>
                                                <textarea
                                                    {...register("comment", { required: true })}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                                                    rows="4"
                                                    placeholder="Write your review..."
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="bg-primary/90 text-white px-5 py-2 rounded-md hover:bg-primary duration-500 transition-all"
                                            >
                                                Submit Review
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    :
                    (
                        <div className="flex justify-center items-center">
                            <Bars
                                height="50"
                                width="50"
                                color="#4fa94d"
                                ariaLabel="bars-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>
                    )
            }

        </div>
    );
}
