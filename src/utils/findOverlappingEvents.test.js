import { findOverlappingEvents } from './findOverlappingEvents';

describe('findOverlappingEvents', () => {
  it('should correctly assign positions and totalOverlap to overlapping events', () => {
    const events = [
      { id: 1, startTime: '09:00', endTime: '11:00', name: 'Event 1' },
      { id: 2, startTime: '10:00', endTime: '12:00', name: 'Event 2' },
      { id: 3, startTime: '12:00', endTime: '13:00', name: 'Event 3' },
      { id: 4, startTime: '12:00', endTime: '14:00', name: 'Event 4' },
      { id: 5, startTime: '09:00', endTime: '10:00', name: 'Event 5' },
    ];

    const processedEvents = findOverlappingEvents(events);

    expect(processedEvents).toEqual([
      { id: 1, startTime: '09:00', endTime: '11:00', name: 'Event 1', position: 0, totalOverlap: 3 },
      { id: 2, startTime: '10:00', endTime: '12:00', name: 'Event 2', position: 2, totalOverlap: 3 },
      { id: 3, startTime: '12:00', endTime: '13:00', name: 'Event 3', position: 0, totalOverlap: 2 },
      { id: 4, startTime: '12:00', endTime: '14:00', name: 'Event 4', position: 1, totalOverlap: 2 },
      { id: 5, startTime: '09:00', endTime: '10:00', name: 'Event 5', position: 1, totalOverlap: 3 },
    ]);
  });

  it('should correctly handle non-overlapping events', () => {
    const events = [
      { id: 1, startTime: '09:00', endTime: '10:00', name: 'Event 1' },
      { id: 2, startTime: '10:00', endTime: '11:00', name: 'Event 2' },
      { id: 3, startTime: '11:00', endTime: '12:00', name: 'Event 3' },
    ];

    const processedEvents = findOverlappingEvents(events);

    expect(processedEvents).toEqual([
      { id: 1, startTime: '09:00', endTime: '10:00', name: 'Event 1', position: 0, totalOverlap: 1 },
      { id: 2, startTime: '10:00', endTime: '11:00', name: 'Event 2', position: 0, totalOverlap: 1 },
      { id: 3, startTime: '11:00', endTime: '12:00', name: 'Event 3', position: 0, totalOverlap: 1 },
    ]);
  });
});
