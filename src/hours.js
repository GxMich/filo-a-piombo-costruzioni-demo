import { DAY_NAMES, HOURS } from './content.js';

const WEEKDAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export function formatTime(minutes) {
  return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;
}

export function romeNow(date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(date)
      .map(({ type, value }) => [type, value]),
  );
  return { day: WEEKDAYS[parts.weekday], minutes: Number(parts.hour) * 60 + Number(parts.minute) };
}

// Restituisce lo stato dell'ufficio secondo gli orari pubblicati.
export function officeStatus(date = new Date()) {
  const { day, minutes } = romeNow(date);
  const current = HOURS[day].find(([start, end]) => minutes >= start && minutes < end);
  if (current) return { open: true, day, label: `Aperto ora, chiude alle ${formatTime(current[1])}` };

  const laterToday = HOURS[day].find(([start]) => start > minutes);
  if (laterToday) return { open: false, day, label: `Chiuso, riapre alle ${formatTime(laterToday[0])}` };

  for (let offset = 1; offset <= 7; offset += 1) {
    const next = (day + offset) % 7;
    if (HOURS[next].length) {
      const when = offset === 1 ? 'domani' : DAY_NAMES[next];
      return { open: false, day, label: `Chiuso, riapre ${when} alle ${formatTime(HOURS[next][0][0])}` };
    }
  }
  return { open: false, day, label: 'Chiuso' };
}

export function formatDay(day) {
  const ranges = HOURS[day];
  if (!ranges.length) return 'Chiuso';
  return ranges.map(([start, end]) => `${formatTime(start)}–${formatTime(end)}`).join(', ');
}
