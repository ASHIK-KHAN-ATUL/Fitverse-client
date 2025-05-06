import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth'
import { useForm } from 'react-hook-form';
import { GrLogin } from 'react-icons/gr';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { BallTriangle } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AddNewSlot = () => {

    const {user} = useAuth();
    const [isHover, setIsHover] = useState(false);
    const { register, handleSubmit, reset, setValue, formState: { errors }, } = useForm();
    const [selectedDays, setSelectedDays] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [slotName, setSlotName] = useState('');
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {data:trainer=[]} = useQuery({
        queryKey: ['trainer', user.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/trainer?email=${user.email}`)
            return res.data;
        }
    })
    // console.log('Trainer', trainer)

    const {data: classes=[]} = useQuery({
        queryKey: ['classes'],
        queryFn: async() => {
            const res = await axiosPublic.get('/classes')
            return res.data
        }
    })
    // console.log(classes);

    const getDynamicSlotName = (startHour) => {
        if (startHour === 6) return "Early Bird";
        if (startHour === 7) return "Sunrise Session";
        if (startHour === 8) return "Morning Boost";
        if (startHour === 9) return "Active Hour";
        if (startHour === 10) return "Mid-Morning Power";
        if (startHour === 11) return "Late Morning Flow";
        if (startHour === 12) return "Midday Strength";
        if (startHour === 13) return "Lunchtime Lift";
        if (startHour === 14) return "Afternoon Push";
        if (startHour === 15) return "Power Hour";
        if (startHour === 16) return "Evening Focus";
        if (startHour === 17) return "Sunset Session";
        if (startHour === 18) return "Twilight Workout";
        if (startHour === 19) return "Evening Burn";
        if (startHour === 20) return "Prime Time Sweat";
        if (startHour === 21) return "Night Shift";
        if (startHour === 22) return "Late Night Grind";
        if (startHour === 23) return "End of Day Pump";
        return "Custom Slot";
    };

      const handleStartTimeChange = (e) => {
        const newStartTime = e.target.value;
        setStartTime(newStartTime);
      
        const dynamicSlotName = getDynamicSlotName(parseInt(newStartTime));
        setSlotName(dynamicSlotName);
        setValue('slotName', dynamicSlotName);
      };

      const slotNames = startTime ? getDynamicSlotName(parseInt(startTime)) : "Enter Start Time";

    useEffect(() => {
        if (trainer.availableDays) {
          setSelectedDays(trainer.availableDays);
        }
      }, [trainer.availableDays]);


    const onSubmit = async(data) => {
        const slotInfo = {
            trainerName: data.Name,
            trainerEmail: data.email,
            trainer_id: trainer._id,
            slotTime: parseInt(data.slotTime),
            slotName: data.slotName,
            slotDays: data.slotDays,
            className: data.className,
            isActive: true,
            booked: false,
        }
        console.log(slotInfo);

        axiosSecure.post('/slot', slotInfo)
        .then(res => {
            if(res.data.insertedId){
                toast.success('Slot added successfully');
                navigate('/dashboard/manageSlot')
            }
        })
    }

    if (!trainer || !trainer._id) {
        return <div className="flex justify-center items-center h-screen">
                    <BallTriangle
                            height={100}
                            width={100}
                            radius={5}
                            color="#4fa94d"
                            ariaLabel="ball-triangle-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                    />
        </div>;
      }


    return (

    <div className='flex  flex-col'>
        <h2 className='py-10 text-center font-semibold text-lg'>ADD A NEW SLOT</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body bg-[#b7e4c7] mx-2 rounded-lg shadow-lg">
            <div  className="fieldset">

                <div className='w-full'>
                    <label className="fieldset-label text-black font-bold my-2">Name</label>
                    <input type="text" {...register("Name",{ required: true })} name='Name' className="input bg-white text-black w-full " placeholder="Name" defaultValue={trainer.name} readOnly  />
                 
                </div>

                            
                <div>
                    <label className="fieldset-label text-black font-bold my-2">Email</label>
                    <input type="text" {...register("email" , { required: true })} name='email' className="input bg-white text-black w-full" placeholder="email" defaultValue={trainer.email} readOnly/>
                 
                </div>

                <div className="mb-4">
                    <label className="fieldset-label text-black font-bold my-2">Slot Days</label>
                    <div className="flex gap-2 flex-wrap bg-white p-2 rounded">
                        {trainer.availableDays?.map((day, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-black rounded-full text-sm">
                            {day}
                        </span>
                        ))}
                    </div>

                    <input  type="hidden" {...register("slotDays", { required: true })}  value={JSON.stringify(trainer.availableDays)}
                    />
                </div>


                <div>
                    <label className="fieldset-label text-black font-bold my-2">Slot Time Start</label>
                    <input  min={parseInt(trainer.availableTime?.start)} max={parseInt(trainer.availableTime?.end - 1)}   type="number"  {...register("slotTime", { required: true, })} name="slotTime"  onChange={handleStartTimeChange}  className="input bg-white text-black w-full"  placeholder={`Enter hour between ${trainer.availableTime?.start} and ${trainer.availableTime?.end - 1}`}   />
                    {errors.slotTime && <span className="text-red-500">Slot time must be between {trainer.availableTime.start} and {trainer.availableTime.end - 1}</span>}
                </div>



                <div>
                    <label className="fieldset-label text-black font-bold my-2">Slot Name</label>
                    <input
                    type="text"
                    name="slotName"
                    {...register("slotName",{ required: true })}
                    className="input bg-white text-black w-full"
                    value={slotNames} // Dynamically set the slot name
                    readOnly // Make the slot name read-only, since it's calculated based on time
                    />
                </div>

                <div>
                    <label className="fieldset-label text-black font-bold my-2">Select Class</label>
                    <select {...register("className", { required: true })}  className="input bg-white text-black w-full" name='className'  defaultValue="" >
                        <option value="" disabled>Select a Class</option>
                        {classes.map(cls => (
                        <option key={cls._id} >
                            {cls.className}
                        </option>
                        ))}
                    </select>
                    {errors.className && <span className="text-red-500">Class selection is required</span>}
                </div>




                <button type='submit' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}  className="btn  bg-[#95d5b2] hover:bg-[#64b5f6] mt-4 hover:text-black ease-in-out duration-700 transition-all transform w-[30%] mx-auto hover:w-[45%]">
                    <span className={`pl-3 duration-500 ${isHover? 'text-base' : ''}`}>Submit</span>
                    <span className={ `transition-all duration-1000 ${isHover? 'opacity-100 translate-x-4 text-lg' : 'opacity-0 -translate-x-28 ' }`}><GrLogin /></span>
                </button>
            </div>
        </form>
    </div>
    );
};

export default AddNewSlot;