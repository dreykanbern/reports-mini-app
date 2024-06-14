import type { Ref } from 'vue';
import type { Event } from '@/types/Event';

/**
 * Загружает данные для указанной секции и сохраняет их в переданную переменную
 * @param {string} sectionId - Идентификатор секции
 * @param {Ref<Event[]}>} sectionEvents - Реф для хранения событий секции
 */
export const loadSectionData = async (sectionId: string, sectionEvents: Ref<Event[]>) => {
  try {
    const data = await import(`@/data/report_${sectionId}.json`);
    sectionEvents.value = data.default.filter((event: Event, index: number) => index > 0);
  } catch (error) {
    console.error(`Ошибка загрузки данных для секции ${sectionId}:`, error);
  }
};
