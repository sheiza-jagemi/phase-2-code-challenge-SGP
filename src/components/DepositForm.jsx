// src/components/DepositForm.js
import React, { useState } from 'react';
import './DepositForm.css';

const DepositForm = ({ goals, onDeposit }) => {
  const [selectedGoal, setSelectedGoal] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGoal || !depositAmount || depositAmount <= 0) return;
    
    onDeposit(selectedGoal, depositAmount);
    setDepositAmount('');
  };
  
  return (
    <div className="deposit-form">
      <h3>Make a Deposit</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Goal</label>
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            required
          >
            <option value="">Choose a goal</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>
                {goal.name} (${goal.targetAmount - goal.savedAmount} remaining)
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Amount ($)</label>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Enter amount"
              min="0.01"
              step="0.01"
              required
            />
          </div>
          
          <button type="submit">Add Deposit</button>
        </div>
      </form>
    </div>
  );
};

export default DepositForm;