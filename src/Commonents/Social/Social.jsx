import { FaGoogle } from "react-icons/fa";
import gogoleLogo from '../../assets/logo/google.png'
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const Social = () => {

    const {googleSignIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(res =>{
            console.log(res.user);
            const userInfo = {
                 name : res.user?.displayName,
                 email: res.user?.email,
                 image: res.user?.photoURL,
                 role: 'member',
                 createAt: new Date(),
                 status:'active'
            }
            axiosPublic.post('/user', userInfo)
            .then(res => {
                console.log(res.data);
                navigate('/')
            })
        })
    }

    return (
        <div>
            <div className='divider divider-info mx-5'></div>
            <div className='flex justify-center my-5'>
                <button  
                    onClick={handleGoogleSignIn}
                    className="bg-none border-2 border-orange-400 flex justify-center items-center px-5 py-3 gap-3 rounded-lg  hover:bg-[#90e0ef] hover:border-transparent    duration-500">
                    <img src={gogoleLogo} className="w-6 h-6" alt="" />
                    <span className='font-bold text-black'>Login</span>
                </button>
            </div>
        </div>
    );
};

export default Social;