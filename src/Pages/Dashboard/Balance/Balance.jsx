import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import CountUp from 'react-countup';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Balance = () => {

    const axiosSecure = useAxiosSecure();
    
    const {data: payments=[]} = useQuery({
        queryKey: ['payments'],
        queryFn: async() => {
            const res = await axiosSecure.get('/admin-payments');
            return res.data;
        }
    })
    // console.log(payments)

    const {data: subscribers=[]} = useQuery({
        queryKey: ['subscribers'],
        queryFn: async() => {
            const res = await axiosSecure.get('/news-letter');
            return res.data;
        }
    })

    const totalBalance = payments.reduce((sum, payment)=> sum + payment.price, 0);
    const lastSixTransactions = payments.slice(-6).reverse();

    // console.log(totalBalance)
    // console.log('Last 6 :',lastSixTransactions)

    const chartData = [
        { name: 'Newsletter Subscribers', value: subscribers.length},
        { name: 'Paid Members', value: payments.length },
      ];



    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
        };
        const basicCount = payments.filter(p => p.packageName === 'Basic').length
        const standardCount = payments.filter(p => p.packageName === 'Standard').length;
        const premiumCount = payments.filter(p => p.packageName === 'Premium').length;
        // console.log(basicCount, standardCount, premiumCount);
        const pieChartData = [
            { name: 'Basic', value: basicCount },
            { name: 'Standard', value: standardCount },
            { name: 'Premium', value: premiumCount }
        ]
    


    return (
        <div className="py-14 max-w-6xl mx-auto">
            <h2  className="text-xl font-bold  text-center mb-14 border-b-4 border-blue-400 w-[60%] mx-auto">Admin Balance Overview</h2>

            <div className="bg-[#90e0ef]/20  border-2 border-[#90e0ef] shadow-lg p-5 rounded-lg  flex justify-between md:mx-10 mb-20">
                <h3 className="text-xl font-semibold">Total  Balance :</h3>
                <p className="text-xl font-bold text-green-600">$ <CountUp start={0} end={totalBalance.toFixed(2)}></CountUp></p>
            </div>


            <div className="overflow-x-auto max-w-full md:mx-10">
                <h2 className='ml-3 text-xl font-semibold mt-5 mb-3'>Last 6 Transactions</h2>
                <table className="table min-w-max w-full text-center">
                    {/* head */}
                    <thead className='bg-black'>
                    <tr className='text-white'>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    {
                        lastSixTransactions.map((item, index) => 
                            <tbody key={index}>
                            <tr  className='border-2 border-white bg-white bg-opacity-50'>
                                <th>{index+1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.date}</td>
                            </tr>
                            </tbody>
                        )
                    }
                </table>
            </div>

            <section className='flex flex-col xl:flex-row justify-evenly'>
                <div>
                    <h2 className='mt-20 mb-3 font-medium ml-10'>Comparison of Paid Members and Newsletter Subscribers</h2>
                    <div className='  overflow-scroll flex justify-center'>
                    <BarChart width={430} height={250} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                    </div>
                </div>


                <div>
                    <h2 className="mt-20 font-medium ml-10">Package Distribution: Basic, Standard, Premium</h2>
                    <div className=" overflow-scroll flex justify-center">
                    <PieChart width={400} height={250}>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend></Legend>
                    </PieChart>
                    </div>
                </div>

            </section>


        </div>
    );
};

export default Balance;