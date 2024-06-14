<template>
  <div :class="['event', { active: isActive, nearest: isNearest }]" :style="{ order: isActive ? 0 : isNearest ? 1 : 2 }">
    <ProgressBar
      v-if="isActive || isNearest"
      :event="props.event"
      :start="start"
      :end="end"
      :is-active="isActive"
      :is-nearest="isNearest"
    />
    <div :class="['event-header', { 'no-speakers': eventSpeakers.length === 0 }]">
      <p class="event-header-time">
        {{ formattedEventTime }}
      </p>
      <h2 class="event-header-title" v-if="eventSpeakers.length === 0">{{ props.event.__1 }}</h2>
    </div>
    <swiper
      v-if="eventSpeakers.length > 1"
      :modules="modules"
      class="mySwiper"
      :slides-per-view="2"
      :space-between="2"
      :loop="true"
      :autoplay="{ delay: 10000 }"
    >
      <swiper-slide v-for="speaker in eventSpeakers" :key="speaker.name">
        <div class="speaker">
          <img :src="speaker.photo" :alt="speaker.name" />
          <div class="speaker__info">
            <span class="speaker__info-name">{{ speaker.name }}</span>
            <span class="speaker__info-role">{{ speaker.role }}</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div v-else>
      <div class="speaker" v-for="speaker in eventSpeakers" :key="speaker.name">
        <img :src="speaker.photo" :alt="speaker.name" />
        <div class="speaker__info">
          <span class="speaker__info-name">{{ speaker.name }}</span>
          <span class="speaker__info-role">{{ speaker.role }}</span>
        </div>
      </div>
    </div>
    <h2 class="event-header__title" v-if="eventSpeakers.length > 0">{{ props.event.__1 }}</h2>
    <div class="event-details" v-if="shouldDisplay(props.event)">
      <span class="event-details__section-tag" v-if="isValidValue(props.event.__6)">{{ props.event.__6 }}</span>
      <span class="event-details__tag" v-if="isValidValue(props.event.__7)">{{ props.event.__7 }}</span>
      <span class="event-details__tag" v-if="isValidValue(props.event.__8)">{{ props.event.__8 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import { getEventTimes, getEventSpeakers } from '@/helpers/eventHelpers';
import { shouldDisplay, isValidValue } from '@/helpers/validationHelpers';
import { formatEventTime } from '@/helpers/formattingHelpers';
import ProgressBar from '@/components/UI/ProgressBar/ProgressBar.vue';
import type { Event } from '@/types/Event';
import 'swiper/css';
import 'swiper/css/autoplay';

const props = defineProps<{
  event: Event,
  isActive: boolean,
  isNearest: boolean
}>();

/**
 * Получает время начала и конца события.
 */
const { start, end } = getEventTimes(props.event);

/**
 * Получает список спикеров события.
 */
const eventSpeakers = computed(() => {
  return getEventSpeakers(props.event);
});

/**
 * Форматированное время события.
 */
const formattedEventTime = computed(() => {
  return formatEventTime(start.toString(), props.event.__3 ?? 0);
});

const modules = [Autoplay];
</script>

<style lang="scss" scoped>
@import './section-event.scss';
</style>