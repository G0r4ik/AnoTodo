<template>
  <teleport to="body">
    <div class="add-task">
      <div class="add-task__inner">
        <div class="add-task__cross" @click="$emit('closePopup')">
          <IconCross />
        </div>
        <h5 class="add-task__title" @click="showCreatePostModal">
          Создать задачу
        </h5>
        <div class="add-task__content">
          <select
            name="new-task-folder"
            id="new-task-folder"
            v-model="taskFolder">
            <option v-for="folder of Object.keys(folders)" :value="folder">
              {{ folder }}
            </option>
          </select>
          <select
            name="new-task-bg"
            id="new-task-bg"
            v-model="newTask.taskBackground">
            <option
              v-for="color of colors"
              :value="color"
              :style="{ 'background-color': color }">
              {{ color }}
            </option>
          </select>
          <div class="add-task__item">
            <input
              v-model="newTask.text"
              class="add-task__text"
              type="text"
              name="search-tasks"
              id="search-tasks"
              placeholder="Текст задачи"
              @keypress.enter="addTask"
              @keyup.ctrl.enter.prevent="addSubtask" />
            <!-- <div class="add-task__date-wrapper">
              <IconDate
                @click="showDatePopup"
                @keypress.enter="showDatePopup" />
              <div @click.stop v-if="isCustomDateActivated">
                <input
                  class="add-task__date"
                  type="date"
                  v-model="newTask.dateOfStart" />
                <input
                  class="add-task__time"
                  type="time"
                  v-model="newTask.timeOfStart" />
              </div>
            </div> -->
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
              @keyup.ctrl.enter.prevent="addSubtask" />
            <div
              class="add-subtask__delete"
              @click="deleteSubtask(subtask)"
              @keypress.enter="deleteSubtask(subtask)"
              tabindex="0">
              <IconCross />
            </div>
          </div>
          <button class="add-subtask__button" @click="addSubtask">
            Добавить подзадачу
          </button>
          <button class="add-task__add-button" @click="addTask">
            Добавить
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { useFolderStore } from '../store/folders'

export default {
  emits: ['closePopup'],
  data() {
    return {
      newTask: {
        text: '',
        dateOfStart: '',
        timeOfStart: '',
        isReady: false,
        taskBackground: null,
        subtasks: [],
      },
      colors: [
        'tomato',
        'lightblue',
        'aquamarine',
        'chartreuse',
        'coral',
        'cornflowerblue',
        'violet',
        'thistle',
        'springgreen',
        'plum',
        'pink',
      ],
      taskFolder: null,
      isCustomDateActivated: false,
    }
  },
  computed: {
    folders() {
      return useFolderStore().folders
    },
    currentFolder() {
      return useFolderStore().currentFolder
    },
  },
  mounted() {
    this.newTask.timeOfStart = new Date().toLocaleTimeString().slice(0, 5)
    this.newTask.dateOfStart = new Date().toISOString().substring(0, 10)
    this.taskFolder = this.currentFolder || 'Неотсортированное'
    document.addEventListener('keyup', this.closePopup)
  },
  beforeUnmount() {
    document.removeEventListener('keyup', this.closePopup)
  },
  methods: {
    closePopup() {
      if (event.key === 'Escape') this.$emit('closePopup')
    },
    addTask() {
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
      this.newTask.id = Date.now().toString(36) + Math.random().toString(36)
      this.newTask.subtasks = this.newTask.subtasks.filter(s => s.text !== '')
      useFolderStore().addTask({ ...this.newTask }, this.taskFolder)

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
}
</script>

<style>
.add-task {
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
.add-task__inner {
  position: relative;
}
.add-task__cross {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.add-task__cross svg {
  width: 24px;
  height: 24px;
}
.add-task__title {
  font-size: var(--font-medium);
}
.add-task__content {
  margin-top: 12px;
  margin-bottom: 15px;
}
.add-task__item {
  display: flex;
  align-items: center;
}
.add-task__text {
  flex: 1 1 auto;
  margin: 5px 0;
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
  padding: 6px 12px;
}
.add-task__add-button {
  border: var(--border-width-main) solid var(--color-primary);
  color: var(--color-primary);
  background: rgba(255, 180, 58, 0.2);
}
.add-subtask {
  display: flex;
  align-items: center;
}
.add-subtask__delete {
  cursor: pointer;
  width: 24px;
  height: 24px;
}

.add-subtask__delete svg {
  height: 100%;
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
