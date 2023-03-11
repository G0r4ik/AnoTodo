<template>
  <ModalWrapper @close-modal="$emit('closeModal')">
    <h5 class="add-task__title">Создать задачу</h5>
    <div class="add-task__content">
      <select id="new-task-folder" v-model="taskFolder" name="new-task-folder">
        <option
          v-for="folder of Object.keys(folders)"
          :key="folder"
          :value="folder">
          {{ folder }}
        </option>
      </select>
      <select
        id="new-task-bg"
        v-model="newTask.taskBackground"
        name="new-task-bg">
        <option
          v-for="color of colors"
          :key="color"
          :value="color"
          :style="{ 'background-color': color }">
          {{ color }}
        </option>
      </select>
      <div class="add-task__item">
        <input
          id="search-tasks"
          v-model="newTask.text"
          class="add-task__text"
          type="text"
          name="search-tasks"
          placeholder="Текст задачи"
          @keypress.enter="addTask"
          @keyup.ctrl.enter.prevent="addSubtask" />
        <!-- <div class="add-task__date-wrapper">
          <IconDate @click="showDatePopup" @keypress.enter="showDatePopup" />
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
      <div
        v-for="(subtask, i) in newTask.subtasks"
        :key="i"
        class="add-subtask">
        <input
          id="search-tasks"
          v-model="newTask.subtasks[i].text"
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
      <button class="add-subtask__button" @click="addSubtask">
        Добавить подзадачу
      </button>
      <button class="add-task__add-button" @click="addTask">Добавить</button>
    </div>
  </ModalWrapper>
</template>

<script>
import { useFolderStore } from '@/store/folders.js'
import ModalWrapper from '@/components/ModalWrapper.vue'
export default {
  components: { ModalWrapper },
  emits: ['closeModal'],
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
  },
  methods: {
    addTask() {
      this.newTask.id = Date.now().toString(36) + Math.random().toString(36)
      this.newTask.subtasks = this.newTask.subtasks.filter(s => s.text !== '')
      useFolderStore().addTask({ ...this.newTask }, this.taskFolder)
      this.newTask.text = ''
      this.newTask.subtasks = []
    },
    // showDatePopup() {
    //   this.isCustomDateActivated = !this.isCustomDateActivated
    //   this.newTask.timeOfStart = new Date().toLocaleTimeString().slice(0, 5)
    //   this.newTask.dateOfStart = new Date().toISOString().substring(0, 10)
    // },
    addSubtask() {
      this.newTask.subtasks.push({ text: '', isReady: false })
    },
    deleteSubtask(subtask) {
      this.newTask.subtasks = this.newTask.subtasks.filter(s => subtask !== s)
    },
  },
}
</script>

<style>
.add-task__title {
  font-size: var(--font-medium);
}

.add-task__content {
  display: flex;
  flex-direction: column;
  margin-top: calc(var(--unit) * 2);
  margin-bottom: calc(var(--unit) * 3);
}

.add-task__item {
  display: flex;
  align-items: center;
}

.add-task__text {
  flex: 1 1 auto;
  margin: var(--unit) 0;
}

.add-subtask__text {
  width: calc(100% - 36px);
  margin-bottom: var(--unit);
  margin-left: calc(var(--unit) * 5);
}

.add-task__date-wrapper {
  display: inline-flex;
  align-items: center;
}

.add-task__date-wrapper svg {
  width: 50px;
  height: 50px;
  margin-right: var(--unit);
  cursor: pointer;
}

.add-task__date {
  margin-right: var(--unit);
}

.add-task__add-button,
.add-subtask__button {
  padding: var(--unit) calc(var(--unit) * 2);
}

.add-task__add-button {
  color: var(--color-primary);
  background: rgba(255, 180, 58, 0.2);
  border: var(--border-width-main) solid var(--color-primary);
}

.add-subtask {
  display: flex;
  align-items: center;
}

.add-subtask__delete {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.add-subtask__delete svg {
  height: 100%;
}

.add-subtask__button {
  padding: var(--unit) calc(var(--unit) * 2);
  margin-bottom: var(--unit);
  margin-left: calc(var(--unit) * 6);
}

.add-task__add-button:disabled,
.add-subtask__button:disabled {
  cursor: auto;
  opacity: 0.5;
}
</style>
