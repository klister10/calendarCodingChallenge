import React from 'react';
import './Event.scss';

const Event = ({ event, hourBlockHeight, style, onMouseOver, onMouseLeave, handleClick }) => {
  const eventStartHour = parseInt(event.startTime.split(':')[0], 10);
  const eventEndHour = parseInt(event.endTime.split(':')[0], 10);
  const eventDuration = eventEndHour - eventStartHour;

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
