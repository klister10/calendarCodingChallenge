// Dummy events data
const dummyEvents = [
  {
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    name: 'Morning Meeting',
  },
  {
    date: new Date(),
    startTime: '11:00',
    endTime: '12:00',
    name: 'Project Update',
  },
  {
    date: new Date(),
    startTime: '14:00',
    endTime: '15:00',
    name: 'Client Call',
  },
  {
    date: new Date(),
    startTime: '16:00',
    endTime: '17:00',
    name: 'Team Sync-up',
  },
];

export async function fetchEventsByDate(calendarDate) {
  console.log("fetching calendar events for date:", calendarDate, ". returning mock data");
  try {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return dummyEvents;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error; // Re-throw the error to propagate it, so that CalendarDay can handle it
  }
}
