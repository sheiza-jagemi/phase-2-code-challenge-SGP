// src/components/GoalList.js
import React from 'react';
import GoalItem from './GoalItem';
import './GoalList.css';

const GoalList = ({ 
  goals, 
  activeGoal, 
  onSetActive, 
  onUpdateGoal, 
  onDeleteGoal,
  calculateDaysLeft
}) => {
  return (
    <div className="goal-list">
      <h2>Your Savings Goals</h2>
      
      {goals.length === 0 ? (
        <div className="empty-state">
          <p>No goals yet. Start by adding your first savings goal!</p>
        </div>
      ) : (
        <div className="goals-container">
          {goals.map(goal => (
            <GoalItem 
              key={goal.id}
              goal={goal}
              isActive={activeGoal === goal.id}
              onSetActive={() => onSetActive(goal.id)}
              onUpdateGoal={onUpdateGoal}
              onDeleteGoal={onDeleteGoal}
              calculateDaysLeft={calculateDaysLeft}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalList;