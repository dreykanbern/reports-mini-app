<template>
  <header class="section-header">
    <h1 class="section-header__title" v-if="sectionName">{{ props.sectionName }}</h1>
    <p class="section-header__time">{{ currentTime }}</p>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { getCurrentTime } from '@/helpers/formattingHelpers';

const props = defineProps<{
  sectionName: string
}>();

const currentTime = ref(getCurrentTime());

const updateTime = () => {
  currentTime.value = getCurrentTime();
};

let intervalId: number | null = null;

onMounted(() => {
  intervalId = setInterval(updateTime, 30000);
});

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});
</script>

<style lang="scss" scoped>
@import './section-header.scss';
</style>
