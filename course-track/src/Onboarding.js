import React from 'react';

const Onboarding = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Welcome to CourseTrack</h2>
              <p className="card-text">Follow the instructions below to start managing your courses and assignments!</p>
              <ol>
                <li>Create a new assignment: Click on the "Assignment Dashboard" tab and use the "Add New Assignment" button to create a new assignment.</li>
                <li>View upcoming assignments: Navigate to the "Calendar View" tab to see all your upcoming assignments in a calendar format.</li>
                <li>Receive notifications: Check the "Notification Center" tab for notifications about overdue and upcoming assignments.</li>
              </ol>
              <p className="card-text">Get started now and stay organized with CourseTrack!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
