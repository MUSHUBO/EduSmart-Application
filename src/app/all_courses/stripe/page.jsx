 "use client"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const page = () => {
    return (
        <div className='max-w-[1000px] text-center mx-auto text-3xl px-6 md:px-9 lg:px-12 py-18 md:py-24 lg:py-28'>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default page;