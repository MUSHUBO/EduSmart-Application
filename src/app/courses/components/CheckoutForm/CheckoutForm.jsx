"use client"
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("")
    const [paymentLoading, setPaymentLoading] = useState(false)

    // const amount = singleData?.price;
    // const newAmmount = parseInt(amount)
    // const amountInCents = newAmmount * 100;

    const amountObject = {
        amountInCents : 1000000,
        parcelId: 1111
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setPaymentLoading(true)

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message)
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setPaymentLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit} className='space-y-4 bg-yellow-50 p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type='submit' disabled={!stripe} className={`w-full py-3 rounded-lg duration-200 text-popover text-base font-bold transition
      ${stripe ? 'bg-primary' : 'bg-gray-400 cursor-not-allowed'}
    `}>

                Pay For Booking {paymentLoading && <><span className="loading loading-dots loading-xs"></span>
                    <span className="loading loading-dots loading-sm"></span></>}
            </button>
            {
                error && <h1 className='text-red-600 text-sm'>{error}</h1>
            }
        </form>
    );
};

export default CheckoutForm;