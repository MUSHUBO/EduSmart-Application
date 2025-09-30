import Link from 'next/link';
import React from 'react';
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

const Blogs = () => {
    const articles = [
        {
            id: 1,
            image: "https://i.ibb.co.com/Hk7dxhd/01.jpg",
            date: "June 18, 2025",
            author: "Alicia Davis",
            comments: 3,
            title: "There Are Many Variations Passage Have Suffered Available.",
            link: "#"
        },
        {
            id: 2,
            image: "https://source.unsplash.com/random/400x300?study",
            date: "July 02, 2025",
            author: "Michael Johnson",
            comments: 5,
            title: "Learning Never Exhausts the Mind, Explore New Knowledge Daily.",
            link: "#"
        },
        {
            id: 3,
            image: "https://source.unsplash.com/random/400x300?team",
            date: "August 12, 2025",
            author: "Sophia Brown",
            comments: 2,
            title: "Collaboration and Teamwork Are the Keys to Growth and Success.",
            link: "#"
        }
    ];

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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <div className="max-w-[380px] overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    {/* Image */}
                    <div className="relative w-full">
                        <img
                            src="https://i.ibb.co.com/Hk7dxhd/01.jpg"
                            alt="https://i.ibb.co.com/Hk7dxhd/01.jpg"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className='px-4'>


                        <div className='flex justify-between border-b-2 border-secondary/20 py-4'>
                            <div className='flex items-center gap-2 cursor-pointer'>
                                <CgProfile className='text-secondary' size={20} />
                                <h1 className='text-base font-medium hover:text-secondary duration-200 '>Alicia Davis</h1>
                            </div>
                            <div className='flex items-center gap-2 cursor-pointer'>
                                <FaRegComments className='text-secondary' size={20} />
                                <h1 className='text-base font-medium hover:text-secondary duration-200 '>03 Comments</h1>

                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mt-3">There Are Many Variations Passage Have Suffered Available.</h3>
                        </div>
                        <div className='py-6'>
                            <Link href={"/"} className="relative inline-flex items-center rounded-lg justify-center px-3 py-3 md:px-4 md:py-2 lg:px-5 lg:py-2.5 overflow-hidden font-mono font-medium tracking-tighter text-white bg-secondary group">
                    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56"></span>
                    <span className="group-hover:text-[#FFFFFF] relative flex text-sm md:text-base duration-300 lg:text-md font-semibold items-center gap-3">
                       Read More <FaLongArrowAltRight />
                    </span>
                </Link>
                        </div>
                    </div>
                </div>
                <div className="max-w-md overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    {/* Image */}
                    <div className="relative h-76 w-full">
                        <img
                            src="https://i.ibb.co.com/Hk7dxhd/01.jpg"
                            alt="https://i.ibb.co.com/Hk7dxhd/01.jpg"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex items-center gap-1.5'>
                            <CgProfile />
                            Alicia Davis
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <FaRegComments />
                            03 Comments
                        </div>
                    </div>

                    <div className="p-4">
                        <h3 className="text-lg font-bold mt-3">There Are Many Variations Passage Have Suffered Available.</h3>
                    </div>

                </div>
                <div className="max-w-md overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    {/* Image */}
                    <div className="relative h-76 w-full">
                        <img
                            src="https://i.ibb.co.com/Hk7dxhd/01.jpg"
                            alt="https://i.ibb.co.com/Hk7dxhd/01.jpg"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex items-center gap-1.5'>
                            <CgProfile />
                            Alicia Davis
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <FaRegComments />
                            03 Comments
                        </div>
                    </div>

                    <div className="p-4">
                        <h3 className="text-lg font-bold mt-3">There Are Many Variations Passage Have Suffered Available.</h3>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Blogs;