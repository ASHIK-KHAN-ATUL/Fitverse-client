import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import useTrainer from "../Hooks/useTrainer";
import useMember from "../Hooks/useMember";



const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isTrainer] = useTrainer();
    const [isMember] = useMember();
    // console.log({'admin:':isAdmin })
    // console.log({'trainer:':isTrainer })
    // console.log({'member:':isMember })

    return (

        <div className="w-full flex bg-[#e3f2fd] text-black">

            {/* Dashboard Side bar */}
            <div className="w-[25%] bg-[#64b5f6] min-h-screen">
                <div className="flex flex-col gap-5 mt-10">
                    <p className="text-center font-bold text-lg border-b-2 border-purple-500 pb-3">Fitverse</p>

                  <div className="">

                    {
                        isAdmin && 

                    <ul className="dashNav flex flex-col gap-5 font-medium  text-base px-2">
                        <NavLink to={'/dashboard/profile'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">Profile</li></NavLink>
                        
                        <NavLink to={'/dashboard/addNewClass'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">Add new class</li>
                        </NavLink>

                        <NavLink to={'/dashboard/allNewsletter'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">News Letter</li>
                        </NavLink>

                        <NavLink to={'/dashboard/allTrainer'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">All Trainer</li>
                        </NavLink>

                        <NavLink to={'/dashboard/appliedTrainer'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">Applied Trainer</li>
                        </NavLink>

                        <NavLink to={'/dashboard/balance'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">Balance</li>
                        </NavLink>

                        <NavLink to={'/dashboard/addNewForum'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">Add New Forum</li>
                        </NavLink>
                    </ul>
                    }

                    {
                        isTrainer && 
                    <ul className="dashNav flex flex-col gap-5 font-medium text-base px-2">
                        <NavLink to={'/dashboard/profile'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">Profile</li></NavLink> 

                        <NavLink to={'/dashboard/manageSlot'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">Manage Slot</li></NavLink>  

                        <NavLink to={'/dashboard/addNewSlot'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">Add New Slot</li></NavLink>    

                        <NavLink to={'/dashboard/addNewForum'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">Add New Forum</li></NavLink>                     
                    </ul>
                    }


                    {
                        isMember &&
                    <ul className="dashNav flex flex-col gap-5 font-medium text-base px-2">

                        <NavLink to={'/dashboard/profile'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">Profile</li></NavLink> 

                        <NavLink to={'/dashboard/activity'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">Activity</li></NavLink>      

                        <NavLink to={'/dashboard/bookedTrainer'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">Booked trainer</li></NavLink>     

                        <NavLink to={'/dashboard/beTrainer'}><li className="hover:bg-[#2196f3] py-2 duration-500 cursor-pointer pl-2 md:pl-7 rounded-md">Be Trainer</li></NavLink>                       
                    </ul>
                    }

                    <div className="divider divider-success"></div>


                    {/* Shared dashboard side Navbar */}
                    <ul className="dashNav flex flex-col gap-5 font-medium text-base px-2">
                        <NavLink to={'/'}><li className="hover:bg-[#2196f3] py-2  duration-500 cursor-pointer pl-2 md:pl-7 rounded-md ">Home</li></NavLink>

                        <NavLink to={'/allClass'}><li className="hover:bg-[#2196f3] py-2  duration-500 cursor-pointer pl-2 md:pl-7 rounded-md ">Classes</li></NavLink>

                        <NavLink to={'/trainers'}><li className="hover:bg-[#2196f3] py-2  duration-500 cursor-pointer pl-2 md:pl-7 rounded-md ">Trainers</li></NavLink>

                        <NavLink to={'/community'}><li className="hover:bg-[#2196f3] py-2  duration-500 cursor-pointer pl-2 md:pl-7 rounded-md ">Community</li></NavLink>
                        
                    </ul>
                  </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="w-[75%]">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;