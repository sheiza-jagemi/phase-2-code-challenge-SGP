// src/components/Overview.js
import React from 'react';
import './Overview.css';

const Overview = ({ goals, calculateDaysLeft }) => {
  // Calculate statistics
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  
  // Calculate goals that need attention
  const urgentGoals = goals.filter(goal => {
    if (goal.savedAmount >= goal.targetAmount) return false; // Skip completed goals
    const daysLeft = calculateDaysLeft(goal.deadline);
    return daysLeft <= 30 && daysLeft >= 0;
  });
  
  const overdueGoals = goals.filter(goal => {
    if (goal.savedAmount >= goal.targetAmount) return false; // Skip completed goals
    const daysLeft = calculateDaysLeft(goal.deadline);
    return daysLeft < 0;
  });

  // Calculate overall progress
  const overallProgress = Math.min(100, (totalSaved / totalTarget) * 100);

  return (
    <div className="overview">
      <div className="overview-summary">
        <div className="summary-card">
          <h3>Total Goals</h3>
          <p className="highlight">{totalGoals}</p>
        </div>
        <div className="summary-card">
          <h3>Total Saved</h3>
          <p className="highlight">${totalSaved.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Goals Completed</h3>
          <p className="highlight">{completedGoals}</p>
        </div>
        <div className="summary-card">
          <h3>Overall Progress</h3>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <p>{overallProgress.toFixed(1)}%</p>
        </div>
      </div>
      
      {(urgentGoals.length > 0 || overdueGoals.length > 0) && (
        <div className="attention-section">
          {overdueGoals.length > 0 && (
            <div className="attention-card overdue">
              <h3>⚠️ Overdue Goals</h3>
              <ul>
                {overdueGoals.map(goal => (
                  <li key={goal.id}>
                    {goal.name} - <strong>Overdue!</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {urgentGoals.length > 0 && (
            <div className="attention-card urgent">
              <h3>⏳ Urgent Goals (Deadline within 30 days)</h3>
              <ul>
                {urgentGoals.map(goal => {
                  const daysLeft = calculateDaysLeft(goal.deadline);
                  return (
                    <li key={goal.id}>
                      {goal.name} - <strong>{daysLeft} days left</strong>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Overview;