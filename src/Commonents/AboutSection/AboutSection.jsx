import React from 'react';
import { FaRunning, FaDumbbell, FaHeart, FaHandsHelping } from "react-icons/fa";
import pic from '../../assets/Banner/banner2.png'
import './AboutSection.css'


const AboutSection = () => {
    return (
        <div className=" about-pic py-5 bg-fixed">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-semibold text-center text-white mb-12">
            About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image Section */}
            <div className="relative">
              <img
                src={pic}
                alt="Fitness"
                className="w-full h-full object-cover rounded-lg shadow-lg brightness-150"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-lg"></div>
            </div>
  
            {/* Right Side - Text Section */}
            <div className="space-y-6">
              <p className="text-lg text-sky-500 font-bold">
              We are a fitness platform offering expert guidance, training programs, and a supportive community to help you reach your goals. Our mission is to make fitness accessible, fun, and sustainable for all. Whether you want to lose weight, gain muscle, or maintain a healthy lifestyle, we provide the resources and support you need. Join us to start your journey to a healthier, happier you.
              </p>
            </div>
          </div>
  
          {/* Our Values Section */}
          <div className="mt-5 text-center">
            <h3 className="text-3xl font-semibold text-white mb-6">Our Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-5">
              <div className="bg-[#90e0ef]/20  border-2 border-[#90e0ef] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <FaRunning className="text-5xl text-blue-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white">Commitment to Fitness</h4>
                <p className="text-sky-500 font-semibold mt-2">We are committed to supporting you every step of the way on your fitness journey.</p>
              </div>
              <div className="bg-[#90e0ef]/20  border-2 border-[#90e0ef] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <FaDumbbell className="text-5xl text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white">Expert Trainers</h4>
                <p className="text-sky-500 font-semibold mt-2">Our certified trainers provide personalized guidance tailored to your fitness goals.</p>
              </div>
              <div className="bg-[#90e0ef]/20  border-2 border-[#90e0ef] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <FaHeart className="text-5xl text-red-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white">Holistic Health</h4>
                <p className="text-sky-500 font-semibold mt-2">We believe in achieving a balance of physical, mental, and emotional well-being.</p>
              </div>
              <div className="bg-[#90e0ef]/20  border-2 border-[#90e0ef] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <FaHandsHelping className="text-5xl text-orange-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white">Community Support</h4>
                <p className="text-sky-500 font-semibold mt-2">Our strong community supports you through challenges and celebrates your achievements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AboutSection;