import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <div className='max-w-[1000px] text-center mx-auto text-3xl px-6 md:px-9 lg:px-12 py-18 md:py-24 lg:py-28'>
            <Link href={`/all_courses/stripe`} className='text-2xl text-shadow-yellow-50 px-8 p-2 bg-primary rounded-2xl cursor-pointer'>
                Pay
            </Link>
        </div>
    );
};

export default page;