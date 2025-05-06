
import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/Home/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Reister/Reister"
import PrivetRoutes from "./PrivetRoutes";
import Trainer from "../Pages/Trainer/Trainer";
import Dashboard from "../Layouts/Dashboard";
import Activity from "../Pages/Dashboard/Member-dash/Activity";
import AddNewClass from "../Pages/Dashboard/AddNewClass/AddNewClass";
import AllClass from "../Pages/AllClass/AllClass";
import AllNewsletter from "../Pages/Dashboard/AllNewsletter/AllNewsletter";
import BookedTriner from "../Pages/Dashboard/Member-dash/BookedTriner";
import AllTrainer from "../Pages/Dashboard/AllTrainer/AllTrainer";
import Balance from "../Pages/Dashboard/Balance/Balance";
import AppliedTrainer from "../Pages/Dashboard/AppliedTrainer/AppliedTrainer";
import ProfilePage from "../Pages/Dashboard/Member-dash/ProfilePage";
import ManageSlot from "../Pages/Dashboard/Trainer-dash/ManageSlot";
import AddNewSlot from "../Pages/Dashboard/Trainer-dash/AddNewSlot";
import BeTrainer from "../Commonents/BeTrainer/BeTrainer";
import TrainerDetails from "../Commonents/TrainerDetails/TrainerDetails";
import TrainerBookedPage from "../Commonents/TrainerBookedPage/TrainerBookedPage";
import Payment from "../Pages/Dashboard/Payment/Payment";
import AdminRoutes from "./AdminRoutes";
import AddNewForum from "../Commonents/AddNewForum/AddNewForum";
import CommunityPosts from "../Commonents/CommunityPosts/CommunityPosts";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'register',
          element: <Register></Register>
        },
        {
          path: 'trainers',
          element: <Trainer></Trainer>
        },
        {
          path: 'allClass',
          element: <AllClass></AllClass>
        },
        {
          path: 'trainer/:id',
          element: <TrainerDetails></TrainerDetails>
        },
        {
          path: 'trainerBooked/:slotId',
          element: <TrainerBookedPage></TrainerBookedPage>
        },
        {
          path: 'payment',
          element: <PrivetRoutes><Payment></Payment></PrivetRoutes>
        },
        {
          path:'community',
          element: <CommunityPosts></CommunityPosts>
        }
      ]
    },
    {
      path:'dashboard',
      element: <PrivetRoutes><Dashboard></Dashboard></PrivetRoutes>,
      children: [
        {
          path: 'bookedTrainer',
          element: <BookedTriner></BookedTriner>
        },
        {
          path: 'activity',
          element: <Activity></Activity>
        },
        {
          path: 'addNewClass',
          element: <AdminRoutes><AddNewClass></AddNewClass></AdminRoutes>
        },
        {
          path: 'allNewsletter',
          element: <AdminRoutes><AllNewsletter></AllNewsletter></AdminRoutes>
        },
        {
          path: 'allTrainer',
          element: <AdminRoutes><AllTrainer></AllTrainer></AdminRoutes>
        },
        {
          path: 'balance',
          element: <AdminRoutes><Balance></Balance></AdminRoutes>
        },
        {
          path: 'appliedTrainer',
          element: <AdminRoutes><AppliedTrainer></AppliedTrainer></AdminRoutes>
        },
        {
          path: 'addNewForum',
          element: <AddNewForum></AddNewForum>
        },
        {
          path: 'profile',
          element: <ProfilePage></ProfilePage>
        },
        {
          path: 'manageSlot',
          element: <ManageSlot></ManageSlot>
        },
        {
          path: 'addNewSlot',
          element: <AddNewSlot></AddNewSlot>
        },
        {
          path: 'beTrainer',
          element: <BeTrainer></BeTrainer>
        }
      ]
    },
    {
      path: '*',
      element: <ErrorPage></ErrorPage>
    }
  ]);