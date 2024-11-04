import { Car, User, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { useEffect, useState } from "react";
import { calculateSummaryMetrics } from "../utils/csvDataProcessor";
import AverageRangeChart from "../components/overview/AverageRangeChart";
import TopCountriesChart from "../components/overview/TopCountriesChart";
import EvDistributionChart from "../components/overview/EvDistributionChart";
import LoadingSpinner from "../components/common/LoadingSpinner";

const OverviewPage = () => {

	const [summaryData, setSummaryData] = useState(null);
	
	useEffect(() => {
		const loadMetrics = async () => {
		  const metrics = await calculateSummaryMetrics();
		  setSummaryData(metrics);
		};
		loadMetrics();
	  }, []);
	
	  if (!summaryData) {
		return <LoadingSpinner />;
	  }
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-3 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Evs' icon={Zap} value={summaryData.totalEVs} color='#6366F1' />
					<StatCard name='Top Range County' icon={User} value={summaryData.highestCountyName} color='#68a346' />
					<StatCard name='Highest Range' icon={Car} value={summaryData.highestCountyRange} color='#d963f1' />
					
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<AverageRangeChart data={summaryData.avgRangeByYear} />
					<EvDistributionChart data={[
              { name: 'BEV', value: summaryData.evTypeCounts.bev },
              { name: 'PHEV', value: summaryData.evTypeCounts.phev },
            ]}/>
					<TopCountriesChart data={summaryData.topCounties}/>
				</div>
			</main>
		</div>
	);
};
export default OverviewPage;