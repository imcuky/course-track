import React, { createContext, useContext, useState } from "react";

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
			title: "Write Essay for English Class",
			dueDate: "2024-03-15",
			course: "English",
			type: "Essay",
			detail: "",
			completed: false,
		},
		{
			id: 4,
			title: "Study for History Test",
			dueDate: "2024-03-17",
			course: "History",
			type: "Study",
			detail: "",
			completed: false,
		},
	]);

	const [events, setEvents] = useState([]);
	const [locale, setLocale] = useState("en");

	return (
		<AssignmentContext.Provider
			value={{
				assignments,
				setAssignments,
				events,
				setEvents,
				locale,
				setLocale,
			}}
		>
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

export const useLocaleContext = () => {
	const { locale, setLocale } = useContext(AssignmentContext);
	return { locale, setLocale };
};

export default AssignmentContext;
