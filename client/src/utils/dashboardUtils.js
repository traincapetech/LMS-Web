import { dashboardAPI } from './api';

// Save dashboard data to database
export const saveDashboardData = async (step, data) => {
  try {
    await dashboardAPI.saveDashboardData({
      step,
      data
    });
    
    // Also save to localStorage as backup
    const existingData = JSON.parse(localStorage.getItem('dashboardData') || '{}');
    const updatedData = { ...existingData, ...data };
    localStorage.setItem('dashboardData', JSON.stringify(updatedData));
    
    return { success: true };
  } catch (error) {
    console.error('Failed to save dashboard data:', error);
    return { success: false, error: error.message };
  }
};

// Load dashboard data from database
export const loadDashboardData = async () => {
  try {
    const response = await dashboardAPI.getDashboardData();
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
    return { success: false, error: error.message };
  }
};

// Submit course for review
export const submitCourseForReview = async (courseData) => {
  try {
    await dashboardAPI.submitCourseForReview(courseData);
    return { success: true };
  } catch (error) {
    console.error('Failed to submit course for review:', error);
    return { success: false, error: error.message };
  }
};

// Update specific dashboard step
export const updateDashboardStep = async (step, data) => {
  try {
    await dashboardAPI.updateDashboardStep(step, data);
    return { success: true };
  } catch (error) {
    console.error('Failed to update dashboard step:', error);
    return { success: false, error: error.message };
  }
};
