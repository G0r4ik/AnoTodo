<template>
  <ModalWrapper @close-modal="$emit('closeModal')">
    <template #header>{{ $t('createTask') }}</template>
    <template #content>
      <div class="add-task">
        <TaskAddSelectFolder
          :value="newTask.folder"
          @add-task="addTask"
          @update:folder="newTask.folder = $event" />
        <TaskAddSelectStyling @set-style-of-task="setStyleOfTask" />

        <!-- <CustomCheckbox
          id="is-using-time"
          v-model="isUsingTimeOfTask"
          class="add-task__use-time"
          text="Указать время"
          class-text="add-task__use-time-text"
          class-input="add-task__use-input" /> -->

        <TaskAddTime
          @change-time-start="changeTimeStart"
          @change-time-end="changeTimeEnd" />
        <TaskAddTaskTextInput
          :value="newTask.text"
          @add-task="addTask"
          @update:text="newTask.text = $event" />
        <div
          v-for="subtask of newTask.subtasks"
          :key="subtask.id"
          class="add-subtask">
          <TaskAddSubtask
            :subtask="subtask"
            @add-subtask="addSubtask"
            @delete-subtask="deleteSubtask"
            @update:text="subtask.text = $event" />
        </div>
        <button class="add-subtask__button" @click="addSubtask">
          {{ $t('addSubtask') }}
        </button>

        <AppError
          v-if="error"
          :error="error"
          class="add-task-error"
          @close-error="closeError" />

        <TaskAddTaskButton
          button-text="add"
          :button-border-color="buttonBorderColor"
          :button-b-g="buttonBG"
          :button-color="buttonColor"
          @add-task="addTask" />
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
import TaskAddTime from './TaskAddTime.vue'
import TaskAddTaskButton from './TaskAddTaskButton.vue'

export default {
  components: {
    ModalWrapper,
    TaskAddSelectFolder,
    TaskAddSelectStyling,
    TaskAddTaskTextInput,
    TaskAddSubtask,
    TaskAddTime,
    TaskAddTaskButton,
  },
  emits: ['closeModal'],
  data() {
    return {
      error: null,
      newTask: {
        isReady: false,
        isFavourite: false,
        text: '',
        folder: null,
        style: { bg: 'none', color: 'var(--color-text)' },
        subtasks: [],
        timeStart: null,
        timeEnd: null,
      },
    }
  },
  computed: {
    folder() {
      const notIndexedFolders = useFolderStore().notIndexedFolders
      const currentFolder = useFolderStore().currentFolder
      if (notIndexedFolders.includes(currentFolder)) return 'Неотсортированное'
      return currentFolder || 'Неотсортированное'
    },
    buttonBorderColor() {
      return this.newTask.style.bg === 'none'
        ? 'var(--color-primary)'
        : this.newTask.style.bg
    },
    buttonBG() {
      return this.newTask.style.bg
    },
    buttonColor() {
      return this.newTask.style.color
    },
  },
  mounted() {
    this.newTask.folder = this.folder
  },
  // activated() {
  //   this.newTask.folder = useFolderStore().currentFolder || this.$t('notSorted')
  // },
  methods: {
    changeTimeStart(date) {
      this.newTask.timeStart = date
    },
    changeTimeEnd(date) {
      this.newTask.timeEnd = date
    },
    addSubtask() {
      const id = Date.now().toString(36) + Math.random().toString(36)
      this.newTask.subtasks.push({ text: '', isReady: false, id })
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
      } else {
        this.newTask.id = Date.now().toString(36) + Math.random().toString(36)
        this.newTask.subtasks = this.newTask.subtasks.filter(s => s.text !== '')
        useFolderStore().addTask({ ...this.newTask })
        this.newTask.text = ''
        this.newTask.subtasks = []
      }
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
  width: var(--width-task-add);
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

.add-task__use-time {
  display: flex;
}

.add-task__use-time-text {
  margin-right: var(--unit);
}
</style>
