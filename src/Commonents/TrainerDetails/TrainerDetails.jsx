import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { GrLogin } from 'react-icons/gr';
import { toast } from 'react-toastify';

const TrainerDetails = () => {

    const {id} = useParams();
    const axiosPublic = useAxiosPublic();
    const [hoveredSlotId, setHoveredSlotId] = useState(null);
    const navigate = useNavigate();

    const {data:trainer} = useQuery({
        queryKey: ['trainer', id],
        queryFn: async() => {
            const res = await axiosPublic.get(`/trainer/${id}`);
            return res.data;
        }
    })
    // console.log(trainer);

    const {data:slots} = useQuery({
        queryKey: ['slots', trainer?._id],
        queryFn: async() => {
            const res = await axiosPublic.get(`/slots/${trainer?._id}`);
            return res.data;
        }
    })
    // console.log('Slots',slots);

    const handleSlotClick = (id) => {
        console.log(id);
        navigate(`/trainerBooked/${id}`)
    }


    return (
        <div >
            <div  className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
            {/* traner inforfation */}
            <div className='bg-[#90e0ef]/20  border-2 border-[#90e0ef] p-5 flex justify-center items-center flex-col w-[90%] sm:w-[75%] md:w-full mx-auto rounded-xl drop-shadow-xl  '>

                    <img src={trainer?.image} alt="" className='object-cover rounded-lg' />

                <h2 className='py-5 font-semibold text-xl'>{trainer?.name}</h2>
                <div className='text-start flex flex-col gap-3'>
                    <h3 className=''>{trainer?.email}</h3>
                    <div>
                        <ul className='list-disc list-inside'>Skills :
                            {trainer?.skills.map((skill, index)=>
                            <li className='ml-5' key={index}>{skill}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
            {/* slots */}
            <div className='bg-[#90e0ef]/20  border-2 border-[#90e0ef] p-5 flex justify-evenly items-center flex-col w-[80%] md:w-full mx-auto rounded-xl drop-shadow-xl'>

            <h2 className="text-xl font-bold py-5">Available Slots</h2>

            <div className="flex  flex-col w-full ">
                {slots?.length > 0 ? (
                slots.map((slot) => (
                    <button 
                        onMouseEnter={() => setHoveredSlotId(slot._id)} onMouseLeave={() => setHoveredSlotId(null)}
                        key={slot._id}
                        onClick={() => {
                            if(!slot.booked){
                                handleSlotClick(slot._id)
                            }else{
                                toast.error('Slot is already Booked')
                            }
                        }}
                        className={`btn  mt-4 min-h-max w-[80%] hover:w-[90%] ease-in-out duration-700 transition-all transform mx-auto ${slot.booked ? 'bg-red-400 text-white cursor-not-allowed' : 'bg-[#95d5b2] hover:bg-[#64b5f6]  hover:text-black  '}`} >
                        <span className={`pl-3 duration-500 ${hoveredSlotId === slot._id? 'text-base' : ''}`}>{slot.className} | {slot.slotName} | ({slot.slotTime}:00)</span>
                        
                        <span className={ `transition-all duration-1000 ${hoveredSlotId === slot._id? 'opacity-100 translate-x-4 text-lg' : 'opacity-0 -translate-x-28 ' }`}><GrLogin /></span>
                    </button>
                    ))
                ) : (
                <p className="text-red-500 text-center">No slots Yet</p>
                )}
            </div>

            </div>

            
            </div>
        </div>
    );
};

export default TrainerDetails;