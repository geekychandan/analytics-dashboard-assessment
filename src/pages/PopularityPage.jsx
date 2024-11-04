import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle,  Package, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { calculateEVPopularityMetrics } from "../utils/csvDataProcessor";
import CountyDistribution from "../components/Popularity/CountyDistribution";

const PopularityPage = () => {

	const [popularityData, setPopularityData] = useState(null);

	useEffect(() => {
	  const loadPopularityMetrics = async () => {
		const metrics = await calculateEVPopularityMetrics();
		// console.log(metrics)
		setPopularityData(metrics);
		
	  };
	  loadPopularityMetrics();
	}, []);
  
	if (!popularityData) {
	  return <div>Loading EV popularity data...</div>;
	}
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Popularity Dashboard' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5  sm:grid-cols-2 lg:grid-cols-3 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Countries' icon={Package} value={popularityData.totalCountries} color='#6366F1' />
					<StatCard
						name='Top Country'
						icon={TrendingUp}
						value={popularityData.highestCounty}
						color='#F59E0B'
					/>
					<StatCard
						name='Highest Count'
						icon={AlertTriangle}
						value={popularityData.highestCount}
						color='#10B981'
					/>

				</motion.div>

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
				<CountyDistribution data={popularityData.countyDistribution} />
				</div>
			</main>
		</div>
	);
};
export default PopularityPage;