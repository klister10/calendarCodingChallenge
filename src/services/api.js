// Dummy events data
let sessionEvents = [];

export async function fetchEventsByDate(calendarDate) {
  console.log("fetching calendar events for date:", calendarDate, ". returning mock data");
  try {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate an error by uncommenting the following line
    //throw new Error('Failed to fetch events. Please try again later.');

    return sessionEvents;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error; // Re-throw the error to propagate it, so that CalendarDay can handle it
  }
}

export async function addEvent(event) {
  console.log("saving event:", event, ". just saving locally because call is mocked");
  try {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate an error by uncommenting the following line
    //throw new Error('Failed to fetch events. Please try again later.');

    sessionEvents.push(event);
    return;
  } catch (error) {
    console.error('Error adding calendar event:', error);
    throw error; // Re-throw the error to propagate it, so that CalendarDay can handle it
  }
}
