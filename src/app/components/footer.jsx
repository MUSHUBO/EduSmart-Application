// components/Footer.tsx
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="text-base-content p-8 md:p-12 border-2">
            <div className="container mx-auto">
                {/* Top section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-base-300 rounded-lg flex items-center justify-center">
                                <span className="font-bold">L</span>
                            </div>
                            <span className="font-bold text-lg">EduSmart</span>
                        </div>
                        <p className="mt-3 text-sm">
                            We believe in the power of play to foster creativity,
                            problem-solving skills, and imagination.
                        </p>

                        {/* Contact Info */}
                        <div className="mt-4 space-y-2 text-sm">
                            <p className="flex items-center gap-2">
                                <FaEnvelope className="text-base" />
                                majedulislam223311@gmail.com
                            </p>
                            <p className="flex items-center gap-2">
                                <FaPhoneAlt className="text-base" />
                                +91 9183 23 2309
                            </p>
                            <p className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-base" />
                                Somewhere in the World
                            </p>
                        </div>

                    </div>

                    {/* Home */}
                    <div>
                        <h6 className="footer-title">Home</h6>
                        <ul className="space-y-1">
                            <li><a className="link link-hover">Features</a></li>
                            <li><a className="link link-hover">Our Testimonials</a></li>
                            <li><a className="link link-hover">FAQ</a></li>
                        </ul>
                    </div>

                    {/* About Us */}
                    <div>
                        <h6 className="footer-title">About Us</h6>
                        <ul className="space-y-1">
                            <li><a className="link link-hover">Our Mission</a></li>
                            <li><a className="link link-hover">Our Vision</a></li>
                            <li><a className="link link-hover">Awards & Recognitions</a></li>
                            <li><a className="link link-hover">History</a></li>
                            <li><a className="link link-hover">Teachers</a></li>
                        </ul>
                    </div>

                    {/* Academics & Contact */}
                    <div>
                        <h6 className="footer-title">Academics</h6>
                        <ul className="space-y-1">
                            <li><a className="link link-hover">Special Features</a></li>
                            <li><a className="link link-hover">Gallery</a></li>
                        </ul>
                        <h6 className="footer-title mt-4">Contact Us</h6>
                        <ul className="space-y-1">
                            <li><a className="link link-hover">Information</a></li>
                            <li><a className="link link-hover">Map & Direction</a></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-base-600 my-6"></div>

                {/* Bottom section */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                    <div className="flex gap-4 mb-4 md:mb-0">
                        <a className="link link-hover">Terms of Service</a>
                        <a className="link link-hover">Privacy Policy</a>
                        <a className="link link-hover">Cookie Policy</a>
                    </div>
                    <div className="flex gap-3">
                        <a className="btn btn-circle btn-sm bg-base-300">
                            <FaFacebookF />
                        </a>
                        <a className="btn btn-circle btn-sm bg-base-300">
                            <FaTwitter />
                        </a>
                        <a className="btn btn-circle btn-sm bg-base-300">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <p className="text-center mt-4 text-xs">
                    Copyright © {new Date().getFullYear()} Little Learners Academy. All
                    rights reserved.
                </p>
            </div>
        </footer>
    );
}
