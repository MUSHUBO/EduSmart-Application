"use client";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCreditCard } from "react-icons/fa";
import security from "../../../../public/lotttie-file/security.json"
import Lottie from 'lottie-react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const PaymentMethod = () => {
  const [selected, setSelected] = useState("");
  const [course, setCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  useEffect(() => {
    if (!courseId) return;
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/${courseId}`);
        if (res.data.success && res.data.data) {
          const rawData = res.data.data;
          const normalizedData = {
            ...rawData,
            price: rawData.price?.$numberInt
              ? Number(rawData.price.$numberInt)
              : Number(rawData.price) || 0,
            teacherName: rawData.instructor,
          };
          setCourse(normalizedData);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching course data");
      }
    };
    fetchCourse();
  }, [courseId]);

  const openPaymentModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='max-w-[1000px] mx-auto text-3xl px-6 md:px-9 lg:px-12 py-18 md:py-24 lg:py-28'>
      <div className='p-6 md:p-8 lg:p-22 bg-accent rounded-2xl'>
        <div className="flex items-center mb-4 gap-2">
          <div className="w-18 h-18 bg-primary/20 dark:bg-primary/20 rounded-full">
            <Lottie animationData={security} loop={true} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-black">Secure Payment</h2>
            <p className="text-sm text-black/70">Choose your payment method</p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setSelected("bkash")}
            className={`border rounded-xl p-4 flex cursor-pointer flex-col items-center justify-center transition-all duration-200 ${selected === "bkash"
              ? "border-pink-500 bg-pink-50"
              : "border-gray-200 bg-white"}`}
          >
            <img src="/images/gallery/images-removebg-preview.png" alt="bKash" className="w-20" />
            <span className="text-sm text-gray-500 mt-1">Pay with bKash</span>
          </button>

          <button
            onClick={openPaymentModal}
            className="group border rounded-xl p-4 cursor-pointer flex flex-col items-center border-blue-500 justify-center transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
          >
            <FaCreditCard className="text-3xl mb-1 text-blue-600" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-700">Pay with Card</span>
          </button>
        </div>

        <div className="flex justify-center gap-6 border-t border-primary pt-4">
          <button onClick={openPaymentModal}>
            <FaCcVisa className="text-4xl text-blue-500" />
          </button>
          <button onClick={openPaymentModal}>
            <FaCcMastercard className="text-4xl text-red-500" />
          </button>
          <button onClick={openPaymentModal}>
            <FaCcAmex className="text-4xl text-blue-700" />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <dialog open className="modal modal-middle">
          <div className="modal-box bg-accent">
            <h3 className="font-bold text-base text-black mb-2">Confirm Your Booking</h3>
            <h4 className="mb-4 text-lg text-black/70">
              Are you sure you want to proceed with payment for <strong className='text-primary'>web course?</strong>
            </h4>
            <div className="modal-action flex justify-between items-end">
              <Elements stripe={stripePromise}>
                <CheckoutForm course={course} setIsModalOpen={setIsModalOpen} />
              </Elements>
              <button onClick={closeModal} className="btn btn-ghost bg-red-700 rounded-md text-[#FFFFFF]">
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PaymentMethod;