import { Temporal } from '@js-temporal/polyfill';

/**
 * Вычисляет ширину прогресс-бара.
 * @param {Temporal.PlainTime} start - Время начала события.
 * @param {Temporal.PlainTime} end - Время окончания события.
 * @returns {string} Ширина прогресс-бара.
 */
export const calculateProgressWidth = (start: Temporal.PlainTime, end: Temporal.PlainTime): string => {
  const now = Temporal.Now.plainTimeISO();
  const progress = (now.since(start).total('minutes') / end.since(start).total('minutes')) * 100;
  return `${progress}%`;
};

/**
 * Вычисляет оставшееся время до конца события.
 * @param {Temporal.PlainTime} end - Время окончания события.
 * @returns {string} Оставшееся время в минутах.
 */
export const calculateTimeRemaining = (end: Temporal.PlainTime): string => {
  const now = Temporal.Now.plainTimeISO();
  const remaining = end.since(now).total('minutes');
  return `Осталось ${Math.round(remaining)} мин`;
};

/**
 * Вычисляет оставшееся время до начала события.
 * @param {Temporal.PlainTime} start - Время начала события.
 * @returns {string} Оставшееся время до начала события в минутах.
 */
export const calculateTimeUntil = (start: Temporal.PlainTime): string => {
  const now = Temporal.Now.plainTimeISO();
  const until = start.since(now).total('minutes');
  return `Начнется через ${Math.round(until)} мин`;
};

/**
 * Вычисляет ширину прогресс-бара для ближайшего события.
 * @param {Temporal.PlainTime} start - Время начала события.
 * @returns {string} Ширина прогресс-бара.
 */
export const calculateNearestProgress = (start: Temporal.PlainTime): string => {
  const now = Temporal.Now.plainTimeISO();
  const startOfDay = Temporal.PlainTime.from('00:00:00');
  const minutesUntilStart = now.until(start).total('minutes');
  const totalMinutesInDay = startOfDay.until(start).total('minutes');
  const progress = 100 - ((minutesUntilStart / totalMinutesInDay) * 100);
  return `${progress}%`;
};
