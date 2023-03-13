<template>
  <div class="main__tasks">
    <template v-for="folder of Object.keys(filteredTasks)" :key="folder.id">
      <div v-if="filteredTasks[folder]?.length" class="main__tasks-item task">
        <strong
          v-if="!currentFolder && filteredTasks[folder].length"
          class="task__folder"
          @click="setCurerentFolder(folder)">
          {{ folder }}
        </strong>

        <div
          v-for="task of filteredTasks[folder]"
          :key="task.id"
          class="task__wrapper"
          :style="{ background: task.taskBackground || 'transparent' }">
          <div class="tasks__item" :class="{ task_active: task.isReady }">
            <TaskListItem
              :folder="folder"
              :task="task"
              :list="task"
              :type="'task'"
              @toggle-subtasks-list="toggleSubtasksList" />
          </div>

          <div
            v-for="subtask of task.subtasks"
            :key="subtask.id"
            class="tasks__item subtask__item"
            :class="{ task_active: subtask.isReady }">
            <TaskListItem
              v-if="task.isShowSubtasks"
              :folder="folder"
              :type="'subtask'"
              :task="task"
              :subtask="subtask"
              :list="subtask"
              @toggle-subtasks-list="toggleSubtasksList" />
          </div>
        </div>
      </div>
    </template>
    <div v-if="isEmptyTasks" class="main__task-not-found">
      Ничего не найдено
    </div>
  </div>
</template>

<script>
import { useFolderStore } from '@/store/folders.js'
import TaskListItem from '@/components/TaskListItem.vue'

export default {
  components: { TaskListItem },
  props: {
    statusList: { type: String, default: 'all' },
  },
  computed: {
    searchFilter() {
      return useFolderStore().searchFilter
    },
    isEmptyTasks() {
      return Object.values(this.filteredTasks).every(item => item?.length === 0)
    },
    currentFolder() {
      return useFolderStore().currentFolder
    },
    allFolders() {
      console.log('1', useFolderStore().allIndexedFolders())
      console.log('2', Object.keys(this.folders))
      return useFolderStore().allIndexedFolders()
      // return Object.keys(this.folders)
    },
    allFolders2() {
      return useFolderStore().allFolders()
    },
    folders() {
      return useFolderStore().folders
    },
    filteredTasks() {
      const result = {}
      for (let i = 0; i < this.allFolders2.length; i++) {
        if (this.currentFolder && this.currentFolder !== this.allFolders2[i]) {
          continue
        }
        result[this.allFolders2[i]] = this.folders[this.allFolders2[i]]?.filter(
          task => {
            if (!task.text.includes(this.searchFilter)) return false
            if (this.statusList === 'ready' && !task.isReady) return false
            if (this.statusList === 'active' && task.isReady) return false
            return true
          }
        )
      }
      return result
    },
  },
  methods: {
    toggleSubtasksList(task) {
      task.isShowSubtasks = !task.isShowSubtasks
    },
    setCurerentFolder(folder) {
      useFolderStore().setCurrentFolder(folder)
    },
  },
}
</script>

<style>
.task__folder {
  display: inline-block;
  margin-bottom: calc(var(--unit) * 2);
  font-size: var(--font-medium);
  font-weight: 700;
  cursor: pointer;
}

.main__task {
  padding: calc(var(--unit) * 2);
  padding-top: calc(var(--unit) * 5);
  margin-bottom: calc(var(--unit) * 2);
  border-radius: var(--border-radius-normal);
}

.task-status__links {
  margin-bottom: calc(var(--unit) * 5);
}

.task-status__link {
  cursor: pointer;
  opacity: 1;
  transition: var(--transition-fast);
}

.task-status__link_active {
  border-bottom: var(--border-width-small) solid var(--color-primary);
}

.task-status__link:not(:last-child) {
  margin-right: calc(var(--unit) * 3);
}

.task-status__link:hover {
  opacity: 0.5;
  transition: var(--transition-fast);
}

.main__task-not-found {
  font-size: var(--font-large);
  text-align: center;
  opacity: 0.5;
}

.task__wrapper {
  padding: calc(var(--unit) * 2);
  margin-bottom: calc(var(--unit) * 2);
  border-radius: var(--border-radius-normal);
}

.tasks__item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: var(--unit);
}

.task_active {
  color: var(--color-danger);
  text-decoration: line-through;
  text-decoration-color: var(--color-danger);
  opacity: 0.5;
}

.task__status {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--height-icon-main);
  min-height: var(--height-icon-main);
  margin-right: var(--unit);
  cursor: pointer;
  background: transparent;
  border: var(--border-width-main) solid var(--color-text);
  border-radius: var(--border-radius-circle);
}

.task_active > .task__status {
  background: var(--color-text);
  border: 5px solid var(--color-primary);
}

.task__edit,
.task__delete,
.task__show-subtasks {
  width: var(--height-icon-main);
  height: var(--height-icon-main);
  cursor: pointer;
}

.task__text {
  margin-right: auto;
  margin-left: calc(var(--unit) * 2);
  word-break: break-all;
  mix-blend-mode: difference;
}

.subtask__item {
  margin-left: calc(var(--unit) * 4);
}
</style>
<!-- 180 -->
