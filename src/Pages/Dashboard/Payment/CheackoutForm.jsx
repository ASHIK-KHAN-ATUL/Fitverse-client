import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { GrLogin } from 'react-icons/gr';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheackoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [isHover, setIsHover] = useState(false);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const nagivate = useNavigate();

    const location = useLocation();
    const { slot, selectedPackage } = location.state;
    // console.log(slot,selectedPackage);

    const price = selectedPackage.price;
    // console.log(price)

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const res = axiosSecure.post('/create-payment-intent',{price:price} )
        .then(res => {
            // console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
    },[axiosSecure, price])

    const handleSubmit = async(e) => { 
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);
        if(card === null){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            console.log('Payment Error', error);
            setError(error.message)
        }
        else{
            console.log('Payment Method',paymentMethod);
            setError('')
        }

        // confirm Payment
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details:{
                    name: user?.displayName || 'Annonumous',
                    email: user?.email || 'Annonumous',

                }
            }
        })
        if(confirmError){
            console.log('Confirm error', confirmError)
        }
        else{
            console.log('Payment Intent', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('Transaction ID : ', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const payment = {
                    name:user.displayName,
                    email: user.email,
                    trainerName: slot.trainerName,
                    trainerEmail: slot.trainerEmail,
                    slotId: slot._id,
                    slotTime: slot.slotTime,
                    packageName: selectedPackage.name,
                    price: price,
                    className:slot.className,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                }
                console.log(payment);

                axiosSecure.post('/payment', payment)
                .then(res => {
                    console.log(res.data)
                    if(res.data.insertedId){
                        
                        axiosSecure.patch(`slot/book/${slot._id}`, {
                            bookedByName: user.displayName,
                            bookedByEmail: user.email
                        })
                        .then(res => {
                            if(res.data.modifiedCount > 0){
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Payment Successful!',
                                    text: 'Slot has been booked.',
                                    timer: 2000,
                                    showConfirmButton: false
                                  });
                                  Navigate('/bookedTrainer')
                            }
                        })
                    }
                })

            }
        }

        
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                className='bg-[#90e0ef]/10  border-2 border-[#90e0ef]/50 rounded-md shadow-lg p-4 '
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
                }} />
            <button  type="submit" disabled={!stripe || !clientSecret} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}  className="btn  bg-[#95d5b2] hover:bg-[#64b5f6] mt-4 hover:text-black ease-in-out duration-700 transition-all transform w-[120px] mx-auto hover:w-[130px]">
                    <span className={`pl-3 duration-500 ${isHover? 'text-base' : ''}`}>Pay </span>
                    <span className={ `transition-all duration-1000 ${isHover? 'opacity-100 translate-x-7 text-lg' : 'opacity-0 -translate-x-24 ' }`}><GrLogin /></span>
            </button>
            <p className='text-red-500 py-2 font-semibold'>{error}</p>
            {
                transactionId && <p className='text-green-500 py-2 font-semibold'>Your Transaction Id : {transactionId}</p>
            }
        </form>
    );
};

export default CheackoutForm;