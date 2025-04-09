'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PayPalPaymentButtons from '../app/components/PaypalButttons/PaypalButtons'

const PaymentPage: React.FC = () => {
    const searchParams = useSearchParams();
    const amount = searchParams ? searchParams.get('amount') : null;
    const CLIENT_ID = process.env.PAYPAL_CLIENT_ID as string;

    const handleSuccess = () => {
        console.log("Success")
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleError = (error: any) => {
        console.error('Payment error:', error);
    };

    return (
        <div className='bg-blue-900'>
            <div className="w-full bg-blue-900 flex flex-col justify-center items-center">
                <h1 className="md:text-5xl text-3xl font-bold text-blue-500">Payment Page</h1>
                <p>Total Amount: ${amount}</p>
                <div className="w-screen p-14">
                    <PayPalPaymentButtons amount={parseFloat(amount as string)} paypalClientId={CLIENT_ID} onSuccess={handleSuccess} onError={handleError} />
                </div>
            </div>
        </div>
    );
};

const actualPage: React.FC = () => {
    return <Suspense fallback={<div>Loading...</div>}><PaymentPage /></Suspense>;
}

export default actualPage;