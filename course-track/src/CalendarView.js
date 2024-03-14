import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setSelectedEvent(null); // Reset selected event when selecting a slot
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
  };

  const handleSelectEvent = event => {
    setSelectedEvent(event);
    setSelectedSlot(null); // Reset selected slot when selecting an event
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
  };

  const handleDeleteEvent = () => {
    setEvents(prevEvents =>
      prevEvents.filter(event => event !== selectedEvent)
    );
    setSelectedEvent(null);
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
        style={{ height: 500 }}
      />
      {selectedSlot && (
        <EventForm
          selectedDate={selectedSlot ? selectedSlot.start : null}
          onAddEvent={handleAddEvent}
          onCancel={() => setSelectedSlot(null)}
        />
      )}
      {selectedEvent && (
        <EventForm
          selectedDate={selectedEvent.start}
          selectedEvent={selectedEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
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
    <div className="event-form">
      <h3>{selectedEvent ? 'Edit Event' : 'Add Event'} - {selectedDate && moment(selectedDate).format('MMMM Do, YYYY')}</h3>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="time"
        value={startTime}
        onChange={e => setStartTime(e.target.value)}
      />
      <input
        type="time"
        value={endTime}
        onChange={e => setEndTime(e.target.value)}
      />
      <button onClick={handleSubmit}>{selectedEvent ? 'Edit' : 'Add'} Event</button>
      {selectedEvent && (
        <button onClick={onDeleteEvent}>Delete Event</button>
      )}
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default CalendarView;
