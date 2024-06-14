import { Temporal } from '@js-temporal/polyfill';
import type { Event } from '@/types/Event';

/**
 * Форматирует время в ISO 8601
 * @param {string} time - Время в формате HH:MM
 * @returns {string} Время в формате HH:MM:SS
 */
const formatTime = (time: string | undefined): string => {
  if (!time) {
    throw new Error('Неверное время');
  }
  const [hours, minutes] = time.split(':').map(part => part.padStart(2, '0'));
  return `${hours}:${minutes}:00`;
};

/**
 * Получает время начала и конца события.
 * @param {Event} event - Событие.
 * @returns {Object} Время начала и конца события.
 */
export const getEventTimes = (event: Event) => {
  const start = Temporal.PlainTime.from(formatTime(event.__2));
  const end = start.add({ minutes: event.__3 ?? 0 });
  return { start, end };
};

/**
 * Проверяет, является ли событие активным.
 * @param {Event} event - Событие.
 * @returns {boolean} Является ли событие активным.
 */
export const isEventActive = (event: Event): boolean => {
  const { start, end } = getEventTimes(event);
  const now = Temporal.Now.plainTimeISO();
  return Temporal.PlainTime.compare(now, start) >= 0 && Temporal.PlainTime.compare(now, end) <= 0;
};

/**
 * Получает ближайшее событие.
 * @param {Event[]} events - Массив событий.
 * @returns {Event | null} Ближайшее событие.
 */
export const getNearestEvent = (events: Event[]): Event | null => {
  const now = Temporal.Now.plainTimeISO();

  // Если есть активное событие, ближайшего события нет
  if (events.some(isEventActive)) {
    return null;
  }

  // Ищем ближайшее будущее событие
  return events
    .filter(event => {
      const { start } = getEventTimes(event);
      return Temporal.PlainTime.compare(start, now) > 0;
    })
    .sort((a, b) => {
      const startA = getEventTimes(a).start;
      const startB = getEventTimes(b).start;
      return Temporal.PlainTime.compare(startA, startB);
    })[0] || null;
};


/**
 * Получает список спикеров события.
 * @param {Event} event - Событие.
 * @returns {Array<Object>} Список спикеров.
 */
export const getEventSpeakers = (event: Event) => {
  if (!event.__4 || !event.__5 || event.__4 === '-' || event.__5 === '-') return [];

  let names: string[];
  let photos: string[];

  if (Array.isArray(event.__4) && Array.isArray(event.__5)) {
    names = event.__4;
    photos = event.__5;
  } else {
    // Если __4 не массив, то это одна строка с именем и ролями, разделенными запятой
    names = [event.__4 as string];
    photos = [event.__5 as string];
  }

  return names.map((name, index) => {
    const [speakerName, role] = name.split('/');
    return { name: speakerName.trim(), role: role?.trim() || '', photo: photos[index]?.trim() || '' };
  });
};
