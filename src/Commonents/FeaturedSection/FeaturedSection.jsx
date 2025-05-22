import React from 'react';
import { FaClock, FaUserTie, FaCalendarCheck, FaCreditCard, FaComments, FaNewspaper } from "react-icons/fa";

const FeaturedSection = () => {  

    const features = [
        {
            icon: <FaClock className="text-4xl text-blue-500" />,
            title: "Real-time Progress",
            description: "Track your workouts and nutrition stats live with real-time updates.",
        },
        {
            icon: <FaUserTie className="text-4xl text-green-500" />,
            title: "Expert Trainers",
            description: "Get professional guidance from certified fitness trainers anytime.",
        },
        {
            icon: <FaCalendarCheck className="text-4xl text-purple-500" />,
            title: "Flexible Slot Booking",
            description: "Book your preferred time slots easily to match your schedule.",
        },
        {
            icon: <FaCreditCard className="text-4xl text-yellow-500" />,
            title: "Secure Payments",
            description: "Enjoy fast and safe payments using our integrated Stripe system.",
        },
        {
            icon: <FaComments className="text-4xl text-pink-500" />,
            title: "Community Forum",
            description: "Connect, ask questions, and share stories in our vibrant fitness forum.",
        },
        {
            icon: <FaNewspaper className="text-4xl text-red-500" />,
            title: "Weekly Newsletters",
            description: "Get the latest fitness tips, platform updates, and motivation straight to your inbox.",
        },
    ];


    return (
        <div className="py-20 px-5 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">🌟 Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#90e0ef]/20  border-2 border-[#90e0ef] hover:bg-[#90e0ef]/50 shadow-lg rounded-2xl p-6  hover:shadow-2xl scale-90 transition-all duration-500 text-center"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default FeaturedSection;