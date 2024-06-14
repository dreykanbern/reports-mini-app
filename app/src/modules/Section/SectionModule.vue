<template>
  <SectionHeader :sectionName="sectionName" />
  <SectionMain :events="sectionEvents" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import SectionHeader from '@/modules/Section/Header/SectionHeader.vue';
import SectionMain from '@/modules/Section/Main/SectionMain.vue';
import { loadSectionData } from '@/utils/loadData';
import { getCurrentTime } from '@/helpers/formattingHelpers';
import type { Event } from '@/types/Event';

const route = useRoute();
const sectionId = ref(route.params.id);

const sectionNameMap: Record<string, string> = {
  '1': 'A',
  '2': 'B',
  '3': 'C',
  '4': 'D',
  '5': 'E',
};

const sectionName = computed(() => `Секция ${sectionNameMap[sectionId.value as string] || 'не найдена'}`);
const currentTime = ref(getCurrentTime());
const sectionEvents = ref<Event[]>([]);

let timeIntervalId: number | null = null;
let dataIntervalId: number | null = null;

const updateCurrentTime = () => {
  currentTime.value = getCurrentTime();
};

const loadData = () => {
  loadSectionData(sectionId.value as string, sectionEvents);
};

onMounted(() => {
  timeIntervalId = setInterval(updateCurrentTime, 30000); // Обновление времени каждые 30 секунд
  loadData(); // Первоначальная загрузка данных
  dataIntervalId = setInterval(loadData, 300000); // Загрузка данных каждые 5 минут
});

onUnmounted(() => {
  if (timeIntervalId) {
    clearInterval(timeIntervalId);
  }
  if (dataIntervalId) {
    clearInterval(dataIntervalId);
  }
});

watch(() => route.params.id, (newId) => {
  sectionId.value = newId as string;
  loadData();
});
</script>
