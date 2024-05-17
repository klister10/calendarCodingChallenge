import React, { useState, useEffect } from 'react';
import './CalendarDay.scss';
import { fetchEventsByDate } from '../services/api';
import ErrorBanner from './ErrorBanner';
import LoadingSpinner from './LoadingSpinner';
import Event from './Event';
import EventInput from './EventInput';
import { findOverlappingEvents } from '../utils/findOverlappingEvents';

const CalendarDay = ({ calendarDate }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [hoveredBlock, setHoveredBlock] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [calendarDate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchEventsByDate(calendarDate);
      const processedEvents = findOverlappingEvents(data || []);
      setEvents(processedEvents);
    } catch (error) {
      setError('Failed to fetch events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleSaveEvent = () => {
    fetchEvents();
  };

  const handleBlockClick = (hour) => {
    const formattedHour = hour.toString().padStart(2, '0') + ':00';
    setSelectedStartTime(formattedHour);
  };

  const handleMouseOverBlock = (hour) => {
    setHoveredBlock(hour);
  };

  const handleMouseLeaveBlock = () => {
    setHoveredBlock(null);
  };

  const handleMouseOverEvent = (event) => {
    event.stopPropagation();
    setHoveredBlock(null);
  };

  const formattedDate = calendarDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const hourBlockHeight = 60;

  const getEventsForHour = (hour) => {
    return events
      .filter(event => {
        const eventStartHour = parseInt(event.startTime.split(':')[0], 10);
        return eventStartHour === hour;
      })
      .map((event, index) => {
        const totalOverlap = event.totalOverlap;
        const widthPerEvent = (100 - 20 - (totalOverlap - 1) * 5) / totalOverlap; // Subtract 20px for margins and 5px for each gap
        return (
          <Event 
            key={index} 
            event={event} 
            hourBlockHeight={hourBlockHeight}
            style={{
              left: `${10 + (event.position * (widthPerEvent + 5))}%`, // Add 10px margin
              width: `${widthPerEvent}%`
            }}
            onMouseOver={handleMouseOverEvent}
            onMouseLeave={(e) => e.stopPropagation()}
          />
        );
      });
  };

  const generateHourBlocks = () => {
    return Array.from({ length: 24 }, (_, hour) => {
      const eventsForHour = getEventsForHour(hour);
      return (
        <div 
          key={hour} 
          className={`hourBlock ${eventsForHour.length > 0 ? 'scheduled' : ''} ${hoveredBlock === hour ? 'hover' : ''}`} 
          style={{ height: `${hourBlockHeight}px` }}
          onClick={() => handleBlockClick(hour)}
          onMouseOver={() => handleMouseOverBlock(hour)}
          onMouseLeave={handleMouseLeaveBlock}
        >
          <div className="hourLabel">{`${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`}</div>
          {eventsForHour}
        </div>
      );
    });
  };

  return (
    <div className="calendarDay" data-testid="calendar-day">
      <div className="header">
        <div className="date">{formattedDate}</div>
        <EventInput 
          onSave={handleSaveEvent} 
          defaultStartTime={selectedStartTime} 
          onError={setError} 
          setLoading={setLoading}
        />
      </div>
      {error && <ErrorBanner message={error} onClose={handleCloseError} />}
      <div className="hoursContainer" style={{ height: `${hourBlockHeight * 24}px` }}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          generateHourBlocks()
        )}
      </div>
    </div>
  );
};

export default CalendarDay;
