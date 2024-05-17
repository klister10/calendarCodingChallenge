// given a list of events, create a graph using those events as nodes
// nodes are connected if the events overlap
// traverse this graph using depth-first search to find sets of overlapping events
export function findOverlappingEvents(events) {
  const eventCount = events.length;
  const adjacencyList = new Map();

  // Initialize the adjacency list
  for (let i = 0; i < eventCount; i++) {
    adjacencyList.set(i, []);
  }

  // Function to check if two events overlap
  const eventsOverlap = (event1, event2) => {
    const start1 = parseInt(event1.startTime.split(':')[0], 10);
    const end1 = parseInt(event1.endTime.split(':')[0], 10);
    const start2 = parseInt(event2.startTime.split(':')[0], 10);
    const end2 = parseInt(event2.endTime.split(':')[0], 10);
    return start1 < end2 && start2 < end1;
  };

  // Build the adjacency list based on overlapping events
  for (let i = 0; i < eventCount; i++) {
    for (let j = i + 1; j < eventCount; j++) {
      if (eventsOverlap(events[i], events[j])) {
        adjacencyList.get(i).push(j);
        adjacencyList.get(j).push(i);
      }
    }
  }

  // Function to find all connected components using DFS
  const visited = new Array(eventCount).fill(false);
  const connectedComponents = [];

  const dfs = (node, component) => {
    visited[node] = true;
    component.push(node);
    for (const neighbor of adjacencyList.get(node)) {
      if (!visited[neighbor]) {
        dfs(neighbor, component);
      }
    }
  };

  for (let i = 0; i < eventCount; i++) {
    if (!visited[i]) {
      const component = [];
      dfs(i, component);
      connectedComponents.push(component);
    }
  }

  // Process each connected component
  connectedComponents.forEach(component => {
    // Sort the component by start time
    component.sort((a, b) => {
      const startA = parseInt(events[a].startTime.split(':')[0], 10);
      const startB = parseInt(events[b].startTime.split(':')[0], 10);
      return startA - startB;
    });

    // Assign positions and total overlaps
    component.forEach((eventIndex, position) => {
      events[eventIndex].position = position;
      events[eventIndex].totalOverlap = component.length;
    });
  });

  return events;
}
