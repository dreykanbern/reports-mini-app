import type { Event } from '@/types/Event';

/**
 * Проверяет валидность значения события.
 * @param {unknown} value - Значение для проверки.
 * @returns {boolean} Является ли значение валидным.
 */
export const isValidValue = (value: unknown): boolean => {
  return value !== undefined && value !== '-' && value !== '';
};

/**
 * Проверяет валидность события.
 * @param {Event} event - Событие.
 * @returns {boolean} Является ли событие валидным.
 */
export const isValidEvent = (event: Event): boolean => {
  return Object.entries(event).every(([key, value]) => {
    if (key === '__3') {
      return typeof value === 'number' && value > 0;
    }
    if (key === '__4' || key === '__5') {
      if (Array.isArray(value)) {
        return value.every(isValidValue);
      }
    }
    return isValidValue(value);
  });
};

/**
 * Проверяет, следует ли отображать детали события.
 * @param {Event} event - Событие.
 * @returns {boolean} Следует ли отображать детали события.
 */
export const shouldDisplay = (event: Event): boolean => {
  return isValidValue(event.__6) && isValidValue(event.__7) && isValidValue(event.__8);
};
