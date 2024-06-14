<template>
  <div class="event-progress">
    <div class="event-progress__progress-bar">
      <div
        class="event-progress__progress"
        :class="{ nearest: props.isNearest, active: props.isActive }"
        :style="{ width: progressWidth }"
      ></div>
    </div>
    <p class="event-progress__text">{{ timeRemaining }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { calculateProgressWidth, calculateTimeRemaining, calculateTimeUntil, calculateNearestProgress } from '@/helpers/progressBarHelpers';
import type { Event } from '@/types/Event';
import { Temporal } from '@js-temporal/polyfill';

const props = defineProps<{
  event: Event,
  start: Temporal.PlainTime,
  end: Temporal.PlainTime,
  isActive: boolean,
  isNearest: boolean
}>();

const progressWidth = ref('0%');
const timeRemaining = ref('');

let intervalId: number | null = null;

/**
 * Обновляет прогресс-бара и оставшееся время до начала или конца события
 */
const updateProgress = () => {
  if (props.isActive) {
    progressWidth.value = calculateProgressWidth(props.start, props.end);
    timeRemaining.value = calculateTimeRemaining(props.end);
  } else if (props.isNearest) {
    progressWidth.value = calculateNearestProgress(props.start);
    timeRemaining.value = calculateTimeUntil(props.start);
  } else {
    progressWidth.value = '0%';
    timeRemaining.value = '';
  }
};

onMounted(() => {
  updateProgress();
  intervalId = setInterval(updateProgress, 60000); // Обновление каждые 60 секунд
});

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});
</script>

<style lang="scss" scoped>
@import './progress-bar.scss';
</style>