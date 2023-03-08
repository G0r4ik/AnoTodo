<template>
  <strong
    v-if="!currentFolder"
    class="search-result-folder"
    @click="setCurerentFolder(folder)">
    {{ folder }}
  </strong>
  <div
    v-for="task of tasks"
    class="task-wrapper"
    :class="{ task_active: task.isReady }"
    :style="{ background: task.taskBackground || 'transparent' }">
    <div class="tasks__item">
      <div
        type="checkbox"
        class="task__status"
        tabindex="0"
        @click="changeStatus(folder, task)"
        @keypress.enter="changeStatus(folder, task)" />
      <div class="task__text">{{ task.text }}</div>
      <button
        v-if="task.subtasks.length"
        class="task__show-subtasks"
        @click="showSubtasks(task)">
        <IconArrow
          :style="`transform:rotate(${task.isShowSubtasks ? '180deg' : 0})`" />
      </button>
      <div class="task__date">
        {{ task.timeOfStart }} {{ task.dateOfStart }}
      </div>
      <div
        class="task__edit"
        @click="$emit('showEditTaskPopup', folder, task)"
        @keypress.enter="$emit('showEditTaskPopup', folder, task)"
        tabindex="0">
        <IconEdit />
      </div>

      <div class="task__delete" @click="deleteTask(folder, task)">
        <IconCross />
      </div>
    </div>

    <div v-if="task.isShowSubtasks" class="task__subtasks subtasks">
      <div
        v-for="subtask of task.subtasks"
        class="subtasks__item task-subtask"
        :class="{ 'task-subtask_active': subtask.isReady }">
        <div
          type="checkbox"
          class="task-subtask__status"
          @click="changeStatusSubtask(folder, task, subtask)"
          :class="{ subtask__status_active: subtask.isReady }" />
        <div class="task-subtask__text">{{ subtask.text }}</div>
        <div class="task-subtask__date">
          {{ subtask.dateOfStart }} {{ subtask.timeOfStart }}
        </div>
        <div
          class="task-subtask__delete"
          @click="deleteSubtask(folder, task, subtask)">
          <IconCross />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useFolderStore } from '../store/folders'

export default {
  props: ['tasks', 'folder'],
  emits: ['showEditTaskPopup', 'changeStatusSubtask', 'deleteSubtask'],
  data() {
    return {
      isShowSubtasks: false,
    }
  },
  computed: {
    currentFolder() {
      return useFolderStore().currentFolder
    },
  },
  methods: {
    showSubtasks(task) {
      task.isShowSubtasks = !task.isShowSubtasks
    },
    deleteTask(folder, task) {
      useFolderStore().deleteTask(folder, task)
    },
    setCurerentFolder(folder) {
      useFolderStore().setCurrentFolder(folder)
    },
    changeStatus(folder, task) {
      useFolderStore().changeStatus(folder, task)
    },
    changeStatusSubtask(folder, task, subtask) {
      useFolderStore().changeStatusSubtask(folder, task, subtask)
    },
    deleteSubtask(folder, task, subtask) {
      useFolderStore().deleteSubtask(folder, task, subtask)
    },
  },
}
</script>

<style>
.task__show-subtasks {
}
.task-subtask__text {
  margin-right: auto;
}
.task__show-subtasks svg {
  width: 24px;
  height: 24px;
}
.task-wrapper {
  margin-bottom: 12px;
  /* box-shadow: rgba(99, 99, 99, 0.5) 0px 2px 8px 0px; */
  padding: 12px;
  padding-top: 24px;
  border-radius: var(--border-radius-normal);
}
.tasks__item,
.subtasks__item {
  display: flex;
  align-items: center;
  position: relative;
}
.task_active .tasks__item,
.task-subtask_active {
  text-decoration: line-through;
  text-decoration-color: var(--color-danger);
  opacity: 0.95;
}
.task,
.task-subtask {
  border-radius: var(--border-radius-normal);
}
.task__status,
.task-subtask__status {
  cursor: pointer;
  min-width: 20px;
  min-height: 20px;
  border: var(--border-width-main) solid var(--color-text);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-circle);
  margin-right: 6px;
}
.task_active .task__status,
.subtask__status_active {
  background: var(--color-primary);
}
.task_active .task__status,
.task-subtask_active .task-subtask__status {
  background: var(--color-text);
  border: 5px solid var(--color-primary);
}
.task_active .task__status::before,
.subtask__status_active::before {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: var(--border-radius-circle);
  top: -3px;
}

.task__text {
  margin-right: 12px;
  margin-right: auto;
  margin-left: 12px;
  word-break: break-all;
}
.task__date,
.task-subtask__date {
  margin-right: 12px;
  margin-left: 6px;
  font-size: var(--font-extra-small);
  text-align: right;
}
.task__date {
  position: absolute;
  left: -10px;
  top: -15px;
}
.task__edit,
.task-subtask__edit {
  cursor: pointer;
}
.task__edit svg,
.task-subtask__edit svg {
  width: 24px;
  height: 24px;
}
.task__delete,
.task-subtask__delete {
  cursor: pointer;
}
.task__delete svg,
.task-subtask__delete svg {
  width: 24px;
  height: 24px;
}
.task-subtask {
  margin-left: 36px;
}
.task-subtask_active {
}
.task-subtask:first-child {
  margin-top: 6px;
}
</style>
