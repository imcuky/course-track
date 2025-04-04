import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Popup from "reactjs-popup"; // Import Popup from reactjs-popup
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
	useAssignmentsContext,
	useEventsContext,
	useLocaleContext,
} from "./Context";
import { FormattedMessage, IntlProvider } from "react-intl";
import translations from "./translations/translations.json";
import axios from 'axios';

const CalendarView = () => {
	let { events, setEvents } = useEventsContext();
	const { locale } = useLocaleContext();
	const [selectedSlot, setSelectedSlot] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [popupOpen, setPopupOpen] = useState(false); // State to manage popup open/close

	const { assignments } = useAssignmentsContext();
	const [assignmentEvents, setAssEvents] = useState([]);

	// moment.locale(locale); // TODO: localize calendar
	const localizer = momentLocalizer(moment);

	console.log(locale);	

	useEffect(() => {
		const assignmentEvents = assignments.map((assignment) => ({
			start: moment(assignment.dueDate).toDate(),
			end: moment(assignment.dueDate).toDate(),
			title: assignment.title,
			backgroundColor: "red", // Customize background color for assignment due dates
			allDay: true, // Set events as all-day
			clickable: false, // Make events non-clickable
		}));
		const allEvents = [...events, ...assignmentEvents];
		setAssEvents(assignmentEvents);
	}, [assignments]);

	const handleSelectSlot = ({ start, end }) => {
		setSelectedSlot({ start, end });
		setSelectedEvent(null); // Reset selected event when selecting a slot
		setPopupOpen(true); // Open the popup when a slot is selected
	};

	const handleAddEvent = async (title, startTime, endTime) => {
        const newEvent = {
            start: selectedSlot.start,
            end: selectedSlot.end,
            title,
            startTime,
            endTime,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/events', newEvent);
            setEvents((prevEvents) => [...prevEvents, response.data]);
            setSelectedSlot(null);
            setPopupOpen(false);
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

	const handleSelectEvent = (event) => {
		setSelectedEvent(event);
		setSelectedSlot(null); // Reset selected slot when selecting an event
		setPopupOpen(true); // Open the popup when an event is selected
	};

	const handleEditEvent = async (title, startTime, endTime) => {
        const updatedEvent = {
            ...selectedEvent,
            title,
            startTime,
            endTime,
        };

        try {
            const response = await axios.put(`http://localhost:5000/api/events/${selectedEvent._id}`, updatedEvent);
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event === selectedEvent ? response.data : event
                )
            );
            setSelectedEvent(null);
            setPopupOpen(false);
        } catch (error) {
            console.error('Error editing event:', error);
        }
    };

	const handleDeleteEvent = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${selectedEvent._id}`);
            setEvents((prevEvents) =>
                prevEvents.filter((event) => event !== selectedEvent)
            );
            setSelectedEvent(null);
            setPopupOpen(false);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

	const eventPropGetter = (event) => {
		// Check if the event has a property 'allDay' to determine if it's an assignment
		if (event.allDay) {
			return {
				style: {
					backgroundColor: "#CD5C5C", // Customize background color for assignments
					borderColor: "#CD5C5C", // Customize border color for assignments
					borderRadius: "5px",
					padding: "3px",
				},
				title: `${event.title} (Assignment)`,
				className: "non-clickable-event", // Add a CSS class for assignment events
			};
		} else {
			return {
				style: {
					backgroundColor: event.color || "#1E90FF", // Default background color for events
					borderColor: event.color || "#1E90FF", // Default border color for events
					borderRadius: "5px",
					padding: "3px",
				},
				title: `${event.title}: ${moment(event.startTime).format(
					"h:mm A"
				)} - ${moment(event.endTime).format("h:mm A")}`,
			};
		}
	};

	return (
		<div>
			<h2>
				<FormattedMessage id="calendar_view"></FormattedMessage>
			</h2>
			<Calendar
				localizer={localizer}
				events={[...events, ...assignmentEvents]}
				startAccessor="start"
				endAccessor="end"
				selectable
				onSelectSlot={handleSelectSlot}
				onSelectEvent={handleSelectEvent}
				eventPropGetter={eventPropGetter} // Customize event display
				style={{ height: 500 }}
			/>
			<Popup
				open={popupOpen}
				onClose={() => setPopupOpen(false)}
				contentStyle={{
					maxWidth: "600px",
					padding: "20px",
					borderRadius: "10px",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
					backgroundColor: "#f0f0f0",
				}}
			>
				{/* Render the EventForm component inside the Popup */}
				<EventForm
					selectedDate={selectedSlot ? selectedSlot.start : null}
					selectedEvent={selectedEvent}
					onAddEvent={handleAddEvent}
					onEditEvent={handleEditEvent}
					onDeleteEvent={handleDeleteEvent}
					onCancel={() => setPopupOpen(false)}
				/>
			</Popup>
		</div>
	);
};

const EventForm = ({
	selectedDate,
	selectedEvent,
	onAddEvent,
	onEditEvent,
	onDeleteEvent,
	onCancel,
  }) => {
	const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
	const [startTime, setStartTime] = useState(
	  selectedEvent ? selectedEvent.startTime : ""
	);
	const [endTime, setEndTime] = useState(
	  selectedEvent ? selectedEvent.endTime : ""
	);
  
	const { locale } = useLocaleContext(); // Assuming you have a hook for getting the current locale
	const messages = translations[locale];
  
	const handleSubmit = () => {
	  if (!title.trim() || !startTime || !endTime) {
		// Display error message for incomplete inputs
		alert(messages.fill_all_fields);
		return;
	  }
  
	  if (startTime >= endTime) {
		// Display error message for invalid time range
		alert(messages.end_time_after_start_time);
		return;
	  }
  
	  if (selectedEvent) {
		// Call onEditEvent if editing an event
		onEditEvent(title, startTime, endTime);
		alert(messages.event_edit_succ);
	  } else {
		// Call onAddEvent if adding a new event
		onAddEvent(title, startTime, endTime);
		alert(messages.event_add_succ);
	  }
	};
  
	return (
	  <IntlProvider locale={locale} messages={messages}>
		<div className="container event-form text-center">
		  <h3>
			{selectedEvent ? (
			  <FormattedMessage id="edit_event" />
			) : (
			  <FormattedMessage id="add_event" />
			)}{" "}
			- {selectedDate && moment(selectedDate).format("MMMM Do, YYYY")}
		  </h3>
		  <div className="form-group">
			<input
			  type="text"
			  className="form-control"
			  placeholder={messages.event_title}
			  value={title}
			  onChange={(e) => setTitle(e.target.value)}
			/>
		  </div>
		  <div className="form-group">
			<label>
			  <FormattedMessage id="start_time" />
			</label>
			<input
			  type="time"
			  className="form-control"
			  value={startTime}
			  onChange={(e) => setStartTime(e.target.value)}
			/>
		  </div>
		  <div className="form-group">
			<label>
			  <FormattedMessage id="end_time" />
			</label>
			<input
			  type="time"
			  className="form-control"
			  value={endTime}
			  onChange={(e) => setEndTime(e.target.value)}
			/>
		  </div>
		  <div className="mb-3">
			<button className="btn btn-primary me-2" onClick={handleSubmit}>
			  {selectedEvent ? (
				<FormattedMessage id="update" />
			  ) : (
				<FormattedMessage id="add" />
			  )}{" "}
			  <FormattedMessage id="event" />
			</button>
			{selectedEvent && (
			  <button className="btn btn-danger me-2" onClick={onDeleteEvent}>
				<FormattedMessage id="delete_event" />
			  </button>
			)}
			<button className="btn btn-secondary me-2" onClick={onCancel}>
			  <FormattedMessage id="cancel" />
			</button>
		  </div>
		</div>
	  </IntlProvider>
	);
  };
  

export default CalendarView;
