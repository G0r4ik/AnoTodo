<template>
  <transition name="fade">
    <ModalWrapper v-if="isShow" @close-modal="$emit('closeModal')">
      <h5 class="task-edit__title">Изменить задачу</h5>
      <input
        class="task-edit__task"
        :value="task.text"
        @change="editTask(folder, task, $event.target.value)" />
      <!-- <input
      v-for="subtask of task.subtasks"
      :key="subtask.text"
      :value="subtask.text"
      class="task-edit__subtask"
      @change="editSubtask(folder, task, subtask, $event.target.value)" /> -->

      <div v-for="(subtask, i) in task.subtasks" :key="i" class="add-subtask">
        <input
          id="search-tasks"
          :value="task.subtasks[i].text"
          class="add-subtask__text"
          type="text"
          name="search-tasks"
          placeholder="Текст подзадачи"
          @keypress.enter="addTask"
          @keyup.ctrl.enter.prevent="addSubtask" />
        <div
          class="add-subtask__delete"
          tabindex="0"
          @click="deleteSubtask(subtask)"
          @keypress.enter="deleteSubtask(subtask)">
          <IconCross />
        </div>
      </div>

      <button @click="addNewSubtask(folder, task, $event.target.value)">
        Добавить подзадачу
      </button>
    </ModalWrapper>
  </transition>
</template>

<script>
import { useFolderStore } from '@/store/folders.js'
import ModalWrapper from '@/components/ModalWrapper.vue'

export default {
  components: { ModalWrapper },
  props: {
    isShow: {
      type: Boolean,
    },
    folder: {
      type: String,
      default: 'Неотсортированное',
    },
    task: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['closeModal'],

  methods: {
    editTask(folder, task, text) {
      useFolderStore().editTask(folder, task, text)
    },
    editSubtask(folder, task, subtask, text) {
      useFolderStore().editSubtask(folder, task, subtask, text)
    },
    addNewSubtask() {
      useFolderStore().addSubtask()
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
