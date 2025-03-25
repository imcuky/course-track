import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';


const AssignmentContext = createContext();

export const AssignmentProvider = ({ children }) => {
    const [assignments, setAssignments] = useState([]);
    const [events, setEvents] = useState([]);
    const [locale, setLocale] = useState("en");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const assignmentResponse = await axios.get('http://localhost:5000/api/assignments');
                setAssignments(assignmentResponse.data);

                const eventResponse = await axios.get('http://localhost:5000/api/events');
                setEvents(eventResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
