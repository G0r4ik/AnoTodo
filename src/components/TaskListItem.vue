<template>
  <div
    type="checkbox"
    class="task__status"
    tabindex="0"
    @click="changeTaskStatus(task, subtask)"
    @keypress.enter="changeTaskStatus(task, subtask)" />
  <IconStar
    v-if="type === 'task'"
    :is-active="task.isFavourite"
    @click="toggleTaskFavourite(task)" />

  <div class="task__text">{{ list.text }}</div>

  <button
    v-if="type === 'task' && task.subtasks.length"
    class="task__show-subtasks"
    @click="$emit('toggleSubtasksList', task)">
    <IconArrow
      :style="`transform:rotate(${task.isShowSubtasks ? '180deg' : 0})`" />
  </button>

  <div
    v-if="type === 'task'"
    class="task__edit"
    tabindex="0"
    @click="showEditTaskModal(task)"
    @keypress.enter="showEditTaskModal(task)">
    <IconEdit />
  </div>

  <div class="task__delete" tabindex="0" @click="deleteTask(task, subtask)">
    <IconCross />
  </div>

  <TaskEdit
    :is-show="!!currentEditTask"
    :task="currentEditTask?.task"
    @close-modal="closeEditTaskPopup" />
</template>

<script>
import TaskEdit from '@/components/TaskEdit.vue'

import { useFolderStore } from '@/store/folders.js'
export default {
  components: {
    TaskEdit,
  },
  props: {
    task: { type: Object, default: () => ({}) },
    subtask: { type: Object, default: () => ({}) },
    list: { type: Object, default: () => ({}) },
    type: { type: String, default: 'task' },
  },
  emits: ['toggleSubtasksList'],
  data() {
    return {
      currentEditTask: null,
    }
  },
  methods: {
    toggleTaskFavourite(task) {
      useFolderStore().toggleTaskFavourite(task)
    },
    showEditTaskModal(task) {
      this.currentEditTask = { task }
    },
    closeEditTaskPopup() {
      this.currentEditTask = null
    },
    deleteTask(task, subtask) {
      if (this.type === 'subtask') {
        useFolderStore().deleteSubtask(task, subtask)
      } else {
        useFolderStore().deleteTask(task)
      }
    },
    changeTaskStatus(task, subtask) {
      if (this.type === 'subtask') {
        useFolderStore().changeTaskStatusSubtask(subtask)
      } else {
        useFolderStore().changeTaskStatus(task)
      }
    },
  },
}
</script>
