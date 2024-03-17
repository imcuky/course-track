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
    {
      id: 7,
      title: "Write Essay on World History",
      dueDate: "2024-03-15",
      course: "History",
      type: "Essay",
      detail: "",
      completed: false,
    },
    {
      id: 8,
      title: "Write Essay on World History",
      dueDate: "2024-03-15",
      course: "History",
      type: "Essay",
      detail: "",
      completed: false,
    },
    {
      id: 9,
      title: "Write Essay on World History",
      dueDate: "2024-03-15",
      course: "History",
      type: "Essay",
      detail: "",
      completed: false,
    },
    {
      id: 10,
      title: "Write Essay on World History",
      dueDate: "2024-03-15",
      course: "History",
      type: "Essay",
      detail: "",
      completed: false,
    },
    {
      id: 11,
      title: "Write Essay on World History",
      dueDate: "2024-03-15",
      course: "History",
      type: "Essay",
      detail: "",
      completed: false,
    },
    {
      id: 12,
      title: "Write Essay on World History",
      dueDate: "2024-03-15",
      course: "History",
      type: "Essay",
      detail: "",
      completed: false,
    },
  ]);



  return (
    <AssignmentContext.Provider value={{ assignments, setAssignments}}>
      {children}
    </AssignmentContext.Provider>
  );
};

export const useAssignmentContext = () => useContext(AssignmentContext);

export default AssignmentContext;