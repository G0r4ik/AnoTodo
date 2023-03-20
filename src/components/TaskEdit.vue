<template>
  <ModalWrapper @close-modal="$emit('closeModal')">
    <template #header>Изменить задачу</template>
    <template #content>
      <input
        class="task-edit__task"
        :value="task.text"
        @input="editTask(task, $event.target.value)" />
      <div
        v-for="subtask of task.subtasks"
        :key="subtask.id"
        class="add-subtask">
        <input
          id="search-tasks"
          :value="subtask.text"
          class="add-subtask__text"
          type="text"
          name="search-tasks"
          placeholder="Текст подзадачи"
          @input="editSubtask(task, subtask, $event.target.value)"
          @keypress.enter="addTask"
          @keyup.ctrl.enter.prevent="addSubtask" />
        <div
          class="add-subtask__delete"
          tabindex="0"
          @click="deleteSubtask(task, subtask)"
          @keypress.enter="deleteSubtask(task, subtask)">
          <IconCross />
        </div>
      </div>
      <button @click="addNewSubtask(task)">Добавить подзадачу</button>
    </template>
  </ModalWrapper>
</template>

<script>
import { useFolderStore } from '@/store/folders.js'
import ModalWrapper from '@/components/ModalWrapper.vue'

export default {
  components: { ModalWrapper },
  props: {
    isShow: { type: Boolean, default: false },
    folder: { type: String, default: 'Неотсортированное' },
    task: { type: Object, default: () => ({}) },
  },
  emits: ['closeModal'],
  methods: {
    editTask(task, text) {
      useFolderStore().editTask(task, text)
    },
    editSubtask(task, subtask, text) {
      useFolderStore().editSubtask(task, subtask, text)
    },
    addNewSubtask(task) {
      useFolderStore().addSubtask(task, { isReady: false, text: '' })
    },
    deleteSubtask(task, subtask) {
      useFolderStore().deleteSubtask(task, subtask)
    },
  },
}
</script>

<style>
.task-edit__title {
  margin-bottom: calc(var(--unit) * 2);
  font-size: var(--font-medium);
}

.task-edit__task {
  margin-bottom: var(--unit);
}

.task-edit__subtask {
  margin-bottom: var(--unit);
  margin-left: calc(var(--unit) * 2);
}
</style>
