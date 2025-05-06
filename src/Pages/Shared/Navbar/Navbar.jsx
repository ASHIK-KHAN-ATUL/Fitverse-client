import React, { useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import { GrLogin } from 'react-icons/gr';
import { toast } from 'react-toastify';

const Navbar = () => {

    const {user, logout} = useContext(AuthContext);
    const [isHover, setIsHover] = useState(false);
    const location = useLocation();
    // console.log(location.pathname);
    

    const handleLogout = () => {
        logout()
        .then(() =>{})
        .catch(error => console.log(error))

        toast.info('Logout Done')
    }

    const navOption  = <>
                        <li><NavLink to={'/'}>Home</NavLink></li>
                        <li><NavLink to={'/allClass'}>Classes</NavLink></li>
                        <li><NavLink to={'/trainers'}>Trainers</NavLink></li>
                        <li><NavLink to={'/community'}>Community</NavLink></li>
                        {
                            user?.email && <li><NavLink to={'/dashboard/profile'}>Dashboard</NavLink></li>
                        }
                        
                    </>


    return (
        <div>
            <div className="navbar shadow-sm   bg-[#42a5f5] bg-opacity-90 text-white max-w-screen-2xl p-0 min-h-10 ">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content  bg-opacity-70 bg-black rounded-box z-1 mt-3 w-52 p-2 shadow-md border-2 border-white font-semibold">
                        {navOption}
                </ul>
                </div>
                <a className=" text-xl ml-5 font-semibold">Fitverse</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOption}
                </ul>
            </div>
            <div className="navbar-end mr-5">
                {
                    user ? 
                    (
                        <div className='flex justify-center items-center gap-2 py-2'>
                            <div className='h-10 w-10 '>
                                <img className='h-full w-full rounded-full object-cover' src={user?.photoURL} alt="" />
                            </div>

                            <button onClick={handleLogout} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}  className="btn p-0 bg-[#f8575a] hover:bg-[#dd0426]  hover:text-black ease-in-out duration-500 transition-all transform  mx-auto scale-75 hover:scale-90">
                                <span className={`pl-3 duration-500 `}>Logout </span>
                                <span className={ `transition-all duration-500 ${isHover? 'opacity-100 translate-x-0 text-lg' : 'opacity-0 -translate-x-20 ' }`}><GrLogin /></span>
                            </button>
                        </div>
                    )
                    :
                    (
                        location.pathname === '/login' ? 
                        (<NavLink to={'/register'}>
                            <button className='btn my-1  bg-[#95d5b2] hover:bg-white  hover:text-black hover:scale-x-105 ease-in-out duration-700 transition-all transform'>Register</button>
                        </NavLink>)
                        :
                        (<NavLink to={'/login'}>
                            <button className='btn my-1  bg-[#95d5b2] hover:bg-white  hover:text-black hover:scale-x-105 ease-in-out duration-700 transition-all transform'>Login</button>
                        </NavLink>)
                    )
                }
            </div>
            </div>
        </div>
    );
};

export default Navbar;