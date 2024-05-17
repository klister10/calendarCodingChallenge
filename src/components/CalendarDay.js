import React from 'react';
import './CalendarDay.scss';

const CalendarDay = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="calendarDay">
      <div className="header">
        <div className="date">{today}</div>
      </div>
      <div className="hoursContainer">
        {hours.map((hour) => (
          <div key={hour} className="hourBlock">
            <div className="hourLabel">{`${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;
