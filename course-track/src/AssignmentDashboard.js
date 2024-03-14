import React, { useState } from 'react';

const AssignmentDashboard = () => {
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [newAssignmentDueDate, setNewAssignmentDueDate] = useState('');
  let [assignments, setAssignments] = useState([
    { id: 1, title: 'Complete Math Homework', dueDate: '2024-03-10', completed: false },
    { id: 2, title: 'Read Chapter 5 of Biology Book', dueDate: '2024-03-12', completed: true },
    { id: 3, title: 'Write Essay on World History', dueDate: '2024-03-15', completed: false }
  ]);

  const handleDueDateChange = (assignmentId, newDueDate) => {
    setAssignments(prevAssignments =>
      prevAssignments.map(assignment =>
        assignment.id === assignmentId ? { ...assignment, dueDate: newDueDate } : assignment
      )
    );
  };

  const handleAddAssignment = () => {
    if (newAssignmentTitle.trim() !== '' && newAssignmentDueDate.trim() !== '') {
      const newAssignment = {
        id: assignments.length + 1,
        title: newAssignmentTitle,
        dueDate: newAssignmentDueDate,
        completed: false
      };
      setAssignments(prevAssignments => [...prevAssignments, newAssignment]);
      setNewAssignmentTitle('');
      setNewAssignmentDueDate('');
    }
  };

  // Get assignments due within the next 7 days
  const next7Days = new Date();
  next7Days.setDate(next7Days.getDate() + 7);
  const assignmentsDueNext7Days = assignments.filter(
    assignment => new Date(assignment.dueDate) <= next7Days && !assignment.completed
  );

  // Get overdue and incomplete assignments
  const overdueIncompleteAssignments = assignments.filter(
    assignment => new Date(assignment.dueDate) < new Date() && !assignment.completed
  );

  return (
    <>
      <h2>Assignment Dashboard</h2>
      <div className="dashboard-container">
        <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Due Date</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map(assignment => (
                <tr key={assignment.id} style={{ backgroundColor: assignment.completed ? 'lightgreen' : '' }}>
                  <td>{assignment.title}</td>
                  <td>
                    <input
                      type="date"
                      value={assignment.dueDate}
                      onChange={e => handleDueDateChange(assignment.id, e.target.value)} />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      id={`completed-${assignment.id}`}
                      checked={assignment.completed}
                      onChange={() =>
                        setAssignments(prevAssignments =>
                          prevAssignments.map(a =>
                            a.id === assignment.id ? { ...a, completed: !a.completed } : a
                          )
                        )
                      }
                    />
                    <label htmlFor={`completed-${assignment.id}`}>Completed</label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="add-assignment-form">
        <h3>Add New Assignment</h3>
        <input
          type="text"
          placeholder="Assignment Title"
          value={newAssignmentTitle}
          onChange={e => setNewAssignmentTitle(e.target.value)} />
        <input
          type="date"
          value={newAssignmentDueDate}
          onChange={e => setNewAssignmentDueDate(e.target.value)} />
        <button onClick={handleAddAssignment}>Add Assignment</button>
      </div>
      <hr />
      {overdueIncompleteAssignments.length > 0 && (
        <div className="overdue-incomplete-assignments">
          <h3>Overdue and Incomplete Assignments</h3>
          <ul>
            {overdueIncompleteAssignments.map(assignment => (
              <li key={assignment.id} style={{ color: 'red' }}>
                {assignment.title} - {assignment.dueDate}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="upcoming-assessments">
        <h3>Upcoming Assessments (Due Within Next 7 Days)</h3>
        <ul>
          {assignmentsDueNext7Days.map(assignment => (
            <li key={assignment.id}>
              {assignment.title} - {assignment.dueDate}
            </li>
          ))}
        </ul>
        
      </div>
      
    </>
  );
}

export default AssignmentDashboard;
