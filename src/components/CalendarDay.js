import React, { useState, useEffect } from 'react';
import './CalendarDay.scss';
import { fetchEventsByDate } from '../services/api';
import ErrorBanner from './ErrorBanner';
import LoadingSpinner from './LoadingSpinner';
import Event from './Event';

const CalendarDay = ({ calendarDate }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch events for the selected date
  // on mount and whenever the date changes
  // keep the calendar in a loading state until the events are fetched
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await fetchEventsByDate(calendarDate);
        setEvents(data || []);
      } catch (error) {
        // Handle the error by displaying an error banner
        setError('Failed to fetch events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [calendarDate]);

  const handleCloseError = () => {
    setError(null);
  };

  const formattedDate = calendarDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Height of each hour block in pixels
  // we are setting this using JS to coordinate the event component height with 
  // the height of the hour blocks. I don't love this and would like to revisit it
  const hourBlockHeight = 60;

  // Filter events for the given hour and map them to Event components
  const getEventsForHour = (hour) => {
    return events
      .filter(event => {
        const eventStartHour = parseInt(event.startTime.split(':')[0], 10);
        return eventStartHour === hour;
      })
      .map((event, index) => {
        return (
          <Event key={index} event={event} hourBlockHeight={hourBlockHeight} />
        );
      });
  };

  // Generate 24 hour blocks for the day
  const generateHourBlocks = () => {
    return Array.from({ length: 24 }, (_, hour) => {
      const eventsForHour = getEventsForHour(hour);
      return (
        <div 
          key={hour} 
          className={`hourBlock ${eventsForHour.length > 0 ? 'scheduled' : ''}`} 
          style={{ height: `${hourBlockHeight}px` }}
        >
          <div className="hourLabel">{`${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`}</div>
          {eventsForHour}
        </div>
      );
    });
  };

  return (
    <div className="calendarDay">
      <div className="header">
        <div className="date">{formattedDate}</div>
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
