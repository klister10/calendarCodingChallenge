import React, { useState, useEffect, useRef } from 'react';
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const hoursContainerRef = useRef(null);
  const hourBlockHeight = 60;

  // Fetch events on mount and when the calendar date changes
  // for now, the calendar date will never change
  useEffect(() => {
    fetchEvents();
  }, [calendarDate]);

  useEffect(() => {
    // Scroll to 9 AM after the component mounts
    if (hoursContainerRef.current) {
      const scrollPosition = hourBlockHeight * 9; // 9 AM is the 10th block (index 9)
      hoursContainerRef.current.scrollTop = scrollPosition;
    }
  }, [loading]);

  // Fetch events for the selected date
  // handle error and loading states
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setEvents([]);
      const data = await fetchEventsByDate(calendarDate);
      const processedEvents = findOverlappingEvents(data || []);
      setEvents(processedEvents);
    } catch (error) {
      setError('Failed to fetch events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // closes the error message when the user clicks the x button
  const handleCloseError = () => {
    setError(null);
  };

  // callback for after the save button is clicked in the input
  // for now, all it does is fetch the updated events
  // this will be called after an add, update, or delete event
  const handleSaveEvent = async () => {
    if (selectedEvent) {
      // clear selected event
      setSelectedEvent(null);
    }
    fetchEvents();
  };

  // callback for when a block is clicked
  // this resets the selected event and sets the selected start time
  const handleBlockClick = (hour) => {
    const formattedHour = hour.toString().padStart(2, '0') + ':00';
    setSelectedEvent(null);
    setSelectedStartTime(formattedHour);
  };

  // sets the hovered block when the mouse is over a block
  // this allows us to apply a hover style 
  // this is done this way instead of using css hover because we don't want to 
  // apply the hover style to blocks when child events are being hovered on
  const handleMouseOverBlock = (hour) => {
    setHoveredBlock(hour);
  };

  const handleMouseLeaveBlock = () => {
    setHoveredBlock(null);
  };

  // prevents the block from being hovered when an event is hovered
  const handleMouseOverEvent = (event) => {
    event.stopPropagation();
    setHoveredBlock(null);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // format the date to be displayed in the header
  const formattedDate = calendarDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // get all events for a given hour
  const getEventsForHour = (hour) => {
    return events
      .filter(event => {
        const eventStartHour = parseInt(event.startTime.split(':')[0], 10);
        return eventStartHour === hour;
      })
      .map((event, index) => {
        // style the events based on the pre-processing we did to find overlapping events
        const totalOverlap = event.totalOverlap;
        const widthPerEvent = (100 - 20 - (totalOverlap - 1) * 5) / totalOverlap; // Subtract 20px for margins and 5px for each gap
        return (
          <Event 
            key={index} 
            event={event} 
            hourBlockHeight={hourBlockHeight}
            style={{
              left: `${10 + (event.position * (widthPerEvent + 5))}%`, // Add margin
              width: `${widthPerEvent}%`
            }}
            onMouseOver={handleMouseOverEvent}
            onMouseLeave={(e) => e.stopPropagation()}
            handleClick={() => handleEventClick(event)}
          />
        );
      });
  };

  // generate the 24 hour blocks for the day
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
          selectedEvent={selectedEvent} 
          onError={setError} 
          setLoading={setLoading}
        />
      </div>
      {error && <ErrorBanner message={error} onClose={handleCloseError} />}
      <div className="hoursContainer" ref={hoursContainerRef} style={{ height: `${hourBlockHeight * 24}px` }}>
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
