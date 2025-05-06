import { NavLink, useNavigate } from 'react-router-dom';
import NotFound from '../../../assets/Lottie/not found.json'
import Lottie from 'lottie-react';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {

    const [isHover, setIsHover] = useState(false);
    console.log(isHover)
    const navigate = useNavigate();

    const handleClick = () => {
        setTimeout( () => {
            navigate('/')
        },700)
    }

    return (
        <div className='flex flex-col justify-center items-center py-10'>
            <Helmet>
                <title>Fitverse | Error Page</title>
            </Helmet>
            <div  className='w-[60%] mx-auto pt-12'>
                <Lottie animationData={NotFound}></Lottie>
            </div>
            <div className='w-full mx-auto flex justify-center'>
                <button onClick={handleClick} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className={`p-4 bg-red-400 rounded-lg  font-bold hover:bg-green-400 duration-500 flex justify-center items-center ${isHover ? 'px-7': ''} `}> 
                    <span className='pl-5'>Home</span>
                    <span className={`transition-all duration-500 ease-in-out transform  ${isHover ? 'opacity-100 translate-x-5 ' : 'opacity-0 translate-x-0'}`} ><FaArrowRight></FaArrowRight></span>

                </button>
            </div>
        </div>
    );
};

export default ErrorPage;