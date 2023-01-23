<script>
import IconCross from './icons/IconCross.vue'
import IconDate from './icons/IconDate.vue'

export default {
  emits: ['addTask', 'changeFolder'],
  props: ['tasksLength', 'folders', 'currentFolder'],
  data() {
    return {
      newTask: {
        text: '',
        dateOfStart: '',
        timeOfStart: '',
        isReady: false,
        subtasks: [],
      },
      error: '',
      isCustomDateActivated: false,
    }
  },
  computed: {
    isValidData() {
      if (!this.isCustomDateActivated)
        return this.newTask.text !== '' && this.currentFolder
      return (
        Object.values(this.newTask).every(task => task !== '') &&
        this.currentFolder
      )
    },
  },
  mounted() {
    this.newTask.timeOfStart = new Date().toLocaleTimeString().slice(0, 5)
    this.newTask.dateOfStart = new Date().toISOString().substring(0, 10)
  },
  methods: {
    addTask() {
      if (!this.isValidData) {
        this.error = 'Проверьте данные'
        return
      }
      if (!this.isCustomDateActivated) {
        const now = new Date()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        this.newTask.timeOfStart = `${hours}:${minutes}`
        const day = String(now.getDate()).padStart(2, '0')
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const year = String(now.getFullYear()).padStart(4, '0')
        this.newTask.dateOfStart = `${day}.${month}.${year}`
      }
      this.newTask.subtasks = this.newTask.subtasks.filter(s => s.text !== '')
      this.$emit('addTask', { ...this.newTask })
      this.newTask.subtasks = []
      this.newTask.text = ''
      this.newTask.dateOfStart = ''
      this.newTask.timeOfStart = ''
    },
    showDatePopup() {
      this.isCustomDateActivated = !this.isCustomDateActivated
      this.newTask.timeOfStart = new Date().toLocaleTimeString().slice(0, 5)
      this.newTask.dateOfStart = new Date().toISOString().substring(0, 10)
    },
    addSubtask() {
      this.newTask.subtasks.push({
        text: '',
        dateOfStart: '',
        timeOfStart: '',
        isReady: false,
      })
    },
    deleteSubtask(subtask) {
      this.newTask.subtasks = this.newTask.subtasks.filter(s => subtask !== s)
    },
  },
  components: { IconCross, IconDate },
}
</script>
<template>
  <div class="add-task">
    <div class="add-task__item">
      <input
        v-model="newTask.text"
        class="add-task__text"
        type="text"
        name="search-tasks"
        id="search-tasks"
        placeholder="Текст задачи"
        @keypress.enter="addTask"
        @keyup.ctrl.enter.prevent="addSubtask"
      />

      <div class="add-task__date-wrapper">
        <IconDate @click="showDatePopup" @keypress.enter="showDatePopup" />
        <div @click.stop v-if="isCustomDateActivated">
          <input
            class="add-task__date"
            type="date"
            v-model="newTask.dateOfStart"
          />
          <input
            class="add-task__time"
            type="time"
            v-model="newTask.timeOfStart"
          />
        </div>
      </div>
    </div>
    <div v-for="(subtask, i) in newTask.subtasks" class="add-subtask">
      <input
        v-model="newTask.subtasks[i].text"
        class="add-subtask__text"
        type="text"
        name="search-tasks"
        id="search-tasks"
        placeholder="Текст подзадачи"
        @keypress.enter="addTask"
        @keyup.ctrl.enter.prevent="addSubtask"
      />
      <div
        class="add-subtask__delete"
        @click="deleteSubtask(subtask)"
        @keypress.enter="deleteSubtask(subtask)"
        tabindex="0"
      >
        <IconCross />
      </div>
    </div>
    <button class="add-subtask__button" @click="addSubtask">
      Добавить подзадачу
    </button>
    <button
      class="add-task__add-button"
      @click="addTask"
      :disabled="!isValidData"
    >
      Добавить
    </button>
    <small class="add-task__error">{{ error }}</small>
  </div>
</template>
<style>
.add-task {
  margin-top: 12px;
  margin-bottom: 15px;
}
.add-task__item {
  display: flex;
  align-items: center;
}
.add-task__text {
  flex: 1 1 auto;
}
.add-subtask__text {
  width: calc(100% - 36px);
  margin-left: 36px;
  margin-bottom: 6px;
}
.add-task__date-wrapper {
  display: inline-flex;
  align-items: center;
}
.add-task__date-wrapper svg {
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-right: 6px;
}
.add-task__date {
  margin-right: 6px;
}
.add-task__time {
}

.add-task__add-button,
.add-subtask__button {
  display: block;
  padding: 6px 12px;
  border: 2px solid var(--color-gray);
  border-radius: 6px;
}
.add-subtask {
  display: flex;
  align-items: center;
}
.add-subtask__delete {
  cursor: pointer;
}

.add-subtask__delete svg {
  width: 24px;
  height: 24px;
}
.add-subtask__button {
  margin-bottom: 6px;
  padding: 3px 6px;
  margin-left: 36px;
}
.add-task__add-button:disabled,
.add-subtask__button:disabled {
  opacity: 0.5;
  cursor: auto;
}

.add-task__error {
  color: red;
}
</style>
