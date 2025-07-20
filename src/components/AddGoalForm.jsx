// src/components/AddGoalForm.js
import React, { useState } from 'react';
import './AddGoalForm.css';

const AddGoalForm = ({ onAddGoal, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: 'Travel',
    deadline: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'targetAmount' ? Number(value) : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.targetAmount || !formData.deadline) return;
    
    onAddGoal(formData);
    setFormData({
      name: '',
      targetAmount: '',
      category: 'Travel',
      deadline: ''
    });
  };
  
  return (
    <div className="add-goal-form">
      <h3>Create New Goal</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Goal Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Vacation to Hawaii"
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
              placeholder="e.g., 5000"
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
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Add Goal</button>
        </div>
      </form>
    </div>
  );
};

export default AddGoalForm;