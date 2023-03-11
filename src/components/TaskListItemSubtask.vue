<template>
  <div class="task__subtasks subtasks">
    <div
      v-for="subtask of task.subtasks"
      :key="subtask"
      class="subtasks__item task-subtask"
      :class="{ 'task-subtask_active': subtask.isReady }">
      <div
        type="checkbox"
        class="task-subtask__status"
        :class="{ subtask__status_active: subtask.isReady }"
        @click="changeStatusSubtask(folder, task, subtask)" />
      <div class="task-subtask__text">{{ subtask.text }}</div>
      <div class="task-subtask__date">
        {{ subtask.dateOfStart }} {{ subtask.timeOfStart }}
      </div>
      <div
        class="task-subtask__delete"
        tabindex="0"
        @click="deleteSubtask(folder, task, subtask)">
        <IconCross />
      </div>
    </div>
  </div>
</template>

<script>
import { useFolderStore } from '@/store/folders.js'
export default {
  props: {
    task: {
      type: Object,
      default: () => {},
    },
    folder: {
      type: String,
      default: 'Неотсортированное',
    },
  },
  methods: {
    changeStatusSubtask(folder, task, subtask) {
      useFolderStore().changeStatusSubtask(folder, task, subtask)
    },
    deleteSubtask(folder, task, subtask) {
      useFolderStore().deleteSubtask(folder, task, subtask)
    },
  },
}
</script>
