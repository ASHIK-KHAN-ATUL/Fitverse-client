import Lottie from 'lottie-react';
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import RegisterAnimation from '../../assets/Lottie/Register.json'
import { AuthContext } from '../../Providers/AuthProvider';
import { GrLogin } from 'react-icons/gr';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SiAsda } from 'react-icons/si';
import { axiosPublic } from '../../Hooks/useAxiosPublic';
import Social from '../../Commonents/Social/Social';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Reister = () => {

        const [isHover, setIsHover] = useState(false);
    
        const {user, createUser, updateUserProfile} = useContext(AuthContext);

        const { register, handleSubmit, reset, formState: { errors }, } = useForm();

        const navigate = useNavigate();

        const onSubmit = async(data) => {
            console.log(data)

            const formData = new FormData();
            formData.append('image', data.image[0])
            const res = await fetch(image_hosting_api, {
                method: 'POST',
                body: formData
            });

            const result = await res.json();
            console.log(result)

            if(result?.success){
               const photoURL = result.data.display_url;

            //    create user in firebase
            createUser(data.email, data.password)
               .then(result => {
                    const loggedUser = result.user;
                    console.log(loggedUser);    
                    console.log(data.name);    
                    toast.success('Accout created successfully')   
                    
                    
                                //    update name photo 
            updateUserProfile(data.name, photoURL)
            .then(() => {
                console.log('User profile updated');
                reset();
                toast.info('User Data Updated')
                navigate('/')

                // data send in database
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    image: photoURL,
                    role: 'member',
                    createAt: new Date(),
                    status:'active'
                }
                axiosPublic.post('/user', userInfo )
                .then(res =>{
                    if(res.data.insertedId){
                        console.log('User added to database')
                    }
                })
            })
            })


            }
            else{
                toast.error('Something went worng')
            }
        }
    

    return (
        <div>
            <Helmet>
                <title>Fitverse | Register</title>
            </Helmet>

            <div className="hero  w-full py-20 bg-[#e0fbfc]">
            <div className="hero-content flex flex-col  lg:flex-row w-full">
                <div className="text-center flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold text-orange-500">Register now!</h1>
                    <div className='w-48 hidden lg:block  '>
                        <Lottie className='' animationData={RegisterAnimation} ></Lottie>
                    </div>
                </div>
                <div className="card bg-[#d8f3dc] w-full max-w-sm shrink-0 shadow-2xl border-2 border-[#95d5b2] shadow-sky-300">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div  className="fieldset">

                            <div>
                                <label className="fieldset-label text-black font-bold">Name</label>
                                <input type="text" {...register("name" , { required: true })} name='name' className="input bg-white text-black " placeholder="Name" />
                                {errors.name && <span className='text-red-500 '>Name is required</span>}
                            </div>

                            <div>
                                <label className="fieldset-label text-black font-bold">Upload Photo</label>
                                <input type="file" {...register("image", { required: true })} name="image" accept="image/*" className="file-input bg-white text-black" />
                                {errors.image && <span className='text-red-500'>Image is required</span>}
                            </div>
                            
                            <div>
                                <label className="fieldset-label text-black font-bold">Email</label>
                                <input type="email" {...register("email" , { required: true })} name='email' className="input bg-white text-black " placeholder="Email" />
                                {errors.email && <span className='text-red-500 '>Email is required</span>}
                            </div>

                            <div>
                                <label className="fieldset-label text-black font-bold">Password</label>
                                <input type="password" {...register("password" , { 
                                    required: true , 
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                    minLength:6, 
                                    maxLength:20})}
                                    name='password' className="input bg-white text-black " placeholder="Password" />
                                {errors.password?.type ==="required" && <span className='text-red-500 '>Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-500'>Password must be 6 charectoe</span>}
                                {errors.password?.type === 'maxLength' && <span className='text-red-500'>Password must be less than 20 charectoe</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-500'>Min 1: upper case, lower case and number</span>}
                            </div>

                            <div className='my-3 text-center text-sm'>
                                <p className='text-purple-500'>Already Registered ?<NavLink className={'text-green-500'} to={'/login'}> Go to  Login</NavLink></p>
                            </div>


                            <button type='submit' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}  className="btn  bg-[#95d5b2] hover:bg-[#64b5f6] mt-4 hover:text-black ease-in-out duration-700 transition-all transform w-[35%] mx-auto hover:w-[45%]">
                                <span className={`pl-3 duration-500 ${isHover? 'text-base' : ''}`}>Register </span>
                                <span className={ `transition-all duration-1000 ${isHover? 'opacity-100 translate-x-4 text-lg' : 'opacity-0 -translate-x-28 ' }`}><GrLogin /></span>
                            </button>
                        </div>
                    </form>

                    <Social></Social>

                </div>
            </div>
            </div>

        </div>
    );
};

export default Reister;