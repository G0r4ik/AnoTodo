<script>
import IconArrow from './icons/IconArrow.vue'
import IconCross from './icons/IconCross.vue'
import IconEdit from './icons/IconEdit.vue'

export default {
  props: ['tasks', 'folder'],
  emits: [
    'changeStatus',
    'deleteTask',
    'showEditTaskPopup',
    'changeStatusSubtask',
    'deleteSubtask',
  ],
  data() {
    return {
      isShowSubtasks: false,
    }
  },
  methods: {
    showSubtasks(task) {
      task.isShowSubtasks = !task.isShowSubtasks
    },
  },
  components: { IconArrow, IconEdit, IconCross },
}
</script>
<template>
  <div
    v-for="task of tasks"
    class="task-wrapper"
    :class="{ task_active: task.isReady }"
  >
    <div class="tasks__item">
      <div
        type="checkbox"
        class="task__status"
        tabindex="0"
        @click="$emit('changeStatus', folder, task)"
        @keypress.enter="$emit('changeStatus', folder, task)"
      />
      <div class="task__text">{{ task.text }}</div>
      <button
        v-if="task.subtasks.length"
        class="task__show-subtasks"
        @click="showSubtasks(task)"
      >
        <IconArrow
          :style="`transform:rotate(${task.isShowSubtasks ? '180deg' : 0})`"
        />
      </button>
      <div class="task__date">
        {{ task.timeOfStart }} {{ task.dateOfStart }}
      </div>
      <div
        class="task__edit"
        @click="$emit('showEditTaskPopup', folder, task)"
        @keypress.enter="$emit('showEditTaskPopup', folder, task)"
        tabindex="0"
      >
        <IconEdit />
      </div>

      <div class="task__delete" @click="$emit('deleteTask', folder, task)">
        <IconCross />
      </div>
    </div>

    <div v-if="task.isShowSubtasks" class="task__subtasks subtasks">
      <div
        v-for="subtask of task.subtasks"
        class="subtasks__item task-subtask"
        :class="{ 'task-subtask_active': subtask.isReady }"
      >
        <div
          type="checkbox"
          class="task-subtask__status"
          @click="$emit('changeStatusSubtask', folder, task, subtask)"
          :class="{ subtask__status_active: subtask.isReady }"
        />
        <div class="task-subtask__text">{{ subtask.text }}</div>
        <div class="task-subtask__date">
          {{ subtask.dateOfStart }} {{ subtask.timeOfStart }}
        </div>
        <div
          class="task-subtask__delete"
          @click="$emit('deleteSubtask', folder, task, subtask)"
        >
          <IconCross />
        </div>
      </div>
    </div>
  </div>
</template>
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
.tasks {
}
.task-wrapper {
  margin-bottom: 12px;
  box-shadow: rgba(99, 99, 99, 0.5) 0px 2px 8px 0px;
  padding: 12px;
  padding-top: 24px;
  border-radius: 12px;
}
.tasks__item,
.subtasks__item {
  display: flex;
  align-items: center;
  position: relative;
}
.tasks__item {
}

.task_active .tasks__item,
.task-subtask_active {
  text-decoration: line-through;
  text-decoration-color: lightskyblue;
  opacity: 0.95;
}

.task,
.task-subtask {
  border-radius: 12px;
}
.task__status,
.task-subtask__status {
  cursor: pointer;
  min-width: 20px;
  min-height: 20px;
  background: cornflowerblue;
  border: 5px solid transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border-radius: 50%;
  margin-right: 6px;
}
.task_active .task__status,
.subtask__status_active {
  background: cornflowerblue;
}
.task_active .task__status,
.task-subtask_active .task-subtask__status {
  background: white;
  border: 5px solid cornflowerblue;
}
.task_active .task__status::before,
.subtask__status_active::before {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
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
  font-size: 14px;
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
