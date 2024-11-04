import { Route, Routes } from 'react-router-dom';
import './App.css';
import React, { Suspense } from 'react';
import Sidebar from './components/common/Sidebar';
import OverviewPage from './pages/OverviewPage';
import LoadingSpinner from './components/common/LoadingSpinner';

const TrendsPage = React.lazy(() => import('./pages/TrendsPage'));
const AnalyticsPage = React.lazy(() => import('./pages/AnalyticsPage'));
const PopularityPage = React.lazy(() => import('./pages/PopularityPage'));
const EvDetailPage = React.lazy(() => import('./pages/EvDetailPage'));

function App() {


  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      <Sidebar />

      {/* Wrap Routes with Suspense */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/popularity" element={<PopularityPage />} />
          <Route path="/details" element={<EvDetailPage />} />
          <Route path="/trends" element={<TrendsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
