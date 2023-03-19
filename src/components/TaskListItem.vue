<template>
  <div
    type="checkbox"
    class="task__status"
    tabindex="0"
    :style="`border-color:${task.color}`"
    @click="changeTaskStatus(task, subtask)"
    @keypress.enter="changeTaskStatus(task, subtask)" />
  <IconStar
    v-if="type === 'task'"
    tabindex="0"
    :is-active="task.isFavourite"
    @click="toggleTaskFavourite(task)"
    @keydown.enter="toggleTaskFavourite(task)" />

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
    <IconEdit :color="task.style.color" />
  </div>

  <div class="task__delete" tabindex="0" @click="deleteTask(task, subtask)">
    <IconCross :color="task.style.color" />
  </div>

  <teleport to="body">
    <transition name="fade">
      <TaskEdit
        v-if="currentEditTask"
        :task="currentEditTask.task"
        @close-modal="closeEditTaskPopup" />
    </transition>
  </teleport>
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

<style>
.task__status {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--height-icon-main);
  min-height: var(--height-icon-main);
  margin-right: var(--unit);
  cursor: pointer;
  background: transparent;
  border-style: solid;
  border-width: var(--border-width-main);
  border-radius: var(--border-radius-circle);
}

.task_active > .task__status {
  background: var(--color-text);
  border: 5px solid var(--color-danger);
}

.task__text {
  margin-right: auto;
  margin-left: calc(var(--unit) * 2);
  word-break: break-all;
}

.subtask__item {
  margin-left: calc(var(--unit) * 4);
}
</style>
