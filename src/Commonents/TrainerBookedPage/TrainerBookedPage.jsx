import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const TrainerBookedPage = () => {

    const {slotId} = useParams();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    const {data:slot=[]} = useQuery({
        queryKey: ['slot', slotId],
        queryFn: async() => {
            const res = await axiosPublic.get(`/slot/${slotId}`);
            return res.data;
        }
    });
    // console.log('slot :',slot)

    const packages = [
        {
          name: 'Basic',
          price: 10,
          features: [
            'Access during regular gym hours',
            'Use of cardio equipment',
            'Use of strength training equipment',
            'Locker room access',
            'Email support',
            'Access to community forum'
          ]
        },
        {
          name: 'Standard',
          price: 50,
          features: [
            'All Basic features',
            'Access to all group classes ',
            'Access to weekend workshops',
            'Nutrition plan guidance (PDF only)',
            'Access to monthly fitness webinars',
            'Chat support with certified trainers'
          ]
        },
        {
          name: 'Premium',
          price: 100,
          features: [
            'All Standard features',
            '1-on-1 personal training sessions (4 per month)',
            'Full access to sauna & steam room',
            'Massage therapy discounts',
            'Personalized meal plan',
            'Free gym merchandise (t-shirt, bottle, etc.)',
          ]
        }
      ];



    return (
        <div className='p-8 max-w-4xl mx-auto space-y-6'>
            <h1 className="text-2xl font-bold">Trainer Booking Page</h1>

            <div className='bg-[#90e0ef]/20  border-2 border-[#90e0ef] p-6 rounded-xl drop-shadow-xl text-lg font-semibold'>
                <h3>Trainer Name : {slot.trainerName}</h3>
                <h3>Trainer Email : {slot.trainerEmail}</h3>
            </div>

            <div className='bg-[#90e0ef]/20  border-2 border-[#90e0ef] p-6 rounded-xl drop-shadow-xl '>
                <h3  className="text-xl font-semibold mb-4" >Chose Your Package</h3>
                <div className='grid md:grid-cols-3 gap-5'>
                    {
                        packages.map((pkg, index) => (
                            <div key={index} className='border-2 border-[#90e0ef] p-4 rounded-xl flex flex-col justify-between bg-[#90e0ef]/20 drop-shadow-lg'> 
                                <h4 className='font-bold text-lg'>{pkg.name}</h4>
                                <ul className='text-sm my-3 list-disc list-inside'>
                                    {pkg.features.map((fea, idx) => <li key={idx}>{fea}</li>)}
                                </ul>
                                <p className='flex font-semibold text-lg'>Price : <span className='text-3xl mb-2 text-blue-500'>${pkg.price}</span></p>
                                <button
                                    onClick={() => navigate('/payment', {state:{slot, selectedPackage: pkg}})}
                                    className='btn btn-sm mt-2 bg-[#7dd181] hover:bg-[#42a5f5] rounded-md p-5  w-[50%] hover:scale-110 mx-auto duration-500 transition-all text-white'
                                >Join Now</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default TrainerBookedPage;