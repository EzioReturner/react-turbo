import React from 'react';
import ControllerCard from './ControllerCard';
import DistributeCard from './DistributeCard';
import './analysis.scss';

const Dashboard = () => {
  return (
    <div className="analysis">
      <ControllerCard />
      <DistributeCard />
    </div>
  );
};

export default Dashboard;