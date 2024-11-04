import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { ShoppingCart, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { calculateMarketTrendsMetrics } from "../utils/csvDataProcessor";
import YearlyRegistrationsChart from "../components/Trends/YearlyRegistrationsChart";
import GrowthRateChart from "../components/Trends/GrowthRateChart";
import RangeImprovementChart from "../components/Trends/RangeImprovementChart";


const TrendsPage = () => {
	const [marketData, setMarketData] = useState(null);
	useEffect(() => {
		const loadMetrics = async () => {
		  const metrics = await calculateMarketTrendsMetrics();  
		  setMarketData(metrics);
		};
		loadMetrics();
	  }, []);
	
	  if (!marketData) {
		return <div>Loading market trends data...</div>;
	  }
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Trends Dashboard' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* SALES STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>

					<StatCard
						name='Highest Registration'
						icon={ShoppingCart}
						value={marketData.highestRegistration}
						color='#10B981'
					/>
					<StatCard
						name='Top Registration Year'
						icon={TrendingUp}
						value={marketData.highestRegistrationYear}
						color='#F59E0B'
					/>
				</motion.div>

				<YearlyRegistrationsChart data={marketData.yearlyRegistrations} />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
				<GrowthRateChart data={marketData.growthRate} />
				<RangeImprovementChart data={marketData.rangeImprovement} />
				</div>
			</main>
		</div>
	);
};
export default TrendsPage;