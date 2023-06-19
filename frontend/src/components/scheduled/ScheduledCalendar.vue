<template>
  <CalendarView 
    :show-date="showDate" 
    :items="items"
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

const taskStore = useTaskStore();
const userStore = useUserStore();

const showDate = ref(new Date());
const items = ref([] as Item[]);

const setShowDate = (date: Date) => {
  showDate.value = date;
}

const onClickItem = (calendarItem: Item, windowEvent: any) => {
  // TODO: open task with modal
  console.log(calendarItem, windowEvent);
}

type Item = {
  id: string;
  startDate: Date;
  endDate?: Date;
  title?: string;
  tooltip?: string;
  classes?: string[];
  style?: string;
}

onMounted(async () => {
  await taskStore.getMine();
  if (taskStore.tasks) {
    items.value = taskStore.tasks.map(e => {
      return {
        id: e.id,
        startDate: e.dueDate,
        title: e.title,
        classes: ['basic-calendar-item'],
        // TODO: change background color based on tag
        style: 'background-color: #3B82F6;'
      } as Item;
    })
  }
})
</script>
