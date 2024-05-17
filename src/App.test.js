import { render, screen } from '@testing-library/react';
import App from './App';
test('renders calendar component', () => {
  render(<App />);
  const calendarDayElement = screen.getByTestId('calendar-day');
  expect(calendarDayElement).toBeInTheDocument();
});







