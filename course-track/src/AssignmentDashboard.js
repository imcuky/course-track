import { useState, useEffect, Fragment, useContext  } from "react";
import Popup from "reactjs-popup";
import TaskCard from "./TaskCard";
import Event from "./EventEmitter";
import { useAssignmentsContext, useEventsContext } from './Context';

const AssignmentDashboard = () => {
  const [newAssignmentTitle, setNewAssignmentTitle] = useState("");
  const [newAssignmentDueDate, setNewAssignmentDueDate] = useState("");
  const [newAssignmentCourse, setNewAssignmentCourse] = useState("");
  const [newAssignmentType, setNewAssignmentType] = useState("");
  const [newAssignmentDetail, setNewAssignmentDetail] = useState("");
  let { assignments, setAssignments } = useAssignmentsContext();
 
  const resetForm = () => {
    setNewAssignmentTitle("");
    setNewAssignmentDueDate("");
    setNewAssignmentCourse("");
    setNewAssignmentType("");
    setNewAssignmentDetail("");
  };

 const handleDueDateChange = (assignmentId, newDueDate) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === assignmentId
          ? { ...assignment, dueDate: newDueDate }
          : assignment
      )
    );
  };

  const handleStatusChange = (assignment) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((a) =>
        a.id === assignment.id ? { ...a, completed: !a.completed } : a
      )
    );
  };

  const handleAddAssignment = () => {
    if (newAssignmentTitle.trim() !== "" && newAssignmentDueDate.trim() !== "") {
      const newAssignment = {
        id: assignments.length + 1,
        title: newAssignmentTitle,
        dueDate: newAssignmentDueDate,
        course: newAssignmentCourse,
        type: newAssignmentType,
        detail: newAssignmentDetail,
        completed: false,
      };
      setAssignments((prevAssignments) => [...prevAssignments, newAssignment]);
  
    }
  };

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

  
  useEffect(() => {
    Event.on("assignmentStatusChanged", handleStatusChange);
    Event.on("assignmentDueDateChanged", handleDueDateChange);
    return () => {
      Event.off("assignmentStatusChanged");
      Event.off("assignmentDueDateChanged");
    };
  }, []);



  return (
    <Fragment>
      <h2>Assignment Dashboard</h2>
      <Popup
        trigger={<button>Add New Assignment</button>}
        modal
        closeOnDocumentClick={false}
      >
        {(close) => (
          <div
            className="popup-content"
            style={{ backgroundColor: "#f0f0f0", padding: "20px" }}
          >
            <h3>Add New Assignment</h3>
            <input
              type="text"
              placeholder="Assignment Title"
              value={newAssignmentTitle}
              onChange={(e) => setNewAssignmentTitle(e.target.value)}
              required
            />{" "}
            <br />
            <input
              type="date"
              value={newAssignmentDueDate}
              onChange={(e) => setNewAssignmentDueDate(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              placeholder="Course"
              value={newAssignmentCourse}
              onChange={(e) => setNewAssignmentCourse(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              placeholder="Task Type"
              value={newAssignmentType}
              onChange={(e) => setNewAssignmentType(e.target.value)}
              required
            />
            <br />
            <textarea
              placeholder="Task Detail"
              value={newAssignmentDetail}
              onChange={(e) => setNewAssignmentDetail(e.target.value)}
            />
            <br />
            <button
              type="submit"
              onClick={() => {
                // Save logic goes here
                handleAddAssignment();
                close();
                resetForm(); // Reset the form after saving
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                close();
                resetForm(); // Reset the form on cancel as well
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </Popup>

      <div className="dashboard-card-container">
        {assignments.map((assignment) => (
          <TaskCard key={assignment.id} assignment={assignment} />
        ))}
      </div>

 
    </Fragment>
  );
};

export default AssignmentDashboard;
