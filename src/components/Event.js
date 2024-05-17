import React from 'react';
import './Event.scss';

// Event component to be layered on top of the calendar day
const Event = ({ event, hourBlockHeight, style, onMouseOver, onMouseLeave, handleClick }) => {
  const eventStartHour = parseInt(event.startTime.split(':')[0], 10);
  const eventEndHour = parseInt(event.endTime.split(':')[0], 10);
  const eventDuration = eventEndHour - eventStartHour;

  // prevent the parent block from receiving a click event when the event is clicked
  // also, call the callback passed down from the parent
  const onClick = (event) => {
    event.stopPropagation();
    handleClick();
  }

  return (
    <div 
      className="event" 
      style={{ 
        height: `${eventDuration * hourBlockHeight}px`,
        ...style
      }}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <span className="eventTitle">{event.name}</span>
    </div>
  );
};

export default Event;
