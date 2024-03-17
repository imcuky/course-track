import React, { useState, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Popup from 'reactjs-popup'; // Import Popup from reactjs-popup
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAssignmentsContext, useEventsContext } from './AssignmentContext';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  
  let { events, setEvents} = useEventsContext();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false); // State to manage popup open/close

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
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setSelectedSlot(null);
    setPopupOpen(false); // Close the popup after adding the event
  };

  const handleSelectEvent = event => {
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
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event === selectedEvent ? updatedEvent : event
      )
    );
    setSelectedEvent(null);
    setPopupOpen(false); // Close the popup after editing the event
  };

  const handleDeleteEvent = () => {
    setEvents(prevEvents =>
      prevEvents.filter(event => event !== selectedEvent)
    );
    setSelectedEvent(null);
    setPopupOpen(false); // Close the popup after deleting the event
  };

  // Function to customize event display in the calendar
  const eventPropGetter = event => {
    return {
      style: {
        backgroundColor: event.color,
        borderColor: event.color,
        borderRadius: '5px',
        padding: '3px',
      },
      title: `${event.title} ${moment(event.start).format('LT')} - ${moment(event.end).format('LT')}`,
    };
  };

  return (
    <div>
      <h2>Calendar View</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventPropGetter} // Customize event display
        style={{ height: 500 }}
      />
      <Popup open={popupOpen} onClose={() => setPopupOpen(false)} contentStyle={{ maxWidth: '600px', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: "#f0f0f0" }}>
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

const EventForm = ({ selectedDate, selectedEvent, onAddEvent, onEditEvent, onDeleteEvent, onCancel }) => {
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [startTime, setStartTime] = useState(selectedEvent ? selectedEvent.startTime : '');
  const [endTime, setEndTime] = useState(selectedEvent ? selectedEvent.endTime : '');

  const handleSubmit = () => {
    if (selectedEvent) {
      onEditEvent(title, startTime, endTime);
    } else {
      onAddEvent(title, startTime, endTime);
    }
  };

  return (
    <div className="event-form" style={{ textAlign: 'center' }}>
      <h3>{selectedEvent ? 'Edit Event' : 'Add Event'} - {selectedDate && moment(selectedDate).format('MMMM Do, YYYY')}</h3>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ marginBottom: '10px' }}
      /> <br/>
      <label>Start time:</label>
      <input
        type="time"
        value={startTime}
        onChange={e => setStartTime(e.target.value)}
        style={{ marginRight: '10px' }}
      /><br/>
      <label>End time:</label>
      <input
        type="time"
        value={endTime}
        onChange={e => setEndTime(e.target.value)}
        style={{ marginRight: '10px' }}
      /><br/>
      <button onClick={handleSubmit}>{selectedEvent ? 'Update' : 'Add'} Event</button>
      {selectedEvent && (
        <button onClick={onDeleteEvent}>Delete Event</button>
      )}
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default CalendarView;
