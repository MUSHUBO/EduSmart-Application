"use client"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const page = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openPaymentModal = (booking) => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='max-w-[1000px] text-center mx-auto text-3xl px-6 md:px-9 lg:px-12 py-18 md:py-24 lg:py-28'>
            <div className="space-x-2">

                <button
                    onClick={openPaymentModal}
                    className="btn btn-md rounded-2xl btn-primary">
                    Pay
                </button>
            </div>
            {isModalOpen && (
                <dialog open className="modal modal-middle">
                    <div className="modal-box bg-primary">
                        <h3 className="font-bold text-base mb-2">Confirm Your Booking</h3>
                        <h4 className="mb-4 text-lg">
                            Are you sure you want to proceed with payment for <br></br>
                            <strong> web course </strong>?
                        </h4>
                        <div className="modal-action flex justify-between items-start">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm setIsModalOpen={setIsModalOpen}></CheckoutForm>
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

export default page;