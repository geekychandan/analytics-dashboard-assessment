// src/components/RangeDistributionBoxPlot.js
import { motion } from "framer-motion";
import { Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line, ComposedChart, Legend } from "recharts";

const RangeDistributionComposedChart = ({ data }) => {
    // Convert data to a format suitable for the box plot
    // Assuming `data` is structured as [{ range: "0-50", min: 5, q1: 15, median: 25, q3: 35, max: 45 }]
    const formattedData = data.map(item => ({
        range: item.range,
        min: item.min,
        q1: item.q1,
        median: item.median,
        q3: item.q3,
        max: item.max,
    }));
	// console.log(formattedData);
	

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <h2 className='text-lg font-medium mb-4 text-gray-100'>Range Distribution</h2>

            <div className='h-80'>
                <ResponsiveContainer>
                    <ComposedChart data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                        <XAxis dataKey="range" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
						<Legend />
                        
                        {/* Max and Min lines for the whiskers */}
                        <Line type="monotone" dataKey="min" stroke="#8884d8" dot={false} />
                        <Line type="monotone" dataKey="max" stroke="#8884d8" dot={false} />

                        {/* Bars for the interquartile range */}
                        <Bar dataKey="q1" stackId="a" fill="#6366F1" />
                        <Bar dataKey="q3" stackId="a" fill="#8B5CF6" />

                        {/* Median line */}
                        <Line type="monotone" dataKey="median" stroke="#EC4899" dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default RangeDistributionComposedChart;
