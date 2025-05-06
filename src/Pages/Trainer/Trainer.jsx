import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import facebooklogo from '../../assets/logo/facebook144.png'
import instaLogo from '../../assets/logo/instagram144.png'
import { Link } from 'react-router-dom';

const Trainer = () => {

    const axiosPublic = useAxiosPublic();

    const {data: trainers =[]} = useQuery({
        queryKey: ['trainers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/trainers');
            return res.data; 
        }
    })

    // console.log(trainers)

    
    return (
        <div className='py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5'>
            {trainers.map( trainer =>
                <div key={trainer._id} className="card bg-[#bbdefb] w-80 mx-auto border-2 border-blue-300 hover:drop-shadow-sm duration-500 cursor-pointer " style={{boxShadow: '0 4px 30px rgba(59, 130, 246, 0.7)' }}>
                    <figure className="mx-auto mt-5 h-48 w-48">
                        <img
                            src={trainer.image}
                            alt="Shoes"
                            className="rounded-xl object-cover h-40 w-40 cursor-pointer " />
                    </figure>
                    <div className="card-body font-medium flex mx-auto justify-between">
                        <h2 className="card-title mx-auto">{trainer.name}</h2>
                        <div className='text-start'>
                            <p>Age : {trainer?.age}</p>
                        </div>
                        <div className='text-start'>
                            <p>Skills : 
                                <ul className='list-disc ml-5'>
                                    {trainer?.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </p>
                        </div>
                        <div className='py-2 flex justify-start gap-10'>
                            <a href={trainer?.facebook}> <img src={facebooklogo} className='h-10 w-10' alt="" /> </a>
                            <a href={trainer?.instagram}> <img src={instaLogo} className='h-10 w-10' alt="" /> </a>
                        </div>
                        <div className="card-actions mx-auto">
                            <Link to={`/trainer/${trainer._id}`}>
                                <button className="btn btn-primary mx-auto">Know More</button>
                            </Link>
                        </div>
                    </div>
                </div>
             )}
        </div>
    );
};

export default Trainer;