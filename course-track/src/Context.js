import React, { createContext, useContext, useState } from 'react';

const AssignmentContext = createContext();

export const AssignmentProvider = ({ children }) => {
  let [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Complete Math Homework",
      dueDate: "2024-03-10",
      course: "Math",
      type: "Homework",
      detail: "",
      completed: false,
    },
    {
      id: 2,
      title: "Read Chapter 5 of Biology Book",
      dueDate: "2024-03-12",
      course: "Biology",
      type: "Reading",
      detail: "",
      completed: true,
    },
    {
      id: 3,
      title: "Write Essay on World History",
      dueDate: "2024-03-15",
      course: "History",
      type: "Essay",
      detail: "",
      completed: false,
    },
    {
      id: 4,
      title: "Write Essay on World History",
      dueDate: "2024-03-15",
      course: "History",
      type: "Essay",
      detail: "",
      completed: false,
    },
    {
      id: 5,
      title: "Write Essay on World History",
      dueDate: "2024-03-15",
      course: "History",
      type: "Essay",
      detail: "",
      completed: false,
    },
    {
      id: 6,
      title: "Write Essay on World History",
      dueDate: "2024-03-15",
      course: "History",
      type: "Essay",
      detail: "",
      completed: false,
    },

  ]);


  const [events, setEvents] = useState([]);

  return (
    <AssignmentContext.Provider value={{ assignments, setAssignments, events, setEvents}}>
      {children}
    </AssignmentContext.Provider>
  );
};

export const useAssignmentsContext = () => {
  const { assignments, setAssignments } = useContext(AssignmentContext);
  return { assignments, setAssignments };
};

// Custom hook for events
export const useEventsContext = () => {
  const { events, setEvents } = useContext(AssignmentContext);
  return { events, setEvents };
};

export default AssignmentContext;