
import { FaFacebookF, FaTwitter, FaPhoneAlt, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiSolidRightArrow } from "react-icons/bi";
import Link from "next/link";
import { SiMinutemailer } from "react-icons/si";


export default function Footer() {
    return (
        <footer
            className="relative text-white py-6 md:py-8 lg:py-12 px-8 md:px-16 lg:px-24"
            style={{
                backgroundImage: "url('/images/eduSmart.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#012758] bg-opacity-90"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div>
                        <div className="max-w-[230px]">
                            <img src="/images/eduSmart.png" />
                        </div>
                        <p className="mt-3 text-base font-medium">
                            We are many variations of passages available but the majority have suffered alteration in some form by injected humour words believable.
                        </p>

                        {/* Contact Info */}
                        <div className="mt-4 space-y-5 text-base font-medium">
                            <p className="flex items-center gap-2">
                                <div className="p-1.5 bg-secondary text-[#FFFFFF] rounded-sm">
                                    <MdEmail className="text-base" />
                                </div>
                                edusmartbd@gmail.com
                            </p>
                            <p className="flex items-center gap-2">
                                <div className="p-1.5 bg-secondary text-[#FFFFFF] rounded-sm">
                                    <FaPhoneAlt className="text-base" />
                                </div>
                                +8801912716966
                            </p>
                            <p className="flex items-center gap-2">
                                <div className="p-1.5 bg-secondary text-[#FFFFFF] rounded-sm">
                                    <FaMapMarkerAlt className="text-base" />
                                </div>
                                Dhaka,Bangladesh
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col mt-8">
                        <h6 className=" text-lg font-bold text-[#FFFFFF] mb-6">Quick Links</h6>
                        <div className="space-y-3 text-base font-normal">
                            <p className="flex items-center gap-2 cursor-pointer hover:text-secondary duration-500 hover:translate-x-2"><BiSolidRightArrow fill="#ff7029" size={12} /> About Us</p>
                            <p className="flex items-center gap-2 cursor-pointer hover:text-secondary duration-500 hover:translate-x-2"><BiSolidRightArrow fill="#ff7029" size={12} /> FAQ's</p>
                            <p className="flex items-center gap-2 cursor-pointer hover:text-secondary duration-500 hover:translate-x-2"><BiSolidRightArrow fill="#ff7029" size={12} /> Terms Of Service</p>
                            <p className="flex items-center gap-2 cursor-pointer hover:text-secondary duration-500 hover:translate-x-2"><BiSolidRightArrow fill="#ff7029" size={12} />  Privacy policy</p>
                            <p className="flex items-center gap-2 cursor-pointer hover:text-secondary duration-500 hover:translate-x-2"><BiSolidRightArrow fill="#ff7029" size={12} /> Update News</p>
                        </div>
                    </div>

                    <div className="flex flex-col mt-8">
                        <h6 className=" text-lg font-bold text-[#FFFFFF] mb-6">Newsletter</h6>
                        <div className="space-y-3 text-base font-normal">
                            <p className="flex items-center gap-2 cursor-pointer hover:text-secondary duration-500 hover:translate-x-2"><BiSolidRightArrow fill="#ff7029" size={12} /> Campus Safety</p>
                            <p className="flex items-center gap-2 cursor-pointer hover:text-secondary duration-500 hover:translate-x-2"><BiSolidRightArrow fill="#ff7029" size={12} /> Student Activities</p>
                            <p className="flex items-center gap-2 cursor-pointer hover:text-secondary duration-500 hover:translate-x-2"><BiSolidRightArrow fill="#ff7029" size={12} /> Academic Department</p>
                            <p className="flex items-center gap-2 cursor-pointer hover:text-secondary duration-500 hover:translate-x-2"><BiSolidRightArrow fill="#ff7029" size={12} /> Facility Services</p>
                        </div>
                    </div>
                    <div className="flex flex-col mt-8">
                        <h6 className=" text-lg font-bold text-[#FFFFFF] mb-6">Quick Links</h6>
                        <div className="space-y-3 text-base font-normal">
                            <p className="mt-3 text-base font-medium">
                                Subscribe Our Newsletter To Get Latest Update And News
                            </p>
                            <div className="w-53">
                                <label className="flex items-center p-2.5 md:p-3 lg:p-3.5 gap-2 bg-red-50 text-black rounded-md">
                                    <svg
                                        className="h-[1em] opacity-50"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <g
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2.5"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </g>
                                    </svg>

                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        required
                                        className="w-full bg-white text-black text-lg border-none outline-none focus:outline-none focus:ring-0 focus:border-none"
                                    />
                                </label>



                            </div>

                            <Link href={"/"} className="relative inline-flex items-center rounded-lg justify-center px-4 py-4 md:px-5 md:py-3 lg:px-6 lg:py-3.5 overflow-hidden font-mono font-medium tracking-tighter text-white bg-secondary group">
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#FFFFFF] rounded-full group-hover:w-56 group-hover:h-56"></span>
                                <span className="group-hover:text-secondary relative flex text-sm md:text-base duration-500 lg:text-lg font-semibold items-center gap-3">
                                    Subscribe Now <SiMinutemailer size={23} />
                                </span>
                            </Link>

                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-600 my-6"></div>

                <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                    <p className="text-center mt-4 font-bold text-md">
                        Copyright © {new Date().getFullYear()} <span className="text-secondary">EduSmart</span>. All rights reserved.
                    </p>
                    <div className="flex gap-3">
                        <a href="#" className="p-3 bg-white rounded-md hover:bg-secondary hover:text-[#FFFFFF] duration-500 text-secondary">
                            <FaFacebookF size={16} />
                        </a>
                        <a href="#" className="p-3 bg-white rounded-md hover:bg-secondary hover:text-[#FFFFFF] duration-500 text-secondary">
                            <FaTwitter size={16} />
                        </a>
                        <a href="#" className="p-3 bg-white rounded-md hover:bg-secondary hover:text-[#FFFFFF] duration-500 text-secondary">
                            <FaInstagram size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
