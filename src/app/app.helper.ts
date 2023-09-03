
export function formatWeekday(day: number): string {
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return weekdays[day];
  }

export function formatCurrentDateTime(date: Date): string {
    const hours = date.getHours();
    const nextHour = hours + 1;
    return `${formatHour(hours)} - ${formatHour(nextHour)}`;
  }

export function formatHour(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
  }