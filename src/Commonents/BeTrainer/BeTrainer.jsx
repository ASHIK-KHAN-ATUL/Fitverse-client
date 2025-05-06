import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GrLogin } from 'react-icons/gr';
import useAuth from '../../Hooks/useAuth';
import Select from 'react-select';
import axios from 'axios';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BeTrainer = () => {

        const [isHover, setIsHover] = useState(false);
        const { register, handleSubmit, reset, formState: { errors },control } = useForm();
        const {user} = useAuth();
        const axiosPublic = useAxiosPublic();
        const navigate = useNavigate();

        const skillOptions = [
            { value: 'Yoga', label: 'Yoga' },
            { value: 'Pilates', label: 'Pilates' },
            { value: 'Strength Training', label: 'Strength Training' },
            { value: 'HIIT', label: 'High-Intensity Interval Training (HIIT)' },
            { value: 'CrossFit', label: 'CrossFit' },
            { value: 'Aerobics', label: 'Aerobics' },
            { value: 'Zumba', label: 'Zumba' },
            { value: 'Spinning', label: 'Spinning' },
            { value: 'Calisthenics', label: 'Calisthenics' },
            { value: 'Weightlifting', label: 'Weightlifting' },
            { value: 'Powerlifting', label: 'Powerlifting' },
            { value: 'Bodybuilding', label: 'Bodybuilding' },
            { value: 'Nutrition Coaching', label: 'Nutrition Coaching' },
            { value: 'Youth Fitness', label: 'Youth Fitness' },
            { value: 'Flexibility and Mobility', label: 'Flexibility and Mobility' },
          ];

          const daysOptions = [
            { value: 'Sun', label: 'Sun' },
            { value: 'Mon', label: 'Mon' },
            { value: 'Tues', label: 'Tues' },
            { value: 'Wed', label: 'Wed' },
            { value: 'Thu', label: 'Thu' },
            { value: 'Fri', label: 'Fri' },
            { value: 'Sat', label: 'Sat' },
          ];

         const onSubmit = async(data) =>{
                // console.log(data);

                const trainerData = {
                    name: data.name,
                    email: data.email,
                    age: data.age,
                    image: data.image,
                    skills : data.skills.map(s => s.value),
                    availableDays: data.availableDays.map(d => d.value),
                    availableTime: {
                        start: data.availableStartTime,
                        end: data.availableEndTime
                    },
                    beTrainerStatus: 'pending',
                    appliedAt: new Date(),
                    facebook: data.facebook,
                    instagram: data.instagram
                }

                console.log(trainerData);

                axiosPublic.post('/applied-trainers', trainerData)
                .then(res => {
                    if(res.data.insertedId){
                        console.log('You applied for bacome a trainer');
                        toast.success('You applied for bacome a trainer');
                        reset();
                        navigate('/')
                    }
                })
            }

    return (
        <div className='flex justify-center '>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body  mt-40 bg-[#b7e4c7] mx-2 rounded-lg shadow-lg">
                <div  className="fieldset">

                    <div>
                        <p className='text-center font-bold text-xl'>Be A Trainer</p>
                    </div>

                    <div className='w-full'>
                        <label className="fieldset-label text-black font-bold my-2">Name</label>
                        <input type="text" {...register("name",{ required: true })} name='name' className="input bg-white text-black w-full " placeholder="Name" defaultValue={user.displayName} />
                        {errors.name && <span className='text-red-500 '>Class Name is required</span>}
                    </div>

                    <div className='w-full'>
                        <label className="fieldset-label text-black font-bold my-2">Email</label>
                        <input type="text" {...register("email",{ required: true })} name='email' className="input bg-white text-black w-full " placeholder="email" defaultValue={user.email} readOnly />
                        {errors.email && <span className='text-red-500 '>Class Name is required</span>}
                    </div>

                    <div className='w-full'>
                        <label className="fieldset-label text-black font-bold my-2">Age</label>
                        <input type="number" {...register("age",{ required: true })} name='age' className="input bg-white text-black w-full " placeholder="age"   />
                        {errors.age && <span className='text-red-500 '>Age  is required</span>}
                    </div>

                    <div className='w-full'>
                        <label className="fieldset-label text-black font-bold my-2">Facebook</label>
                        <input type="text" {...register("facebook",{ required: true })} name='facebook' className="input bg-white text-black w-full " placeholder="Facebook link"   />
                        {errors.facebook && <span className='text-red-500 '>Facebook  is required</span>}
                    </div>

                    <div className='w-full'>
                        <label className="fieldset-label text-black font-bold my-2">Instagram</label>
                        <input type="text" {...register("instagram",{ required: true })} name='instagram' className="input bg-white text-black w-full " placeholder="instagram link"   />
                        {errors.instagram && <span className='text-red-500 '>Instagram  is required</span>}
                    </div>

                    <div className='w-full'>
                        <label className="fieldset-label text-black font-bold my-2">Profile Image</label>
                        <input type="text" {...register("image",{ required: true })} name='image' className="input bg-white text-black w-full " placeholder="image"  defaultValue={user.photoURL} readOnly />
                        {errors.image && <span className='text-red-500 '>Image is required</span>}
                    </div>

                    <div className='w-full'>
                        <label className="fieldset-label text-black font-bold my-2">Skill </label>
                        <Controller
                            name="skills"
                            control={control}
                            rules={{
                                validate: (value) => value && value.length > 0 || "At least one skill is required",
                            }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isMulti
                                    options={skillOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={(selected) => field.onChange(selected)}
                                />
                            )}
                        />
                        {errors.skills && (
                            <span className='text-red-500'>{errors.skills.message}</span>
                        )}
                    </div>

                    <div className='w-full'>
                        <label className="fieldset-label text-black font-bold my-2">Available days</label>
                        <Controller
                            name='availableDays'
                            control={control}
                            rules={{required:'Please select at least one day '}}
                            render={({field})=>(
                                <Select
                                    {...field}
                                    isMulti
                                    options={daysOptions}
                                    classNamePrefix={'select'}
                                    onChange={(selected)=> field.onChange(selected)}
                                ></Select>
                            )}
                        ></Controller>
                        {errors.availableDays && (
                             <span className='text-red-500'>{errors.availableDays.message}</span>
                        )}
                    </div>

                    <div className='w-full mb-4 '>
                    <label className="font-bold mb-1 block">Available Time in a Day (24-hour format)</label>                  

                    <div className='flex justify-center gap-5'>
                    {/* Start Time */}
                        <div className="mb-2 w-full">
                            <label className="text-sm block mb-1">Start Time</label>
                            <input
                            type="number"
                            min={1}
                            max={24}
                            {...register("availableStartTime", { required: "Start time is required" })}
                            className="border rounded p-2 w-full bg-sky-100"
                            />
                            {errors.availableStartTime && (
                            <span className='text-red-500'>{errors.availableStartTime.message}</span>
                            )}
                        </div>

                        {/* End Time */}
                        <div className='w-full'>
                            <label className="text-sm block mb-1">End Time</label>
                            <input
                            type="number"
                            min={1}
                            max={24}
                            {...register("availableEndTime", { required: "End time is required" })}
                            className="border rounded p-2 w-full bg-sky-100"
                            />
                            {errors.availableEndTime && (
                            <span className='text-red-500'>{errors.availableEndTime.message}</span>
                            )}
                        </div>
                    </div>
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

export default BeTrainer;