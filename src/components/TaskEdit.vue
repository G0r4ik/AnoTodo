<template>
  <ModalWrapper @close-modal="$emit('closeModal')">
    <template #header>{{ $t('changeTask') }}</template>
    <template #content>
      <div class="add-task">
        <TaskAddSelectFolder
          :value="task.folder"
          @add-task="addTask"
          @update:folder="editTask.folder = $event" />

        <TaskAddSelectStyling @set-style-of-task="setStyleOfTask" />

        <TaskAddTime
          @change-time-start="changeTimeStart"
          @change-time-end="changeTimeEnd" />
        <TaskAddTaskTextInput
          :value="editTask.text"
          @update:text="editTaskText($event)" />
        <TaskAddSubtask
          :subtasks="editTask.subtasks"
          @add-subtask="addSubtask"
          @delete-subtask="deleteSubtask" />

        <AppError
          v-if="error"
          :error="error"
          class="add-task-error"
          @close-error="closeError" />

        <TaskAddTaskButton
          button-text="Изменить"
          :button-border-color="buttonBorderColor"
          :button-b-g="buttonBG"
          :button-color="buttonColor"
          @add-task="editTaskFunc" />
      </div>
    </template>
  </ModalWrapper>
</template>

<script>
import { useFolderStore } from '@/store/folders.js'
import ModalWrapper from '@/components/ModalWrapper.vue'
import TaskAddSubtask from './TaskAddSubtask.vue'
import AppError from './AppError.vue'
import TaskAddTaskTextInput from './TaskAddTaskTextInput.vue'
import TaskAddTime from './TaskAddTime.vue'
import TaskAddSelectFolder from './TaskAddSelectFolder.vue'
import TaskAddSelectStyling from './TaskAddSelectStyling.vue'
import TaskAddTaskButton from './TaskAddTaskButton.vue'

export default {
  components: {
    ModalWrapper,
    TaskAddSubtask,
    AppError,
    TaskAddTaskTextInput,
    TaskAddTime,
    TaskAddSelectFolder,
    TaskAddSelectStyling,
    TaskAddTaskButton,
  },
  props: {
    isShow: { type: Boolean, default: false },
    folder: { type: String, default: 'Неотсортированное' },
    task: { type: Object, default: () => ({}) },
  },
  emits: ['closeModal'],
  data() {
    return {
      error: '',
      editTask: {},
    }
  },
  computed: {
    buttonBorderColor() {
      return this.editTask.style?.bg === 'none'
        ? 'var(--color-primary)'
        : this.editTask.style?.bg
    },
    buttonBG() {
      return this.editTask.style?.bg
    },
    buttonColor() {
      return this.editTask.style?.color
    },
  },
  mounted() {
    this.editTask = { ...this.task }
  },
  methods: {
    editTaskFunc() {
      useFolderStore().editTask(this.task, this.editTask)
    },
    changeTimeStart(date) {
      this.editTask.timeStart = date
    },
    changeTimeEnd(date) {
      this.editTask.timeEnd = date
    },
    addSubtask(subtask) {
      this.editTask.subtasks.push(subtask)
    },
    deleteSubtask(subtask) {
      this.editTask.subtasks = this.editTask.subtasks.filter(s => subtask !== s)
    },
    setStyleOfTask(style) {
      this.editTask.style = style
    },
    closeError() {
      this.error = null
    },
    addTask() {
      if (this.editTask.text.length < 2) {
        this.error = 'Текст задачи не может быть меньше двух символов'
      } else {
        this.editTask.id = Date.now().toString(36) + Math.random().toString(36)
        this.editTask.subtasks = this.editTask.subtasks.filter(
          s => s.text !== ''
        )
        useFolderStore().addTask({ ...this.editTask })
        this.editTask.text = ''
        this.editTask.subtasks = []
      }
    },
    //
    //
    //
    editTaskText(text) {
      this.editTask.text = text
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
