import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { toast } from 'react-toastify';

const NewsletterSection = () => {

    const axiosPublic = useAxiosPublic();

    const handleSubscribe = async(e) => {

        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;

        const subscriber = { name, email };
        console.log(subscriber)

        axiosPublic.post('/news-letter', subscriber)
        .then(res => {
            console.log(res.data)
            toast.success('Successdully Connect');
            form.reset();
        })
    }


    return (

        <div className='w-[90%] bg-[#90e0ef]/20  border-2 border-[#90e0ef] hover:bg-[#90e0ef]/40 mx-auto h-40 mt-10  mb-52 relative flex justify-center rounded-2xl' >
            <h2 className='absolute top-5 text-2xl font-bold'>Connect With Us</h2>
            <div className='absolute top-20 bg-[#b7e4c7]/60   border border-[#95d5b2] 
             w-[90%] rounded-xl animate-pulse '>
                <form onSubmit={handleSubscribe} className='flex justify-center w-full'>
                    <div className="fieldset  mx-auto w-full py-5">

                        <div className=' mx-[10%]'>
                            <label className="fieldset-label text-black font-bold ">Name</label>
                                <input type="text"  name='name' className="input bg-white text-black w-full" placeholder="Enter Your Name" />
                        </div>
                        <div className=' mx-[10%]'>
                            <label className="fieldset-label text-black font-bold">Email</label>
                                <input type="email"  name='email' className="input bg-white text-black w-full " placeholder="Enter Your Email" />
                        </div>

                        <div className="w-full md:w-auto flex items-end">
                            <button type="submit" className="bg-[#00b4d8] hover:bg-[#0077b6] text-white font-bold py-2 px-6 rounded mx-auto mt-3">
                                Subscribe Now
                            </button>
                        </div>

                    </div>
                </form>
             </div>
        </div>
    );
};

export default NewsletterSection;