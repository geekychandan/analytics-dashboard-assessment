import { CalculatorIcon, Clock,  } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { useEffect, useState } from "react";
import { calculateVehiclePerformanceMetrics } from "../utils/csvDataProcessor";
import EvPriceDistribution from "../components/analytics/EvPriceDistribution";
import TopModelsHorizontalBar from "../components/analytics/TopModelsHorizontalBar";
import RangeDistributionComposedChart from "../components/analytics/RangeDistributionComposedChart";


const AnalyticsPage = () => {
    const [vehicleData, setVehicleData] = useState(null);

    useEffect(() => {
        const loadMetrics = async () => {
            const metrics = await calculateVehiclePerformanceMetrics();
            setVehicleData(metrics);
        };
        loadMetrics();
    }, []);

    if (!vehicleData) {
        return <div>Loading vehicle performance data...</div>;
    }
	return (
		<div className='flex-1 relative z-10 overflow-auto'>
			<Header title={"Orders"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Mean Range' icon={CalculatorIcon} value={vehicleData.descriptiveStats.meanRange} color='#6366F1' />
					<StatCard name='Median Range' icon={Clock} value={vehicleData.descriptiveStats.medianRange} color='#F59E0B' />
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                    <TopModelsHorizontalBar data={vehicleData.topModelsRange}/>
					<EvPriceDistribution data={vehicleData.evPriceDistribution}/>
                    <RangeDistributionComposedChart data={vehicleData.rangeDistribution}/>
				</div>

			</main>
		</div>
	);
};
export default AnalyticsPage;
