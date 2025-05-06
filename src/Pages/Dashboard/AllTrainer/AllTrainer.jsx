import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllTrainer = () => {


    const axiosSecure = useAxiosSecure();

    const {data :trainers=[], refetch} = useQuery({
        queryKey: ['trainer'],
        queryFn: async() => {
            const res = await axiosSecure.get('/admin/allTrainers')
            return res.data;
        }
    })
    // console.log(trainers);

    const handleTrunMember = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Convert to Member from Trainer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
          }).then((result) => {
            console.log(id);
            if (result.isConfirmed) {

                axiosSecure.patch(`/trainer/${id}`)
                .then(res => {
                    console.log(res.data)
                    if(res.data.modifiedCount > 0){
                        Swal.fire({
                            title: "Trainer Became Member Now",
                            text: "Successfully Done",
                            icon: "success"
                          });
                        refetch();
                    }
                })
            }

          });
    } 

    return (
        <div className=''>
            <h2 className='text-center py-10 font-semibold text-xl'>ALL TRAINER </h2>
            <div className="overflow-x-auto  max-w-full ">
            <table className="table min-w-max w-full">
                {/* head */}
                <thead className='bg-black text-center'>
                <tr className='text-white'>
                    <th></th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                </tr>
                </thead>
                {
                    trainers.map((trainer, index) => 
                    <tbody key={index} className='text-center'>
                    <tr className="bg-white bg-opacity-50 border-4 border-white">
                        <th>{index+1}</th>
                        <td>{trainer.name}</td>
                        <td>
                            <button onClick={()=> handleTrunMember(trainer._id)} className='btn bg-[#90caf9] hover:bg-[#42a5f5] duration-500 border-none text-black'>
                                {trainer.role}
                            </button>
                        </td>
                        <td>{trainer.email}</td>
                    </tr>
                    </tbody>)
                }
            </table>
            </div>
        </div>
    );
};

export default AllTrainer;