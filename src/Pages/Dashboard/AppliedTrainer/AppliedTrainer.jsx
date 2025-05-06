import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { IoMdInformationCircle } from 'react-icons/io';
import noDataLottie from '../../../assets/Lottie/noDataFound.json'
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';

const AppliedTrainer = () => {

    const axiosSecure = useAxiosSecure();

    const [selectedApplication, setSelectedApplication] = useState(null);
    const [feedback, setFeedback] = useState(""); 
    const modalRef = useRef();

    const {data: applications = [], refetch} = useQuery({
        queryKey: ['appliedTrainers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applied-trainers');
            return res.data;
        }
    })
    // console.log(applications)

    if(applications.length < 1){
        return <div className=' py-32 flex flex-col justify-center'>
            <h2 className='text-center py-10 font-semibold text-xl'>Applied Trainers </h2>
            <Lottie className='w-56 lg:w-96 mx-auto' animationData={noDataLottie}></Lottie>
        </div>
    }

    const handleMakeTrainer = (id) =>{
        console.log(typeof id)
        axiosSecure.patch(`/applied-trainer/${id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.message === "Trainer Approved Successfully"){
                toast.success('Member has been promoted to Trainer successfully!')
                refetch();
            }
        })
        .catch(err => {
            console.log('Error:', err);
        });
    }

    const handleReject = (application) => {
        console.log(application);
        setSelectedApplication(application);
        modalRef.current.showModal();
    }

    const handleSubmitReject =  () => {
        console.log(feedback);

        axiosSecure.patch(`/applied-trainer/reject/${selectedApplication._id}`, {feedback})
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                toast.success('Application rejected successfully!');
                modalRef.current.close();
                refetch();
            }
            else{
                toast.error('Failed to reject application.');
            }
        })
        .catch(err => {
            console.log("Error : ", err)
        })

    }

    return (
        <div className=''>
            <h2 className='text-center py-10 font-semibold text-xl'>Applied Trainers </h2>
            <div className="overflow-x-auto max-w-full ">
                <table className="table min-w-max w-full">
                    {/* head */}
                    <thead className='bg-black'>
                        <tr className='text-white'>
                            <th>
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Action</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    {
                        applications.map((application , index) => (
                            <tbody key={index}>
                            <tr className='border-2 border-white bg-white bg-opacity-50'>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img  src={application.image} />
                                        </div>
                                    </div>
                                </div>
                                </td>
                                <td> {application.name}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{application.email}</span>
                                </td>
                                <td>
                                    <div className='flex gap-10'> 
                                        <span><FaCheckCircle onClick={()=> handleMakeTrainer(application._id )} className='h-7 w-7 text-green-500 cursor-pointer'></FaCheckCircle></span>
                                        <span><FaTimesCircle onClick={() => handleReject(application)} className='h-7 w-7 text-red-500 cursor-pointer'></FaTimesCircle></span>
                                    </div>
                                </td>
                                <th>
                                    <div>
                                        <IoMdInformationCircle  className='h-7 w-7 cursor-pointer text-yellow-500'></IoMdInformationCircle>
                                    </div>
                                </th>
                            </tr>
                            </tbody>

                            
                        ))
                    }

                    {/* MODAL */}
                    <dialog ref={modalRef} className="modal bg-red-500 bg-opacity-30">
                    <div className="modal-box bg-black opacity-70 text-white border-2">
                        <div className='mx-[20%] h-[20%] bg-black text-center py-2  mb-5 border border-white'>Are you Sure ??</div>
                        <h3 className="font-bold text-lg">Reject {selectedApplication?.name}</h3>
                        <p>Email: {selectedApplication?.email}</p>

                        <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Enter feedback"
                        className="textarea textarea-bordered w-full mt-3 bg-white text-black"
                        ></textarea>

                        <div className="modal-action">
                        <form method="dialog" className='flex gap-10 '>
                            <button onClick={handleSubmitReject} className="btn bg-green-500 border-none text-white hover:text-black duration-500" >Submit</button>
                            <button className="btn bg-red-500 border-none text-black hover:text-white duration-500" onClick={() => modalRef.current.close()}>Cancel</button>
                        </form>
                        </div>
                    </div>
                    </dialog>

                </table>
            </div>
        </div>
    );
};

export default AppliedTrainer;