<template>
  <transition name="fade">
    <ModalWrapper v-if="isShow" @close-modal="$emit('closeModal')">
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
          <select
            id="new-task-bg"
            v-model="newTask.taskBackground"
            name="new-task-bg">
            <option value="none" selected>none</option>
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
  </transition>
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
      newTask: {
        text: '',
        isReady: false,
        taskBackground: 'none',
        isFavourite: false,
        subtasks: [],
      },
      error: null,
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
    }
  },
  computed: {
    allFolders() {
      return useFolderStore().allIndexedFolders()
    },
    taskFolder() {
      return useFolderStore().currentFolder || 'Неотсортированное'
    },
  },
  methods: {
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
      useFolderStore().addTask({ ...this.newTask }, this.taskFolder)
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
