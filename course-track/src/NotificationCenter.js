import React, { useEffect, useState, useContext  } from 'react';
import Event from "./EventEmitter";
import AssignmentContext from './AssignmentContext';

const NotificationCenter = () => {
  
    let { assignments, setAssignments } = useContext(AssignmentContext);
    // Get assignments due within the next 7 days
    const next7Days = new Date();
    next7Days.setDate(next7Days.getDate() + 7);
    console.log(assignments);
    const assignmentsDueNext7Days = assignments.filter(
        (assignment) => new Date(assignment.dueDate) <= next7Days && !assignment.completed
    );

    // Get overdue and incomplete assignments
    const overdueIncompleteAssignments = assignments.filter(
        (assignment) => new Date(assignment.dueDate) < new Date() && !assignment.completed
    );
    return (
        <>
        <h2>NotificationCenter</h2>
        <div className="upcoming-assessments">
            <h3>Upcoming Assessments (Due Within Next 7 Days)</h3>
            <ul>
            {assignmentsDueNext7Days.map((assignment) => (
                <li key={assignment.id}>
                {assignment.title} - {assignment.dueDate}
                </li>
            ))}
            </ul>
        </div>
        {overdueIncompleteAssignments.length > 0 && (
            <div className="overdue-incomplete-assignments">
            <h3>Overdue and Incomplete Assignments</h3>
            <ul>
                {overdueIncompleteAssignments.map((assignment) => (
                <li key={assignment.id} style={{ color: "red" }}>
                    {assignment.title} - {assignment.dueDate}
                </li>
                ))}
            </ul>
            </div>
        )}
        
        </>
    );
};

export default NotificationCenter;
