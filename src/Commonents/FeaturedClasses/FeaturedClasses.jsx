import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const FeaturedClasses = () => {

    const axiosPublic = useAxiosPublic();

    const {data:FeaturedClasses=[]} = useQuery({
        queryKey:['FeaturedClasses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/featured-classes');
            return res.data ;
        }
    })
    // console.log(FeaturedClasses);

    return (
        <div className='my-20 mx-10'>
            <h2 className='text-3xl text-center font-bold py-8'>🌟 Featured Classes</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5'>
                {
                    FeaturedClasses.map(cls => 
                        <div className='bg-[#90e0ef]/20  border-2 border-[#90e0ef] shadow-lg hover:shadow-xl rounded-2xl overflow-hidden cursor-pointer transition-all duration-300' key={cls._id}>
                            <img className='w-full h-52 object-cover' src={cls.image} alt="" />
                            <div  className="p-5 space-y-2">
                                <h3 className="text-xl font-semibold text-blue-600">{cls.className}</h3>
                                <p className="text-black text-sm">{cls.details}</p>
                                <p className="text-sm font-medium text-red-500">🔥 {cls.bookingCount} {cls.bookingCount <= 1 ? 'time' : 'times'}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FeaturedClasses;