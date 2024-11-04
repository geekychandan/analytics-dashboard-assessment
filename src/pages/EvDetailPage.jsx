import Header from "../components/common/Header";
import EvDetailTable from "../components/EvDetails/EvDetailTable";

const EvDetailPage= () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
		<Header title='Details Dashboard' />

		<main className='max-w-8xl mx-auto py-6 px-4 lg:px-8'>
			<EvDetailTable/>
		</main>
	</div>
	);
};
export default EvDetailPage;