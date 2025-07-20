import React, { useState, useEffect } from 'react';
import GoalList from './GoalList';
import AddGoalForm from './AddGoalForm';
import Overview from './Overview';
import DepositForm from './DepositForm';
import './GoalDashboard.css';

// Use the proxy path instead of direct URL
const API_URL = "/api/goals";

const GoalDashboard = () => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeGoal, setActiveGoal] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Enhanced fetch function with error handling
  const fetchGoals = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(API_URL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      // First check if response is HTML (wrong endpoint)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        throw new Error('Backend returned HTML. Check if: 1) Backend is running, 2) Endpoint is correct');
      }

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: Expected array of goals');
      }
      
      setGoals(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      
      // Fallback data if API fails
      setGoals([{
        id: 1,
        name: "Example Goal",
        targetAmount: 5000,
        savedAmount: 1200,
        deadline: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        category: "Travel"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new goal
  const addGoal = (newGoal) => {
    setGoals([...goals, { 
      ...newGoal, 
      id: Date.now(),
      savedAmount: 0 
    }]);
    setShowAddForm(false);
  };

  // Update existing goal
  const updateGoal = (id, updatedGoal) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, ...updatedGoal } : goal
    ));
  };

  // Delete goal
  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  // Make deposit to goal
  const makeDeposit = (goalId, amount) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return { 
          ...goal, 
          savedAmount: goal.savedAmount + Number(amount) 
        };
      }
      return goal;
    }));
  };

  // Calculate days until deadline
  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const targetDate = new Date(deadline);
    const diffTime = targetDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your goals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>⚠️ Connection Issue</h3>
        <p>{error}</p>
        <div className="troubleshooting">
          <p>Please check:</p>
          <ol>
            <li>Is the backend server running? (port 3001)</li>
            <li>Does the endpoint exist? (GET /goals)</li>
            <li>Check browser's Network tab for details</li>
          </ol>
        </div>
        <button 
          onClick={fetchGoals}
          className="retry-button"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Overview goals={goals} calculateDaysLeft={calculateDaysLeft} />
      
      <div className="dashboard-actions">
        <button 
          className="add-goal-btn"
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={isLoading}
        >
          {showAddForm ? 'Cancel' : 'Add New Goal'}
        </button>
        <DepositForm goals={goals} onDeposit={makeDeposit} />
      </div>
      
      {showAddForm && (
        <AddGoalForm 
          onAddGoal={addGoal} 
          onCancel={() => setShowAddForm(false)} 
        />
      )}
      
      {goals.length === 0 ? (
        <div className="empty-state">
          <h3>No Goals Found</h3>
          <p>Start by adding your first savings goal!</p>
          <button 
            className="add-goal-btn"
            onClick={() => setShowAddForm(true)}
          >
            Add First Goal
          </button>
        </div>
      ) : (
        <GoalList 
          goals={goals} 
          activeGoal={activeGoal}
          onSetActive={setActiveGoal}
          onUpdateGoal={updateGoal} 
          onDeleteGoal={deleteGoal}
          calculateDaysLeft={calculateDaysLeft}
        />
      )}
    </div>
  );
};

export default GoalDashboard;