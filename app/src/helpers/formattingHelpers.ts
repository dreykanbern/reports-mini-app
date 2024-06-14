import { Temporal } from '@js-temporal/polyfill';

/**
 * Форматирует время начала и продолжительность события в строку
 * @param {string} startTime - Время начала события в формате HH:MM
 * @param {number} duration - Продолжительность события в минутах
 * @returns {string} - Форматированное время события
 */
export const formatEventTime = (startTime: string, duration: number): string => {
  try {
    const start = Temporal.PlainTime.from(startTime);
    const end = start.add({ minutes: duration });
    return `${start.toString({ smallestUnit: 'minute' })} - ${end.toString({ smallestUnit: 'minute' })}`;
  } catch (error) {
    console.error('Ошибка при форматировании времени события:', error);
    return 'Invalid Date - Invalid Date';
  }
};

/**
 * Возвращает текущую дату и время в формате "День, время до минут"
 * @returns {string} Текущая дата и время
 */
export const getCurrentTime = (): string => {
  try {
    const now = new Date();
    return now.toLocaleString('ru-RU', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
  } catch (error) {
    console.error('Ошибка при получении текущего времени:', error);
    return 'Invalid Date';
  }
};
