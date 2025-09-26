
import { FaFacebookF, FaTwitter, FaPhoneAlt, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

export default function Footer() {
    return (
        <footer style={{
            backgroundImage: "url('/images/gradient-orange-waves-background-fluid-gradient-shapes-composition-vector.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover"
        }}
            className="text-black dark:text-white bg py-6 md:py-8 lg:py-12 px-8 md:px-16 lg:px-24 border-2">
            <div className="container mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div>
                        <div className="max-w-[160px]">
                            <img src="/images/Dumondi (4)-Photoroom.png" alt="edusmart_logo" />
                        </div>
                        <p className="mt-3 text-sm">
                            We are many variations of passages available but the majority have suffered alteration in some form by injected humour words believable.
                        </p>

                        {/* Contact Info */}
                        <div className="mt-4 space-y-2 text-sm">
                            <p className="flex items-center gap-2">
                                <MdMailOutline  className="text-base" />
                                majedulislam223311@gmail.com
                            </p>
                            <p className="flex items-center gap-2">
                                <FaPhoneAlt className="text-base" />
                                +8801912716966
                            </p>
                            <p className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-base" />
                                Dhaka,Bangladesh
                            </p>
                        </div>

                    </div>


                    <div>
                        <h6 className="footer-title">Home</h6>
                        <ul className="space-y-1">
                            <li><a className="link link-hover">Features</a></li>
                            <li><a className="link link-hover">Our Testimonials</a></li>
                            <li><a className="link link-hover">FAQ</a></li>
                        </ul>
                    </div>


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


                <div className="border-t border-base-600 my-6"></div>


                <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                    <div className="flex gap-4 mb-4 md:mb-0">
                        <a className="link link-hover">Terms of Service</a>
                        <a className="link link-hover">Privacy Policy</a>
                        <a className="link link-hover">Cookie Policy</a>
                    </div>
                    <div className="flex gap-3">
                        <a
                            href="#"
                            className="p-2 bg-white shadow border border-primary rounded-md hover:bg-accent-foreground  text-primary"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className="p-2 bg-white shadow border border-primary rounded-md hover:bg-accent-foreground text-primary"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="#"
                            className="p-2 bg-white shadow border border-primary rounded-md hover:bg-accent-foreground text-primary"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>


                <p className="text-center mt-4 text-xs">
                    Copyright © {new Date().getFullYear()} Little Learners Academy. All
                    rights reserved.
                </p>
            </div>
        </footer>
    );
}
