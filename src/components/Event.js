import React from 'react';
import './Event.scss';

const Event = ({ event, hourBlockHeight, style }) => {
  const eventStartHour = parseInt(event.startTime.split(':')[0], 10);
  const eventEndHour = parseInt(event.endTime.split(':')[0], 10);
  const eventDuration = eventEndHour - eventStartHour;

  return (
    <div 
      className="event" 
      style={{ 
        height: `${eventDuration * hourBlockHeight}px`,
        ...style
      }}
    >
      <span className="eventTitle">{event.name}</span>
    </div>
  );
};

export default Event;
