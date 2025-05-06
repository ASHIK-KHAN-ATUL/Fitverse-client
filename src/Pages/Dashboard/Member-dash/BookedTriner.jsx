import React, { useRef, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { GrLogin } from 'react-icons/gr';
import { Rating } from '@smastrom/react-rating';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const BookedTriner = () => {

    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [hoverIndex, setHoverIndex] = useState(null);
    const [review, setreview] = useState(""); 
    const modalRef = useRef();
    const [rating, setRating] = useState(5);
    const navigate = useNavigate();

    const {data: booking=[]} = useQuery({
        queryKey: ['booking', user.email],
        enabled:!!user?.email,
        queryFn: async() => {
            const res = await axiosSecure.get(`/payment?email=${user?.email}`)
            return res.data
        }
    })


    const handleReview = () => {
        modalRef.current.showModal();
    }

    const handleSubmit = async () => {
        if(!review.trim() || rating<1 || rating>5){
            toast.error("Please provide valid feedback and a rating between 1 and 5.");
            return;
        }

        const reviewData = {
            email: user?.email,
            name: user?.displayName,
            image: user?.photoURL,
            review,
            rating,
            date : new Date().toISOString()
        }
        console.log("Review Submitted:", reviewData)

        axiosPublic.post('/review', reviewData)
        .then(res => {
            console.log(res.data);
            if(res.data.insertedId){
                toast.success('Review added successfully');
                setRating('');
                setreview('');
                navigate('/')
            }
            else{
                toast.error('Failed to submit review.');
            }
        })
    }

    return (
        <div className='py-10'>
            <h2  className="text-2xl font-bold text-center mb-4">Trainer Booking Details</h2>
            
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {
                    booking.map((item, index)=> 
                        <div key={index} className=' bg-[#90e0ef]/20  border-2 border-[#90e0ef] p-5 rounded-xl mx-5 flex flex-col justify-evenly'>
                            <h3 className='text-xl font-semibold mb-2 text-center'>{item.trainerName}</h3>
                            <div className='py-4 flex flex-col gap-2'>
                                <p><strong>Trainer Email : </strong>{item.trainerEmail}</p>
                                <p><strong>Class Name : </strong>{item.className}</p>
                                <p><strong>Slot Time : </strong>{item.slotTime}-{item.slotTime + 1}</p>
                                <p><strong>Package : </strong>{item.packageName}</p>
                                <p><strong>Date : </strong>{item.date}</p>
                            </div>

                            <div className='flex justify-center py-3'>
                                <button  onClick={()=> handleReview()} onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)}  className="btn p-0 bg-[#c77dff] hover:bg-[#a7c957]  hover:text-black ease-in-out duration-500 transition-all transform  mx-auto scale-90 hover:scale-100">
                                    <span className={`pl-3 duration-500 `}>Give Review</span>
                                    <span className={ `transition-all duration-500 ${hoverIndex === index ? 'opacity-100 translate-x-0 text-lg' : 'opacity-0 -translate-x-20 ' }`}><GrLogin /></span>
                                </button>
                            </div>


                    {/* MODAL */}
                    <dialog ref={modalRef} className="modal bg-blue-400 bg-opacity-30">
                    <div className="modal-box bg-black opacity-70 text-white border-2">
                        <div className='mx-[20%] h-[20%] bg-black text-center py-2  mb-5 border border-white'>Give A Review</div>

                        <div className='my-3'>
                            <label className='block text-white font-medium mb-1'>Rating (1 to 5) : </label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="input input-bordered w-full bg-white text-black"
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-white font-medium mb-1'> </label>
                            <textarea
                            value={review}
                            required
                            onChange={(e) => setreview(e.target.value)}
                            placeholder="Enter Your Review"
                            className="textarea textarea-bordered w-full mt-3 bg-white text-black"
                            ></textarea>
                        </div>

                        <div className="modal-action">
                        <form method="dialog" className='flex gap-10 '>
                            <button  onClick={() => handleSubmit()} className="btn bg-green-500 border-none text-white hover:text-black duration-500" >Submit</button>
                            <button className="btn bg-red-500 border-none text-black hover:text-white duration-500" onClick={() => modalRef.current.close()}>Cancel</button>
                        </form>
                        </div>
                    </div>
                    </dialog>


                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default BookedTriner;