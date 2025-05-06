import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ManageSlot = () => {

    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const {data:slots=[], refetch} = useQuery({
        queryKey: ['slots', user.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/slot?email=${user?.email}`);
            return res.data;
        }
    })
    // console.log(slots);

    const handleDelteSlot = (id) =>{
        console.log(id);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if(result.isConfirmed){
                axiosSecure.delete(`/slot/${id}`)
                .then(
                    res => {
                        if(res.data.deletedCount > 0){
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your slot has been deleted.',
                                icon: 'success',
                                timer: 2000,
                                showConfirmButton: false
                              });
                              refetch();
                        }
                    })
                    .catch(err => {
                        toast.error('Someting went wrong')
                    })
            }
          })

    }

    return (
        <div className=''>
            <h2 className='text-center py-10 font-semibold text-xl'> MANAGE SLOT </h2>
            <div className="overflow-x-auto  max-w-full ">
            <table className="table min-w-max w-full">
                {/* head */}
                <thead className='bg-black text-center'>
                <tr className='text-white'>
                    <th></th>
                    <th>Slot Name</th>
                    <th>Time</th>
                    <th>Booked By</th>
                    <th>Action</th>
                </tr>
                </thead>
                {
                    slots.map((slot, index) => 
                    <tbody key={index} className='text-center'>
                    <tr className="bg-white bg-opacity-50 border-4 border-white">
                        <th>{index+1}</th>
                        <td>{slot.slotName}</td>
                        <td>{slot.slotTime}-{slot.slotTime + 1}</td>
                        <td>
                            <p>{slot?.bookedByName ? slot?.bookedByName : 'No Booking'}</p><br />
                            <small>{slot?.bookedByEmail}</small>
                        </td>
                        <td>
                            <button 
                            onClick={() => handleDelteSlot(slot._id)}
                            className='text-xl text-red-500'><RiDeleteBin6Line /></button>
                        </td>
                    </tr>
                    </tbody>)
                }
            </table>
            </div>
        </div>
    );
};

export default ManageSlot;