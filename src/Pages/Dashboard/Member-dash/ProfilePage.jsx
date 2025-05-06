import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';
import { LineWave, TailSpin } from 'react-loader-spinner';

const ProfilePage = () => {

    const {user} = useAuth();
    // console.log(user);

    return (
        <div className="min-h-screen flex justify-center items-center relative">
            <div className="bg-[#64b5f6]/40 backdrop-blur-md p-2 md:p-8 rounded-2xl shadow-lg max-w-md w-full border-4 border-white/40">

                <div className='absolute  w-20 h-14 -top-10 left-0'>
                    <LineWave className='' visible={true}  height="100"  width="100" color="#4fa94d" ariaLabel="line-wave-loading"  wrapperStyle={{}}  wrapperClass=""  firstLineColor=""  middleLineColor="" lastLineColor="" />
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <div className='flex relative w-28 h-28'>
                        <img src={user.photoURL} alt="User Profile" className="w-28 h-28 rounded-full border-4 border-white/30 object-cover absolute top-1 left-1 " />
                        <div className='absolute top-0 left-0'>
                        <TailSpin className=' '
                        visible={true} height="120" width="120"  color="#b7e4c7"  ariaLabel="tail-spin-loading" radius="2"  wrapperStyle={{}} wrapperClass="" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold">{user.displayName}</h2>


                    <div className="border bg-[#64b5f6] bg-opacity-30 p-4 w-full max-w-md mx-auto shadow-md rounded text-xs md:text-base">
                        <div className="flex justify-between border-b py-2">
                            <span className="font-semibold">Email:</span>
                            <span>{user.email}</span>
                        </div>
                        <div className="flex justify-between border-b py-2">
                            <span className="font-semibold">UID:</span>
                            <span>{user.uid}</span>
                        </div>
                        <div className="flex justify-between border-b py-2">
                            <span className="font-semibold">Last Login:</span>
                            <span>{user.metadata?.lastSignInTime}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="font-semibold">Created At:</span>
                            <span>{user.metadata?.creationTime}</span>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default ProfilePage;