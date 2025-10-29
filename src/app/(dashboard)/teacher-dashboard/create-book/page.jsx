"use client";
import { useForm } from "react-hook-form";
import bookLottie from "../../../../../public/lotttie-file/book.json";
import Lottie from 'lottie-react';
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import { Bounce, toast } from "react-toastify";
export default function bookForm() {
    const [message, setMessage] = useState('');
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const onSubmit = async (data) => {

        const bookInfo = {
            ...data,
            comments: [],
            rating: []
        }
        console.log(bookInfo);
        try {
            const res = await axios.post("/api/books", bookInfo);
            setMessage(res.data.message);
            console.log("Book information saved successfully:", res.data);
            console.log(message);
            toast.success('Book information saved successfully!', {
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
            reset()
        } catch (error) {
            console.log("Book information Error:", error.response?.data || error.message);
            setMessage(error.response?.data?.message || "Something went wrong!");
            console.log(message);
        }

    };
    return (
        <div className="-8 md:py-6 lg:py-6">
            <div className="max-w-5xl mx-auto p-6 sm:p-8 md:p-10 border border-primary rounded-2xl shadow-xl">
                <div className="text-3xl md:text-4xl lg:text-5xl  font-bold text-center mb-6 text-popover dark:text-popover flex justify-center items-center gap-2">
                    <div data-aos="fade-left" className="max-w-[100px] p-4">
                        <Lottie animationData={bookLottie} loop={true} />
                    </div> <div data-aos="fade-right">Add New <span className="text-primary">Book</span></div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Photo URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Photo URL</label>
                        <input
                            {...register("photoUrl", { required: "Photo URL is required" })}
                            placeholder="Enter photo URL"
                            className="w-full mt-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.photoUrl && <p className="text-red-500 text-sm mt-1">{errors.photoUrl.message}</p>}
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            placeholder="Enter book name"
                            className="w-full mt-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Edition</label>
                        <input
                            {...register("edition", { required: "Edition is required" })}
                            placeholder="Enter edition (e.g., 2nd Edition)"
                            className="w-full mt-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.edition && <p className="text-red-500 text-sm mt-1">{errors.edition.message}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <input
                            {...register("category", { required: "Category is required" })}
                            placeholder="Enter category"
                            className="w-full mt-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                    </div>

                    {/* Class */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class</label>
                        <input
                            {...register("class", { required: "Class is required" })}
                            placeholder="Enter class"
                            className="w-full mt-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.class && <p className="text-red-500 text-sm mt-1">{errors.class.message}</p>}
                    </div>

                    {/* Publisher */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Publisher</label>
                        <input
                            {...register("publisher", { required: "Publisher is required" })}
                            placeholder="Enter publisher name"
                            className="w-full mt-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.publisher && <p className="text-red-500 text-sm mt-1">{errors.publisher.message}</p>}
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                        <input
                            {...register("country", { required: "Country is required" })}
                            placeholder="Enter country"
                            className="w-full mt-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                    </div>

                    {/* Language */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
                        <input
                            {...register("language", { required: "Language is required" })}
                            placeholder="Enter language (e.g., English)"
                            className="w-full mt-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            placeholder="Write a short description..."
                            rows="4"
                            className="w-full mt-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none resize-none"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    {/* PDF Drive URL */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">PDF Drive URL</label>
                        <input
                            {...register("pdfDriveUrl", { required: "PDF Drive URL is required" })}
                            placeholder="Enter PDF drive link"
                            className="w-full mt-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.pdfDriveUrl && <p className="text-red-500 text-sm mt-1">{errors.pdfDriveUrl.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 flex justify-center mt-4">
                        <button
                            type="submit"
                            className="w-full bg-primary/90 text-white py-2 rounded hover:bg-primary duration-300 cursor-pointer transition-colors"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
