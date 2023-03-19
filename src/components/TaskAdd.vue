<template>
  <ModalWrapper @close-modal="$emit('closeModal')">
    <template #header>Создать задачу</template>
    <template #content>
      <div class="add-task">
        <TaskAddSelectFolder
          :value="newTask.folder"
          @add-task="addTask"
          @update:folder="newTask.folder = $event" />
        <TaskAddSelectStyling @set-style-of-task="setStyleOfTask" />
        <TaskAddTaskTextInput
          :value="newTask.text"
          @add-task="addTask"
          @update:text="newTask.text = $event" />
        <TaskAddSubtask
          :subtasks="newTask.subtasks"
          @add-subtask="addSubtask"
          @delete-subtask="deleteSubtask" />
        <AppError
          v-if="error"
          :error="error"
          class="add-task-error"
          @close-error="closeError" />
        <button
          class="add-task__add-button"
          :style="{
            background: getButtonBG,
            color: getButtonColor,
            borderColor: getButtonBorderColor,
          }"
          @click="addTask">
          Добавить
        </button>
      </div>
    </template>
  </ModalWrapper>
</template>

<script>
import { useFolderStore } from '@/store/folders.js'
import ModalWrapper from '@/components/ModalWrapper.vue'
import TaskAddSelectFolder from '@/components/TaskAddSelectFolder.vue'
import TaskAddSelectStyling from '@/components/TaskAddSelectStyling.vue'
import TaskAddTaskTextInput from '@/components/TaskAddTaskTextInput.vue'
import TaskAddSubtask from '@/components/TaskAddSubtask.vue'

export default {
  components: {
    ModalWrapper,
    TaskAddSelectFolder,
    TaskAddSelectStyling,
    TaskAddTaskTextInput,
    TaskAddSubtask,
  },
  emits: ['closeModal'],
  data() {
    return {
      error: null,
      newTask: {
        isReady: false,
        isFavourite: false,
        text: '',
        folder: useFolderStore().currentFolder || 'Неотсортированное',
        style: { bg: 'none', color: 'var(--color-text)' },
        subtasks: [],
      },
    }
  },
  computed: {
    getButtonBorderColor() {
      return this.newTask.style.bg === 'none'
        ? 'var(--color-primary)'
        : this.newTask.style.bg
    },
    getButtonBG() {
      return this.newTask.style.bg
    },
    getButtonColor() {
      return this.newTask.style.color
    },
  },
  activated() {
    this.newTask.folder = useFolderStore().currentFolder || 'Неотсортированное'
  },
  methods: {
    addSubtask(subtask) {
      this.newTask.subtasks.push(subtask)
    },
    deleteSubtask(subtask) {
      this.newTask.subtasks = this.newTask.subtasks.filter(s => subtask !== s)
    },
    setStyleOfTask(style) {
      this.newTask.style = style
    },
    closeError() {
      this.error = null
    },
    addTask() {
      if (this.newTask.text.length < 2) {
        this.error = 'Текст задачи не может быть меньше двух символов'
        return
      }
      this.newTask.id = Date.now().toString(36) + Math.random().toString(36)
      this.newTask.subtasks = this.newTask.subtasks.filter(s => s.text !== '')
      useFolderStore().addTask({ ...this.newTask })
      this.newTask.text = ''
      this.newTask.subtasks = []
    },
  },
}
</script>

<style>
.add-task__title {
  font-size: var(--font-medium);
}

.add-task {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: calc(var(--unit) * 2);
  margin-bottom: calc(var(--unit) * 3);
}

.add-task-error {
  margin-bottom: var(--unit);
}

.add-task__add-button,
.add-subtask__button {
  padding: var(--unit) calc(var(--unit) * 2);
}

.add-task__add-button {
  border-style: solid;
  border-width: var(--border-width-main);
}

.add-task__add-button:disabled,
.add-subtask__button:disabled {
  cursor: auto;
  opacity: 0.5;
}
</style>
