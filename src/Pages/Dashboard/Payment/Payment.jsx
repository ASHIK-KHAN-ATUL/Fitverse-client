import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLocation } from 'react-router-dom';
import CheackoutForm from './CheackoutForm';



const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {

    const location = useLocation();
    const { slot, selectedPackage } = location.state;
    // console.log(slot,selectedPackage) 

    return (
        <div className='py-10'>
            <div className='w-[80%] mx-auto'>

            <div className='bg-[#90e0ef]/20  border-2 border-[#90e0ef] p-6 mb-20  rounded-xl shadow-md'>
            <h1 className='text-2xl font-bold text-center mb-6'>Payment Invoice</h1>

            <table className='table-auto w-full text-left border-collapse text-sm'>
                <tbody>
                <tr className='border-b border-[#90e0ef]'>
                    <th className='py-2 px-4 font-semibold'>Item</th>
                    <th className='py-2 px-4 font-semibold'>Details</th>
                </tr>
                <tr className='border-b border-[#90e0ef]'>
                    <td className='py-2 px-4'>Package Name</td>
                    <td className='py-2 px-4'>{selectedPackage?.name || 'N/A'}</td>
                </tr>
                <tr className='border-b border-[#90e0ef]'>
                    <td className='py-2 px-4'>Price</td>
                    <td className='py-2 px-4'>${selectedPackage?.price}</td>
                </tr>
                <tr className='border-b border-[#90e0ef]'>
                    <td className='py-2 px-4'>Slot Time</td>
                    <td className='py-2 px-4'>{slot?.slotTime} to  {slot?.slotTime + 1}</td>
                </tr>
                <tr className='border-b border-[#90e0ef]'>
                    <td className='py-2 px-4'>Trainer</td>
                    <td className='py-2 px-4'>{slot?.trainerName || 'N/A'}</td>
                </tr>

                </tbody>
            </table>
            </div>


            <div>
                <Elements stripe={stripePromise}>
                    <CheackoutForm></CheackoutForm>
                </Elements>
            </div>

            </div>
        </div>
    );
};

export default Payment;