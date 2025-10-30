import React, { Suspense } from "react";
import PaymentMethod from "@/app/courses/stripe/PaymentMethod";

export default function StripePage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-lg">Loading Payment Page...</div>}>
      <PaymentMethod />
    </Suspense>
  );
}