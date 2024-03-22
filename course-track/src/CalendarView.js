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
import { FormattedMessage } from "react-intl";

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

	const handleAddEvent = (title, startTime, endTime) => {
		const newEvent = {
			start: selectedSlot.start,
			end: selectedSlot.end,
			title,
			startTime,
			endTime,
		};
		setEvents((prevEvents) => [...prevEvents, newEvent]);
		setSelectedSlot(null);
		setPopupOpen(false); // Close the popup after adding the event
	};

	const handleSelectEvent = (event) => {
		setSelectedEvent(event);
		setSelectedSlot(null); // Reset selected slot when selecting an event
		setPopupOpen(true); // Open the popup when an event is selected
	};

	const handleEditEvent = (title, startTime, endTime) => {
		const updatedEvent = {
			...selectedEvent,
			title,
			startTime,
			endTime,
		};
		setEvents((prevEvents) =>
			prevEvents.map((event) =>
				event === selectedEvent ? updatedEvent : event
			)
		);
		setSelectedEvent(null);
		setPopupOpen(false); // Close the popup after editing the event
	};

	const handleDeleteEvent = () => {
		setEvents((prevEvents) =>
			prevEvents.filter((event) => event !== selectedEvent)
		);
		setSelectedEvent(null);
		setPopupOpen(false); // Close the popup after deleting the event
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
	const [title, setTitle] = useState(
		selectedEvent ? selectedEvent.title : ""
	);
	const [startTime, setStartTime] = useState(
		selectedEvent ? selectedEvent.startTime : ""
	);
	const [endTime, setEndTime] = useState(
		selectedEvent ? selectedEvent.endTime : ""
	);

	const handleSubmit = () => {
		if (!title.trim() || !startTime || !endTime) {
			// Display error message for incomplete inputs
			alert(<FormattedMessage id="fill_all_fields"></FormattedMessage>);
			return;
		}

		if (startTime >= endTime) {
			// Display error message for invalid time range
			alert(
				<FormattedMessage id="end_time_after_start_time"></FormattedMessage>
			);
			return;
		}

		if (selectedEvent) {
			// Call onEditEvent if editing an event
			onEditEvent(title, startTime, endTime);
			alert(<FormattedMessage id="event_edit_succ"></FormattedMessage>);
		} else {
			// Call onAddEvent if adding a new event
			onAddEvent(title, startTime, endTime);
			alert(<FormattedMessage id="event_add_succ"></FormattedMessage>);
		}
	};

	return (
		<div className="container event-form text-center">
			<h3>
				{selectedEvent ? (
					<FormattedMessage id="edit_event"></FormattedMessage>
				) : (
					<FormattedMessage id="add_event"></FormattedMessage>
				)}{" "}
				- {selectedDate && moment(selectedDate).format("MMMM Do, YYYY")}
			</h3>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					placeholder="Event Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label>
					<FormattedMessage id="start_time"></FormattedMessage>
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
					<FormattedMessage id="end_time"></FormattedMessage>
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
					{`${
						selectedEvent ? (
							<FormattedMessage id="update"></FormattedMessage>
						) : (
							<FormattedMessage id="add"></FormattedMessage>
						)
					} ${(<FormattedMessage id="event"></FormattedMessage>)}`}
				</button>
				{selectedEvent && (
					<button
						className="btn btn-danger me-2"
						onClick={onDeleteEvent}
					>
						<FormattedMessage id="delete_event"></FormattedMessage>
					</button>
				)}
				<button className="btn btn-secondary me-2" onClick={onCancel}>
					<FormattedMessage id="cancel"></FormattedMessage>
				</button>
			</div>
		</div>
	);
};

export default CalendarView;
