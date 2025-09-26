'use client';

import { motion } from 'framer-motion';
import { FaImages } from 'react-icons/fa';

// import photo from "/images/gallery/01 (1).jpg"

export default function PhotoGallery() {
    return (
        <section className="py-10">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center gap-2 text-orange-500 uppercase text-sm font-semibold">
                        <FaImages />
                        Gallery
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        Our Photo <span className="text-orange-500">Gallery</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-lg mx-auto text-sm">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    </p>
                </div>
                <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
                    <div className=" grid grid-cols-3  gap-4 p-4 mx-auto ">
                        {/* <img src="/images/teachers/why.jpg" alt="" className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square" /> */}
                        <motion.img
                            src="/images/gallery/01 (1).jpg"
                            alt="Gallery" className="w-full h-full rounded shadow-sm min-h-10 dark:bg-gray-500 aspect-square row-span-2"
                            
                        />
                        <motion.img
                            src="/images/gallery/02 (1).jpg"
                            alt="Gallery" className="w-full h-full rounded shadow-sm min-h-10 dark:bg-gray-500 aspect-square row-span-4"
                            
                        />
                        <motion.img
                            src="/images/gallery/03 (1).jpg"
                            alt="Gallery" className="w-full h-full rounded shadow-sm min-h-10 dark:bg-gray-500 aspect-square row-span-6"
                            
                        />
                        <motion.img
                            src="/images/gallery/04 (1).jpg"
                            alt="Gallery" className="w-full h-full rounded shadow-sm min-h-10 dark:bg-gray-500 aspect-square row-span-6"
                            
                        />
                        <motion.img
                            src="/images/gallery/05.jpg"
                            alt="Gallery" className="w-full h-full rounded shadow-sm min-h-10 dark:bg-gray-500 aspect-square row-span-4"
                           
                        />
                        <motion.img
                            src="/images/gallery/06.jpg"
                            alt="Gallery" className="w-full h-full rounded shadow-sm min-h-10 dark:bg-gray-500 aspect-square row-span-2"
                          
                        />
                        {/* <motion.img
                            src="/images/gallery/06.jpg"
                            alt="Gallery" className="w-full h-full rounded shadow-sm min-h-10 dark:bg-gray-500 aspect-square row-span-2"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.4 }}
                        /> */}
                    </div>
                </section>
            </div>
        </section>
    );
}

