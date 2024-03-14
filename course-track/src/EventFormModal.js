// EventFormModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const EventFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    tags: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      title: '',
      start: '',
      end: '',
      tags: '',
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Add Event</h2>
      <form>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Start:
          <input type="datetime-local" name="start" value={formData.start} onChange={handleChange} />
        </label>
        <label>
          End:
          <input type="datetime-local" name="end" value={formData.end} onChange={handleChange} />
        </label>
        <label>
          Tags:
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
        </label>
        <button type="button" onClick={handleSubmit}>Add Event</button>
      </form>
    </Modal>
  );
};

export default EventFormModal;
