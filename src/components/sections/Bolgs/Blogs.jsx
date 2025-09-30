import Link from 'next/link';
import React from 'react';
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

const Blogs = () => {
    // const articles = [
    //     {
    //         id: 1,
    //         image: "https://i.ibb.co.com/Hk7dxhd/01.jpg",
    //         date: "June 18, 2025",
    //         author: "Alicia Davis",
    //         comments: 3,
    //         title: "There Are Many Variations Passage Have Suffered Available.",
    //         link: "#"
    //     },
    //     {
    //         id: 2,
    //         image: "https://source.unsplash.com/random/400x300?study",
    //         date: "July 02, 2025",
    //         author: "Michael Johnson",
    //         comments: 5,
    //         title: "Learning Never Exhausts the Mind, Explore New Knowledge Daily.",
    //         link: "#",
    //         category: "Learning"
    //     },
    //     {
    //         id: 3,
    //         image: "https://source.unsplash.com/random/400x300?team",
    //         date: "August 12, 2025",
    //         author: "Sophia Brown",
    //         comments: 2,
    //         title: "Collaboration and Teamwork Are the Keys to Growth and Success.",
    //         link: "#"
    //     }
    // ];

    return (
        <section className=' px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-24'>
            <div className="text-center max-w-3xl mx-auto px-6">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-popover dark:text-popover">
                    Latest News <span className="text-secondary">& Blog</span>
                </h2>
                <p className="text-lg text-popover-foreground dark:text-popover-foreground mb-10 mt-3">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </p>
            </div>
            <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6'>
                <div className="relative p-2">
                    <div className='bg-muted dark:bg-muted max-w-[380px] mx-auto group overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow'>


                        {/* Date */}
                        <div className=' absolute top-10 md:-right-1 right-0 z-10 bg-secondary max-w-40 text-[#FFFFFF] flex justify-center items-center gap-2 cursor-pointer py-1 px-2 rounded-md'>
                            <SlCalender size={18} />
                            <h1 className='text-sm font-medium hover:text-secondary duration-300 '>June 18, 2025</h1>
                        </div>
                        {/* Image */}
                        <div className="relative w-full overflow-hidden">
                            <img
                                src="https://i.ibb.co.com/Hk7dxhd/01.jpg"
                                alt="https://i.ibb.co.com/Hk7dxhd/01.jpg"
                                className="h-full w-full object-cover group-hover:scale-110 duration-700"
                            />
                            <div className="absolute inset-0 bg-white/50 opacity-30 group-hover:opacity-0 scale-x-0 group-hover:scale-x-150 transition duration-700 ease-initial"></div>
                        <div className="absolute inset-0 bg-white/50 opacity-30 group-hover:opacity-0 scale-y-0 group-hover:scale-y-150 transition duration-700 ease-initial"></div>
                        </div>
                        <div className='px-4'>


                            <div className='flex justify-between border-b-2 border-secondary/20 py-4'>
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <CgProfile className='text-secondary' size={20} />
                                    <h1 className='text-base font-medium hover:text-secondary duration-300 '>Alicia Davis</h1>
                                </div>
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <FaRegComments className='text-secondary' size={20} />
                                    <h1 className='text-base font-medium hover:text-secondary duration-300 '>03 Comments</h1>

                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mt-3 hover:text-secondary duration-300 cursor-pointer">There Are Many Variations Passage Have Suffered Available.</h3>
                            </div>
                            <div className='py-6'>
                                <Link href={"/"} className="relative inline-flex items-center rounded-lg justify-center px-3 py-3 md:px-4 md:py-2 lg:px-5 lg:py-2.5 overflow-hidden font-mono font-medium tracking-tighter text-white bg-secondary group">
                                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56"></span>
                                    <span className="group-hover:text-[#FFFFFF] relative flex text-sm md:text-base duration-500 lg:text-md font-semibold items-center gap-3">
                                        Read More <FaLongArrowAltRight />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-[380px] mx-auto group relative overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    {/* Image */}
                    <div className="relative w-full h-full overflow-hidden">
                        <img
                            src="https://i.ibb.co.com/LhSwk2jC/blog-07.jpg"
                            alt="Blog thumbnail"
                            className="h-full w-full object-cover transform duration-700 group-hover:scale-110"
                        />

                        {/* White overlay shade */}
                        <div className="absolute inset-0 bg-white/50 opacity-30 group-hover:opacity-0 scale-x-0 group-hover:scale-x-150 transition duration-700 ease-initial"></div>
                        <div className="absolute inset-0 bg-white/50 opacity-30 group-hover:opacity-0 scale-y-0 group-hover:scale-y-150 transition duration-700 ease-initial"></div>
                    </div>
                </div>


                <div className="max-w-[380px] mx-auto rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
                    <div className="bg-muted group rounded-t-2xl dark:bg-muted p-5 space-y-2 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                        <div>
                            {/* Category Tag */}
                            <Link href={"/"} className="relative inline-flex items-center justify-center px-3 py-3 md:px-4 md:py-2 lg:px-5 lg:py-2.5 overflow-hidden font-mono font-medium tracking-tighter text-white bg-secondary group">
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56"></span>
                                <span className="group-hover:text-[#FFFFFF] relative flex text-sm md:text-base duration-500 lg:text-md font-semibold items-center gap-3">
                                    Learning
                                </span>
                            </Link>

                            {/* Title */}
                            <h3 className="text-xl font-bold hover:text-secondary duration-300 cursor-pointer border-b-2 border-secondary/20 py-4">Learning Never Exhausts the Mind, Explore New Knowledge Daily.</h3>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between py-3">
                            <a
                                href="/"
                                className="text-base font-medium hover:text-secondary duration-300 "
                            >
                                READ MORE
                            </a>
                            <span className="text-base text-popover-foreground dark:text-popover-foreground font-semibold">July 02, 2025</span>
                        </div>
                    </div>
                    <div className="bg-muted group rounded-b-2xl dark:bg-muted space-y-2 p-5 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                        <div>
                            {/* Category Tag */}
                            <Link href={"/"} className="relative inline-flex items-center justify-center px-3 py-3 md:px-4 md:py-2 lg:px-5 lg:py-2.5 overflow-hidden font-mono font-medium tracking-tighter text-white bg-secondary group">
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56"></span>
                                <span className="group-hover:text-[#FFFFFF] relative flex text-sm md:text-base duration-500 lg:text-md font-semibold items-center gap-3">
                                    Success
                                </span>
                            </Link>

                            {/* Title */}
                            <h3 className="text-xl font-bold hover:text-secondary duration-300 cursor-pointer border-b-2 border-secondary/20 py-4">Collaboration and Teamwork Are the Keys to Growth and Success.</h3>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between py-3">
                            <a
                                href="/"
                                className="text-base font-medium hover:text-secondary duration-300 "
                            >
                                READ MORE
                            </a>
                            <span className="text-base text-popover-foreground dark:text-popover-foreground font-semibold">August 12, 2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blogs;