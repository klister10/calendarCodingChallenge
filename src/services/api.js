// Dummy events data
let sessionEvents = [];

// Mock API functions
// These functions simulate API calls by using setTimeout to delay the response


// Fetch events for a given date
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

// Add a new event, for now just save it locally
export async function addEvent(event) {
  console.log("saving event:", event, ". just saving locally because call is mocked");
  try {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate an error by uncommenting the following line
    //throw new Error('Failed to fetch events. Please try again later.');

    event.id = Date.now(); // add a unique ID to the event

    sessionEvents.push(event);
    return;
  } catch (error) {
    console.error('Error adding calendar event:', error);
    throw error; // Re-throw the error to propagate it, so that CalendarDay can handle it
  }
}

// Update an existing event, for now just update it locally
export async function updateEvent(eventId, newEvent) {
  console.log("in updateEvent:", newEvent, ". just updating locally because call is mocked");
  try {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate an error by uncommenting the following line
    //throw new Error('Failed to update event. Please try again later.');

    // replace the event in sessionEvents that has an id which matches eventId with newEvent. 
    // If there is no event in sessionEvents that has a matching id, throw an error
    const index = sessionEvents.findIndex(e => e.id === eventId);
    if (index === -1) {
      throw new Error('Event not found');
    }
    sessionEvents[index] = newEvent;
    return;

  } catch (error) {
    console.error('Error adding calendar event:', error);
    throw error; // Re-throw the error to propagate it, so that CalendarDay can handle it
  }
}

// Delete an event, for now just delete it locally
export async function deleteEvent(eventId) {
  console.log("in deleteEvent:", eventId, ". just deleting locally because call is mocked");
  try {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate an error by uncommenting the following line
    //throw new Error('Failed to delete. Please try again later.');

    // remove the event from sessionEvents that has an id which matches eventId
    sessionEvents = sessionEvents.filter(e => e.id !== eventId);
    return;

  } catch (error) {
    console.error('Error adding calendar event:', error);
    throw error; // Re-throw the error to propagate it, so that CalendarDay can handle it
  }
}
