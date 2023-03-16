<template>
  <ModalWrapper @close-modal="$emit('closeModal')">
    <template #header>Создать задачу</template>
    <template #content>
      <div class="add-task">
        <select
          id="new-task-folder"
          v-model="taskFolder"
          class="add-task__folder"
          name="new-task-folder">
          <option v-for="folder of allFolders" :key="folder" :value="folder">
            {{ folder }}
          </option>
        </select>
        <!-- @input="selectColor($event.target.value)" -->
        <select v-model="currentColor" id="new-task-bg" name="new-task-bg">
          <option value="none" selected>none</option>
          <option value="Random">Random</option>
          <option
            v-for="color of allColors"
            :key="color"
            :value="color"
            :style="{ 'background-color': colors[color].bg }">
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
        </div>
        <div
          v-for="(subtask, i) in newTask.subtasks"
          :key="subtask.id"
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
        <AppError
          v-if="error"
          :error="error"
          class="add-task-error"
          @close-error="closeError" />
        <button
          class="add-task__add-button"
          :style="`background:${
            newTask.taskBackground === 'none'
              ? 'var(--color-bg-primary)'
              : newTask.taskBackground
          };
              color: ${newTask.color || 'var(--color-text)'};
             border-color:${
               newTask.taskBackground === 'none'
                 ? 'var(--color-primary)'
                 : newTask.taskBackground
             }`"
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

export default {
  components: { ModalWrapper },
  props: {
    isShow: { type: Boolean, default: false },
  },
  emits: ['closeModal'],
  data() {
    return {
      currentColor: 'none',
      newTask: {
        text: '',
        isReady: false,
        folder: 'Неотсортированное',
        taskBackground: 'none',
        color: 'var(--color-text)',
        isFavourite: false,
        subtasks: [],
      },
      error: null,
      colors: {
        tomato: { bg: 'tomato', color: 'black' },
        lightblue: { bg: 'lightblue', color: 'black' },
        aquamarine: { bg: 'aquamarine', color: 'black' },
        chartreuse: { bg: 'chartreuse', color: 'black' },
        coral: { bg: 'coral', color: 'black' },
        cornflowerblue: { bg: 'cornflowerblue', color: 'black' },
        violet: { bg: 'violet', color: 'black' },
        thistle: { bg: 'thistle', color: 'black' },
        springgreen: { bg: 'springgreen', color: 'black' },
        plum: { bg: 'plum', color: 'black' },
        pink: { bg: 'pink', color: 'black' },
      },
    }
  },
  computed: {
    allColors() {
      return Object.keys(this.colors)
    },
    allFolders() {
      return useFolderStore().allIndexedFolders
    },
    taskFolder() {
      return useFolderStore().currentFolder || 'Неотсортированное'
    },
  },
  watch: {
    currentColor(value) {
      if (value === 'Random') {
        this.newTask.taskBackground = this.colors[this.allColors[this.r]].bg
        this.newTask.color = this.colors[this.allColors[this.r]].color
      } else {
        this.newTask.color = this.colors[value].color
        this.newTask.taskBackground = this.colors[value].bg
      }
    },
  },
  mounted() {
    console.log('taskAdd')
    this.r = Math.floor(Math.random() * (this.allColors.length - 0 + 1)) + 0
    // this.newTask.taskBackground = 'none'
    // this.newTask.color = null
  },
  methods: {
    selectColor(color) {
      const color2 = color.split(',')
      if (color2[0] === 'Random') {
        const r = Math.floor(Math.random() * (this.colors.length - 0 + 1)) + 0
        this.newTask.taskBackground = this.colors[r].bg
        this.newTask.color = this.colors[r].color
        console.log(this.newTask)
      } else {
        this.newTask.taskBackground = color2[0]
        this.newTask.color = color2[1]
      }
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
      this.newTask.folder = this.taskFolder
      useFolderStore().addTask({ ...this.newTask })
      this.newTask.text = ''
      this.newTask.subtasks = []
    },
    addSubtask() {
      const id = Date.now().toString(36) + Math.random().toString(36)
      this.newTask.subtasks.push({ text: '', isReady: false, id })
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

.add-task__folder {
  margin-bottom: var(--unit);
}

.add-task__item {
  display: flex;
  align-items: center;
}

.add-task__text {
  flex: 1 1 auto;
  padding: var(--unit);
  margin: var(--unit) 0;
}

.add-subtask__text {
  width: 100%;
  padding: calc(var(--unit) / 2);
  margin-bottom: var(--unit);
  margin-left: calc(var(--unit) * 5);
}

.add-task__date {
  margin-right: var(--unit);
}

.add-task__add-button,
.add-subtask__button {
  padding: var(--unit) calc(var(--unit) * 2);
}

.add-task__add-button {
  border-style: solid;
  border-width: var(--border-width-main);
}

.add-subtask {
  display: flex;
  align-items: center;
}

.add-subtask__delete {
  width: var(--height-icon-main);
  height: var(--height-icon-main);
  cursor: pointer;
}

.add-subtask__delete svg {
  height: 100%;
}

.add-subtask__button {
  padding: var(--unit) calc(var(--unit) * 2);
  margin-bottom: var(--unit);
  margin-left: calc(var(--unit) * 6);
  font-size: var(--font-small);
}

.add-task__add-button:disabled,
.add-subtask__button:disabled {
  cursor: auto;
  opacity: 0.5;
}
</style>
