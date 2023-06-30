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
import router from "@/router";

const taskStore = useTaskStore();
const userStore = useUserStore();

const showDate = ref(new Date());
const items = ref([] as Item[]);

const setShowDate = (date: Date) => {
  showDate.value = date;
}

const onClickItem = async (calendarItem: Item, windowEvent: any) => {
  await router.push(`/calendar/${calendarItem.id}`)
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
    items.value = taskStore.tasks.filter(e => !!e.dueDate).map(e => {
      return {
        id: e.id,
        startDate: new Date(e.dueDate!),
        title: e.title,
        classes: ['basic-calendar-item'],
        // TODO: change background color based on tag
        style: 'background-color: #3B82F6;'
      } as Item;
    })
  }
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
