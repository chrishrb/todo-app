<template>
  <CalendarView 
    :show-date="showDate" 
    :items="isLoading === false ? taskStore.tasksForCalendar : []"
    :show-times="false"
    :starting-day-of-week="1"
    :locale="userStore.getLanguage"
    class="theme-default bg-white rounded-md p-2"
    @click-item="onClickItem"
  >
    <template #header="{headerProps}">
      <CalendarViewHeader :header-props="headerProps" @input="setShowDate"/>
    </template>
  </CalendarView>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import "../../../node_modules/vue-simple-calendar/dist/style.css"
import "../../../node_modules/vue-simple-calendar/dist/css/gcal.css"
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
import { useTaskStore } from "@/stores/tasks";
import { useUserStore } from "@/stores/user";
import router from "@/router";
import type { CalendarItem } from "@/schemas/calendar-item.schema";

const taskStore = useTaskStore();
const userStore = useUserStore();

const isLoading = ref(true);
const showDate = ref(new Date());

const setShowDate = (date: Date) => {
  showDate.value = date;
}

const onClickItem = async (calendarItem: CalendarItem, windowEvent: any) => {
  await router.push(`/calendar/${calendarItem.id}`)
}

onMounted(async () => {
  await taskStore.getMine(false);
  isLoading.value = false;
})
</script>

<style>
.today div {
  background-color: #3B82F6;
  border-radius: 100%;
  height: 29px;
  width: 29px;
  color: white;
}
.cv-day-number {
  padding: 0.3em;
}

.basic-calendar-item {
  margin-top: 10px;
}
</style>
