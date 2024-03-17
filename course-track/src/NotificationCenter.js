import React from 'react';
import { useAssignmentsContext, useEventsContext } from './Context';

const NotificationCenter = () => {
  const { assignments } = useAssignmentsContext();
  const { events } = useEventsContext();

  // Get assignments due within the next 7 days
  const next7Days = new Date();
  next7Days.setDate(next7Days.getDate() + 7);
  const assignmentsDueNext7Days = assignments.filter(
    (assignment) => new Date(assignment.dueDate) <= next7Days && !assignment.completed
  );

  // Get overdue and incomplete assignments
  const overdueIncompleteAssignments = assignments.filter(
    (assignment) => new Date(assignment.dueDate) < new Date() && !assignment.completed
  );

  // Get upcoming events (within next 7 days)
  const upcomingEvents = events.filter(
    (event) => new Date(event.start) <= next7Days
  );

  return (
    <>
      <h2>NotificationCenter</h2>
      <div className="upcoming-assessments">
        <h3 className="mb-3">Upcoming Assessments (Due Within Next 7 Days)</h3>
        <ul className="list-group mb-4">
          {assignmentsDueNext7Days.map((assignment) => (
            <li key={assignment.id} className="list-group-item">
              {assignment.title} - {new Date(assignment.dueDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>

      {upcomingEvents.length > 0 && (
        <div className="upcoming-events">
          <h3 className="mb-3">Upcoming Events (Within Next 7 Days)</h3>
          <ul className="list-group mb-4">
            {upcomingEvents.map((event) => (
              <li key={event.id} className="list-group-item">
                {event.title} : {event.startTime} - {event.endTime}
              </li>
            ))}
          </ul>
        </div>
      )}

      {overdueIncompleteAssignments.length > 0 && (
        <div className="overdue-incomplete-assignments">
          <h3 className="mb-3">Overdue and Incomplete Assignments</h3>
          <ul className="list-group mb-4">
            {overdueIncompleteAssignments.map((assignment) => (
              <li key={assignment.id} className="list-group-item text-danger">
                {assignment.title} - {new Date(assignment.dueDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default NotificationCenter;
