<template>
  <div
    type="checkbox"
    class="task__status"
    tabindex="0"
    @click="changeStatus(folder, task, subtask)"
    @keypress.enter="changeStatus(folder, task, subtask)" />

  <div class="task__text">{{ list.text }}</div>

  <div
    v-if="type === 'task' && task.subtasks.length"
    class="task__show-subtasks"
    @click="$emit('toggleSubtasksList', task)">
    <IconArrow
      :style="`transform:rotate(${task.isShowSubtasks ? '180deg' : 0})`" />
  </div>

  <div
    v-if="type === 'task'"
    class="task__edit"
    tabindex="0"
    @click="showEditTaskModal(folder, task)"
    @keypress.enter="showEditTaskModal(folder, task)">
    <IconEdit />
  </div>

  <div
    class="task__delete"
    tabindex="0"
    @click="deleteTask(folder, task, subtask)">
    <IconCross />
  </div>

  <transition name="fade">
    <TaskEdit
      v-if="currentEditTask"
      :task="currentEditTask.task"
      :folder="currentEditTask.folder"
      @close-modal="closeEditTaskPopup" />
  </transition>
</template>

<script>
import TaskEdit from '@/components/TaskEdit.vue'

import { useFolderStore } from '@/store/folders.js'
export default {
  components: {
    TaskEdit,
  },
  props: {
    folder: {
      type: String,
      default: 'Неотсортированное',
    },
    task: {
      type: Object,
      default: () => ({}),
    },
    subtask: {
      type: Object,
      default: () => ({}),
    },
    list: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: 'task',
    },
  },
  emits: ['toggleSubtasksList'],
  data() {
    return {
      currentEditTask: null,
    }
  },
  methods: {
    showEditTaskModal(folder, task) {
      this.currentEditTask = { folder, task }
    },
    closeEditTaskPopup() {
      this.currentEditTask = null
    },
    deleteTask(folder, task, subtask) {
      if (this.type === 'subtask') {
        useFolderStore().deleteSubtask(folder, task, subtask)
      } else {
        useFolderStore().deleteTask(folder, task)
      }
    },
    changeStatus(folder, task, subtask) {
      if (this.type === 'subtask') {
        useFolderStore().changeStatusSubtask(folder, task, subtask)
      } else {
        useFolderStore().changeStatus(folder, task)
      }
    },
  },
}
</script>
