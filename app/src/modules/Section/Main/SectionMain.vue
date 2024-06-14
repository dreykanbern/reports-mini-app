<template>
  <main class="events-wrapper">
    <SectionEvent
      v-for="(event, index) in props.events"
      :key="index"
      :event="event"
      :isActive="isEventActive(event)"
      :isNearest="nearestEvent === event"
    />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SectionEvent from '@/modules/Section/Event/SectionEvent.vue';
import { isEventActive, getNearestEvent } from '@/helpers/eventHelpers';
import type { Event } from '@/types/Event';

const props = defineProps<{
  events: Event[]
}>();

/**
 * Компьютед свойство для определения ближайшего события
 * @returns {Event | null} Ближайшее событие
 */
const nearestEvent = computed(() => getNearestEvent(props.events));
</script>

<style scoped>
@import './section-main.scss';
</style>