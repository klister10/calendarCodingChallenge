import React, { useState, useEffect } from 'react';
import './CalendarDay.scss';
import { fetchEventsByDate } from '../services/api';
import ErrorBanner from './ErrorBanner';
import LoadingSpinner from './LoadingSpinner';

const CalendarDay = ({ calendarDate }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await fetchEventsByDate(calendarDate);
        setEvents(data || []);
      } catch (error) {
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

  const getEventForHour = (hour) => {
    return events.filter((event) => {
      const eventHour = parseInt(event.startTime.split(':')[0], 10);
      return eventHour === hour;
    })
    .map((event, index) => (
      <div key={index} className="eventName">
        {event.name}
      </div>
    ));
  }

  const generateHourBlocks = () => {
    return Array.from({ length: 24 }, (_, hour) => (
      <div key={hour} className="hourBlock">
        <div className="hourLabel">{`${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`}</div>
        {getEventForHour(hour)}
      </div>
    ))
  }

  return (
    <div className="calendarDay">
      <div className="header">
        <div className="date">{formattedDate}</div>
      </div>
      {error && <ErrorBanner message={error} onClose={handleCloseError} />}
      <div className="hoursContainer">
        {loading &&
          <LoadingSpinner />
        }  
        {!loading &&
          generateHourBlocks()
        }
      </div>
    </div>
  );
};

export default CalendarDay;
