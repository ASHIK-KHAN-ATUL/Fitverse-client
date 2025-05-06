import { useState } from "react";
import { useForm } from "react-hook-form";
import { GrLogin } from "react-icons/gr";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddNewForum = () => {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const [isHover, setIsHover] = useState(false);
    const {user} = useAuth();
    const [isAdmin] = useAdmin();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const onSubmit = async(data) => {

        const formData = new FormData();
        formData.append('image', data.image[0])
        const res = await fetch(image_hosting_api,{
            method: "POST",
            body: formData
        })
        const result = await res.json();
        console.log(result)

        if(result.success){
            const photoURL = result.data.display_url;

            const forumInfo = {
                authorName: user.displayName,
                authorEmail: user.email,
                authorRole: isAdmin? 'admin':'trainer',
                authorPhoto: user.photoURL,
                postDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric'}),
                postTime : new Date().toLocaleTimeString('en-US', { hour: '2-digit',  minute: '2-digit', second: '2-digit'  }),
                postImage: photoURL,
                postDetails : data.details,
                postTitle : data.title,
                upvoteCount: 0, 
                downvoteCount: 0 
            }

            // console.log(forumInfo);

            axiosSecure.post('/forum', forumInfo)
            .then(res => {
                if(res.data.insertedId){
                    console.log('Forum post added to database');
                    toast.success('Forum Post Successfully Done');
                    reset();
                    navigate('/')
                }
            })
        }
    }


    return (
    <div className="mt-20">
        <h2 className='text-center py-10 font-semibold text-xl'>Add New Forum</h2>
        <div className='flex justify-center '>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body  bg-[#b7e4c7] mx-2 rounded-lg shadow-lg">
                <div  className="fieldset">

                    <div className='w-full'>
                        <label className="fieldset-label text-black font-bold my-2">Title</label>
                        <input type="text" {...register("title",{ required: true })} name='title' className="input bg-white text-black w-full " placeholder="Title" />
                        {errors.title && <span className='text-red-500 '>Class Name is required</span>}
                    </div>

                    <div>
                        <label className="fieldset-label text-black font-bold my-2">Image</label>
                        <input type="file" {...register("image", { required: true })} name="image" accept="image/*" className="file-input bg-white text-black  w-full" />
                        {errors.image && <span className='text-red-500'>Image is required</span>}
                    </div>
                            
                    <div>
                        <label className="fieldset-label text-black font-bold my-2">Details</label>
                        <input type="text" {...register("details" , { required: true })} name='details' className="input bg-white text-black w-full" placeholder="details" />
                        {errors.details && <span className='text-red-500 '>Details is required</span>}
                    </div>

                    <button type='submit' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}  className="btn  bg-[#95d5b2] hover:bg-[#64b5f6] mt-4 hover:text-black ease-in-out duration-700 transition-all transform w-[30%] mx-auto hover:w-[45%]">
                        <span className={`pl-3 duration-500 ${isHover? 'text-base' : ''}`}>Submit</span>
                        <span className={ `transition-all duration-1000 ${isHover? 'opacity-100 translate-x-4 text-lg' : 'opacity-0 -translate-x-28 ' }`}><GrLogin /></span>
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
};

export default AddNewForum;