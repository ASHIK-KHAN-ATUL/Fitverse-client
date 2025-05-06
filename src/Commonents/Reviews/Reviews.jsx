import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './style.css'
import { FreeMode, Pagination } from 'swiper/modules';

const Reviews = () => {

    const axiosPublic = useAxiosPublic();

    const {data:reviews=[]} = useQuery({
        queryKey: ['reviews'],
        queryFn: async() => {
            const res = axiosPublic.get('/review');
            return (await res).data;
        }
    })
    // console.log('Reviews : ',reviews)

    return (
        <div className='py-20 mx-[10%]'> 
            <h2 className='text-center font-bold text-2xl mb-10'>Review Section</h2>
            
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
                breakpoints={{
                    430: {
                        slidesPerView: 2, // 1 slide per view on mobile
                        spaceBetween: 20, // Optional: Adjust space between slides on mobile
                    },
                    1000: {
                        slidesPerView: 3, // 1 slide per view on mobile
                        spaceBetween: 40, // Optional: Adjust space between slides on mobile
                    },
                }}
            >
                {
                    reviews.map((rev, index) => 
                        <SwiperSlide key={index}>
                             <div className="bg-[#90e0ef]/20  border-2 border-[#90e0ef] hover:bg-[#90e0ef]/40   p-5 shadow hover:shadow-lg transition-all duration-300 text-center space-y-4 flex flex-col justify-between w-full h-[320px] overflow-y-auto cursor-pointer">
                               <div className='w-10 h-10 mx-auto '>
                                    <img src={rev.image}  alt={rev.name}  className=" rounded-full w-full h-full object-cover mx-auto"
                                />
                               </div>
                                <h4 className="text-lg font-semibold">{rev.name}</h4>
                                <p className="text-gray-600 text-sm">{rev.review}</p>
                                <div className="text-yellow-500">Rating: ⭐ {rev.rating}</div>
                            </div>
                        </SwiperSlide>)
                }

            </Swiper>


        </div>
    );
};

export default Reviews;