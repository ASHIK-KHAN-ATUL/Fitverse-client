import Lottie from 'lottie-react';
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import loginAnimation from '../../assets/Lottie/Login.json'
import { GrLogin } from 'react-icons/gr';
import { AuthContext } from '../../Providers/AuthProvider';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Social from '../../Commonents/Social/Social';

const Login = () => {

    
    const [isHover, setIsHover] = useState(false);

    const {user, login} = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({email, password})

        login(email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            toast.success('Login Successfull')
            navigate(from, {replace: true})
        })
        .catch(error => {
            console.log('Login error', error.message);
            toast.error('Invalid email or password')
        })
    }

    return (
        <div>
            <Helmet>
                <title>Fitverse | Login</title>
            </Helmet>

            <div className="hero  w-full py-20 bg-[#e0fbfc]">
            <div className="hero-content flex flex-col  lg:flex-row w-full">
                <div className="text-center flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold text-orange-500">Login now!</h1>
                    <div className='w-48 hidden lg:block  '>
                        <Lottie className='' animationData={loginAnimation} ></Lottie>
                    </div>
                </div>
                <div className="card bg-[#d8f3dc] w-full max-w-sm shrink-0 shadow-2xl border-2 border-[#95d5b2] shadow-sky-300">
                    <div className="card-body">
                        <form onSubmit={handleLogin} className="fieldset">

                            <label className="fieldset-label text-black font-bold">Email</label>
                            <input type="email" name='email' className="input bg-white text-black " placeholder="Email" />

                            <label className="fieldset-label text-black font-bold">Password</label>
                            <input type="password" name='password' className="input bg-white text-black " placeholder="Password" />

                            <div className='my-3 text-center text-sm'>
                                <p className='text-purple-500'>New Here ? <NavLink className={'text-green-500'} to={'/register'}>Create a New Account</NavLink></p>
                            </div>

                            <button onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}  className="btn  bg-[#95d5b2] hover:bg-[#64b5f6] mt-4 hover:text-black ease-in-out duration-700 transition-all transform w-[35%] mx-auto hover:w-[45%]">
                                <span className={`pl-3 duration-500 ${isHover? 'text-base' : ''}`}>Login </span>
                                <span className={ `transition-all duration-1000 ${isHover? 'opacity-100 translate-x-7 text-lg' : 'opacity-0 -translate-x-24 ' }`}><GrLogin /></span>
                            </button>
                        </form>
                        <Social></Social>
                    </div>
                </div>
            </div>
            </div>

        </div>
    );
};

export default Login;