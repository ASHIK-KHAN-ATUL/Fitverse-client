import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxiosPublic, { axiosPublic } from '../../../Hooks/useAxiosPublic';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Activity = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    console.log(user.email);
    const modalRef = useRef();
    const [selectedFeedback, setSelectedFeedback] = useState('');

    const {data:applications=[]} = useQuery({
        queryKey: ['applications', user.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/appliedForTrainer?email=${user.email}`);
            return res.data;
        }
    })
    console.log("Application data",applications)

    const handleModalOpen = (feedbackText) => {
        if(feedbackText){
            setSelectedFeedback(feedbackText);
        }
        else {
            setSelectedFeedback('NO FEEDBACK AVAILABLE');
        }
        modalRef.current.showModal();
    }

    return (
        <div className='py-10 w-full'>
            <div className="overflow-x-auto rounded-box border border-base-content/5 ">
            <table className="table min-w-max w-full">
                {/* head */}
                <thead className='bg-black text-white'>
                <tr className='text-center'>
                    <th></th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Favorite Color</th>
                </tr>
                </thead>
                {
                    applications.map((application, index)=>
                    <tbody key={index} className='text-center'>
                    {/* row 1 */}
                    <tr className='bg-white bg-opacity-40 border-2 border-white '>
                        <th>{index+1}</th>
                        <td>{application.name}</td>
                        <td className={`${application.beTrainerStatus === 'rejected'  ? 'bg-red-600' : ' bg-orange-500'} font-semibold rounded-full text-white`}>{application.beTrainerStatus}</td>
                        <td>
                            {
                                application.beTrainerStatus === 'rejected' ?

                                (
                                    <button><FaEye onClick={() => handleModalOpen(application?.feedback?.feedback)} className='w-5 h-5' /></button>
                                ) 
                                :
                                (
                                    <button><FaEyeSlash className='w-5 h-5'/></button>
                                )
                            }
                        </td>
                    </tr>


                    {/* MODAL */}
                <dialog ref={modalRef} className="modal bg-sky-500 bg-opacity-30">
                    <div className="modal-box bg-black  text-white border-2 w-screen">
                        <div className='mx-[20%] h-[20%] bg-black text-center py-2  mb-5 border border-red-400 font-semibold'>Feedback From Admin of Fitverse</div>

                        <h3 className='text-white border-4 p-5'>Feedback : {selectedFeedback}</h3>
                        <div className='text-white border-2 p-5 text-start'>
                            <h1>Skills : {
                                application.skills.map(day => 
                                    <li className='ml-10'>{day}</li>
                                )
                            }</h1>
                            <h1>Available Days : {
                                application.availableDays.map(day => 
                                    <li className='ml-10'>{day}</li>
                                )
                            }</h1>

                            <h1>Available Time : 
                                <li className='ml-10'>Start : {application.availableTime.start}</li>
                                <li className='ml-10'>End : {application.availableTime.End}</li>
                            </h1>
                        </div>
                        <div className="modal-action">
                        <form method="dialog" className='flex gap-10 '>
                            <button className="btn bg-red-500 border-none text-white hover:text-black duration-500" onClick={() => modalRef.current.close()}>Close</button>
                        </form>
                        </div>
                    </div>
                    </dialog>
                    </tbody>)   
                }

            </table>
            </div>
        </div>
    );
};

export default Activity;