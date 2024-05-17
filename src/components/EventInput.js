import React, { useState, useEffect, useRef } from 'react';
import './EventInput.scss';
import { addEvent, updateEvent } from '../services/api';

const EventInput = ({ onSave, defaultStartTime, selectedEvent, onError, setLoading }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [name, setName] = useState('');
  const startTimeInputRef = useRef(null);

  useEffect(() => {
    setStartTime(defaultStartTime);
    if (startTimeInputRef.current) {
      startTimeInputRef.current.focus();
    }
  }, [defaultStartTime]);

  useEffect(() => {
    if (!selectedEvent) {
      setEndTime('');
      setStartTime('');
      setName('');
      return;
    }
    setEndTime(selectedEvent.endTime);
    setStartTime(selectedEvent.startTime);
    setName(selectedEvent.name);
  }, [selectedEvent]);

  useEffect(() => {
    // Unfocus the input on mount
    if (startTimeInputRef.current) {
      startTimeInputRef.current.blur();
    }
  }, []);

  const isValidTime = (time) => {
    const timePattern = /^([01]\d|2[0-3]):00$/;
    return timePattern.test(time);
  };

  const isValidName = (name) => {
    return typeof name === 'string' && name.trim().length > 0;
  };

  const validateInput = () => {
    if (!startTime || !isValidTime(startTime)) {
      onError('Start time must be an exact hour (e.g., 14:00).');
      return false;
    }
    if (!endTime || !isValidTime(endTime)) {
      onError('End time must be an exact hour (e.g., 15:00).');
      return false;
    }
    if (!name || !isValidName(name)) {
      onError('Event name must be a non-empty string.');
      return false;
    }
    const startHour = parseInt(startTime.split(':')[0], 10);
    const endHour = parseInt(endTime.split(':')[0], 10);
    if (endHour <= startHour) {
      onError('End time must be after start time.');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (validateInput()) {
      const newEvent = { startTime, endTime, name };
      try {
        setLoading(true);
        if(selectedEvent) {
          // Update the event
          await updateEvent(selectedEvent.id, newEvent); // Assuming updateEvent is a function in the API
          // setSelectedEvent(null);
        } else {
          await addEvent(newEvent);
        }
        onSave(newEvent);
        setStartTime('');
        setEndTime('');
        setName('');
      } catch (error) {
        console.log("Error saving event:", error);
        onError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTimeChange = (setter) => (e) => {
    const value = e.target.value;
    const [hours, minutes] = value.split(':');
    if (minutes !== '00') {
      setter(`${hours.padStart(2, '0')}:00`);
    } else {
      setter(value);
    }
  };

  return (
    <div className="eventInput">
      <input 
        className="timeInput"
        type="time" 
        value={startTime} 
        onChange={handleTimeChange(setStartTime)}
        step="3600" 
        placeholder="Start Time"
        ref={startTimeInputRef}
      />
      <input 
        className="timeInput"
        type="time" 
        value={endTime} 
        onChange={handleTimeChange(setEndTime)}
        step="3600" 
        placeholder="End Time"
      />
      <input 
        className="nameInput"
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Event Name"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EventInput;
