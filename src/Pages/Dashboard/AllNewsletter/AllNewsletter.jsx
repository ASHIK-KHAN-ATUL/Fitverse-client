import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const AllNewsletter = () => {

    const axiosPublic = useAxiosPublic();

    const {data:newsLetter = []} = useQuery({
        queryKey: ['newsLetter'],
        queryFn: async()=> {
            const res = await axiosPublic.get('/news-letter')
            return res.data;
        }
    })
    // console.log(newsLetter);

    return (
        <div>
            <h2 className='text-center py-10 font-semibold text-xl'>All NewsLetters</h2>
            <div className="overflow-x-auto max-w-full">
                <table className="table min-w-max w-full text-center">
                    {/* head */}
                    <thead className='bg-black'>
                    <tr className='text-white'>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    {
                        newsLetter.map((item, index) => 
                            <tbody key={index}>
                            <tr  className='border-2 border-white bg-white bg-opacity-50'>
                                <th>{index+1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                            </tr>
                            </tbody>
                        )
                    }
                </table>
            </div>
        </div>
    );
};

export default AllNewsletter;