"use client";
import { useAuth } from "@/Hooks/UseAuth/UseAuth";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const CheckoutForm = ({ course, setIsModalOpen }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const [paymentLoading, setPaymentLoading] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const amount = course?.price || 0;
    const newAmount = Math.round(amount * 100);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPaymentLoading(true);

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        // Create payment method
        const { error: methodError } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (methodError) {
            setError(methodError.message);
            setPaymentLoading(false);
            return;
        }

        setError("");

        // Create Payment Intent
        const res = await axios.post(`/api/createPaymentIntent`, { newAmount });
        const clientSecret = res.data.clientSecret;

        // Confirm Payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email,
                },
            },
        });

        if (result.error) {

            setError(result.error.message);
            setPaymentLoading(false);
        } else if (result.paymentIntent.status === "succeeded") {
            // Save payment record

            const paymentRecord = {
                Id: course?._id,
                courseTitle: course?.title,
                price: newAmount,
                transactionId: result.paymentIntent.id,
                paymentMethod: result.paymentIntent.payment_method_types,
                userEmail: user?.email,
                userName: user?.displayName,
            };

            const saveRes = await axios.post(`/api/payments`, paymentRecord);

            if (saveRes.data?.insertedId) {

                Swal.fire({
                    icon: "success",
                    title: "Payment Successful!",
                    html: `<p>Transaction ID: <b>${result.paymentIntent.id}</b></p>`,
                    confirmButtonText: "Go to My Courses",
                    confirmButtonColor: "#28a745",
                }).then(() => {
                    setIsModalOpen(false);
                    router.push("/allCourses");
                });
            }
            setPaymentLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-yellow-50 p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
        >
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": { color: "#aab7c4" },
                        },
                        invalid: { color: "#9e2146" },
                    },
                }}
            />
            <button
                type="submit"
                disabled={!stripe || paymentLoading}
                className={`w-full py-3 rounded-lg text-white font-bold text-base transition ${!stripe || paymentLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primary hover:bg-primary/90"
                    }`}
            >
                {paymentLoading ? (
                    <>
                        Processing <span className="loading loading-dots loading-sm"></span>
                    </>
                ) : (
                    `Pay $${amount}`
                )}
            </button>

            {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
    );
};

export default CheckoutForm;