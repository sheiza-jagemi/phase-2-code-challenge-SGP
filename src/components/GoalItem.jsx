// src/components/GoalItem.js
import React, { useState } from 'react';
import './GoalItem.css';

const GoalItem = ({ 
  goal, 
  isActive, 
  onSetActive, 
  onUpdateGoal, 
  onDeleteGoal,
  calculateDaysLeft
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: goal.name,
    targetAmount: goal.targetAmount,
    category: goal.category,
    deadline: goal.deadline
  });
  
  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const daysLeft = calculateDaysLeft(goal.deadline);
  
  let status = 'On Track';
  let statusClass = 'status-normal';
  
  if (isCompleted) {
    status = 'Completed!';
    statusClass = 'status-completed';
  } else if (daysLeft < 0) {
    status = 'Overdue!';
    statusClass = 'status-overdue';
  } else if (daysLeft <= 30) {
    status = `Urgent: ${daysLeft} days left`;
    statusClass = 'status-urgent';
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'targetAmount' ? Number(value) : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateGoal(goal.id, formData);
    setIsEditing(false);
  };
  
  return (
    <div 
      className={`goal-item ${isActive ? 'active' : ''}`}
      onClick={() => !isEditing && onSetActive(goal.id)}
    >
      {isEditing ? (
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Goal Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Target Amount ($)</label>
              <input
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="Travel">Travel</option>
                <option value="Emergency">Emergency</option>
                <option value="Electronics">Electronics</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Education">Education</option>
                <option value="Shopping">Shopping</option>
                <option value="Retirement">Retirement</option>
                <option value="Home">Home</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      ) : (
        <>
          <div className="goal-header">
            <h3>{goal.name}</h3>
            <span className={`status ${statusClass}`}>{status}</span>
          </div>
          
          <div className="goal-category">
            <span className="category-tag">{goal.category}</span>
            <span>Target: ${goal.targetAmount.toLocaleString()}</span>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${Math.min(100, progress)}%` }}>
              <span className="progress-text">
                ${goal.savedAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="goal-details">
            <div className="detail-item">
              <span>Saved:</span>
              <strong>${goal.savedAmount.toLocaleString()}</strong>
            </div>
            <div className="detail-item">
              <span>Remaining:</span>
              <strong>${(goal.targetAmount - goal.savedAmount).toLocaleString()}</strong>
            </div>
            <div className="detail-item">
              <span>Deadline:</span>
              <strong>{new Date(goal.deadline).toLocaleDateString()}</strong>
            </div>
          </div>
          
          <div className="goal-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDeleteGoal(goal.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default GoalItem;