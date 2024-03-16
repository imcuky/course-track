import React, { createContext, useContext, useState } from 'react';

const AssignmentContext = createContext();

export const AssignmentProvider = ({ children }) => {
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Complete Math Homework', dueDate: '2024-03-10', completed: false },
    { id: 2, title: 'Read Chapter 5 of Biology Book', dueDate: '2024-03-12', completed: true },
    { id: 3, title: 'Write Essay on World History', dueDate: '2024-03-15', completed: false }
  ]);

  return (
    <AssignmentContext.Provider value={{ assignments, setAssignments }}>
      {children}
    </AssignmentContext.Provider>
  );
};

export const useAssignmentContext = () => useContext(AssignmentContext);
