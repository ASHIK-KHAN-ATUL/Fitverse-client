import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Bars } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const AllClass = () => {

    const axiosPublic = useAxiosPublic();
    const [page, setPage] = useState(1);
    const limit = 6;

    const {data={}, isLoading} = useQuery({
        queryKey:['Classes', page],
        queryFn: async()=> {
            const res = await axiosPublic.get(`/class?page=${page}&limit=${limit}`);
            return res.data;
        }
    })

    if (isLoading){
        return <div className="flex justify-center items-center h-screen">
                    <Bars
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        />
                </div>;
    } 

    // console.log('Classes',classes)
    const classes = data.classes || [];
    const total = data.total || 0 ;
    // console.log(total)
    const totalPages = Math.ceil(total / limit);

    return (
        <div className='max-w-7xl mx-auto py-10'>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    classes.map((cls, index)=> 
                    <div key={index} className='bg-[#90e0ef]/20  border-2 border-[#90e0ef] rounded-2xl drop-shadow-lg p-5 '>
                            <img src={cls.image} className='w-full h-60 object-cover rounded-xl' alt="" />
                        <h3 className="text-xl font-semibold mt-3">{cls.className}</h3>
                        <p className='text-sm mt-2'>{cls.details}</p>

                        <div className='mt-4 flex gap-2 items-center'>
                            <p className='text-lg font-semibold'>Trainers : </p>
                            <div className='flex gap-2 mt-2'>
                                {cls.trainers?.map(trainer => (
                                    <Link to={`/trainer/${trainer._id}`} key={trainer._id} title={trainer.name} >
                                        <img src={trainer.image} alt={trainer.name} className='w-10 h-10 rounded-full object-cover border-2 border-white hover:border-blue-600 hover:scale-110 duration-500 transition' />
                                    </Link>
                                ))}
                            </div>
                        </div>


                    </div>
                )}
            </div>

            <div className='flex justify-center items-center mt-8 gap-4'>
                <button
                    onClick={() =>setPage(prev => Math.max(prev -1,1)) }
                    className='px-4 py-2 bg-green-300 rounded hover:bg-green-400 font-semibold'
                > Previous</button>
                <span className='bg-orange-400 h-10 w-10 rounded-full flex justify-center items-center font-bold '>{page}</span>
                <button
                    onClick={() => setPage(prev => prev+1)} 
                    disabled={page >=totalPages}
                    className='px-4 py-2 bg-green-300 rounded hover:bg-green-400 font-semibold'
                >Next</button>
            </div>
        </div>
    );
};

export default AllClass;