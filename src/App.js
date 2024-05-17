import { useState } from 'react';
import './App.scss';
import CalendarDay from './components/CalendarDay';

function App() {
  //NOTE: selecting date is currently out of scope
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="App">
      <CalendarDay calendarDate={selectedDate}/>
    </div>
  );
}

export default App;
