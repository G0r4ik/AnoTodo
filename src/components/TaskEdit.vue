<template>
  <teleport to="body">
    <div class="task-edit">
      <div class="task-edit__inner">
        <div class="task-edit__cross" @click="$emit('closePopup')">
          <IconCross />
        </div>
        <h5 class="task-edit__title">Изменить задачу</h5>
        <input
          class="task-edit__task"
          :value="task.text"
          @change="editTask(folder, task, $event.target.value)" />
        <input
          v-for="subtask of task.subtasks"
          class="task-edit__subtask"
          :value="subtask.text"
          @change="editSubtask(folder, task, subtask, $event.target.value)" />
      </div>
    </div>
  </teleport>
</template>

<script>
import { useFolderStore } from '../store/folders'

export default {
  props: ['task', 'folder'],
  emits: ['closePopup'],
  mounted() {
    document.addEventListener('keyup', this.closePopup)
  },
  beforeUnmount() {
    document.removeEventListener('keyup', this.closePopup)
  },
  methods: {
    closePopup(event) {
      if (event.key === 'Escape') this.$emit('closePopup')
    },
    editTask(folder, task, text) {
      useFolderStore().editTask(folder, task, text)
    },
    editSubtask(folder, task, subtask, text) {
      useFolderStore().editSubtask(folder, task, subtask, text)
    },
  },
}
</script>

<style>
.task-edit {
  position: fixed;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url('../assets/grain.png');
  background-color: var(--color-secondary);
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 8px 0px;
  border-radius: var(--border-radius-normal);
  padding: 12px;
  z-index: var(--z-index-modal);
}
.task-edit__inner {
  position: relative;
}
.task-edit__cross {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.task-edit__cross svg {
  width: 24px;
  height: 24px;
}
.task-edit__title {
  margin-bottom: 12px;
  font-size: var(--font-medium);
}
.task-edit__task {
  margin-bottom: 6px;
}
.task-edit__subtask {
  margin-bottom: 6px;
  margin-left: 12px;
}
</style>
