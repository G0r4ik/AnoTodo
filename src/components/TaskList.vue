<template>
  <div class="main__tasks">
    <template v-for="folder of allFolders" :key="folder">
      <div v-if="filteredTasks[folder].length" class="main__tasks-item task">
        <strong
          v-if="!currentFolder && filteredTasks[folder].length"
          class="task__folder"
          @click="setCurerentFolder(folder)">
          {{ folder }}
        </strong>

        <div
          v-for="task of filteredTasks[folder]"
          :key="task"
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
            :key="subtask"
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
      return Object.values(this.filteredTasks).every(item => item.length === 0)
    },
    currentFolder() {
      return useFolderStore().currentFolder
    },
    allFolders() {
      return Object.keys(this.folders)
    },
    folders() {
      return useFolderStore().folders
    },
    filteredTasks() {
      const result = {}
      for (let i = 0; i < this.allFolders.length; i++) {
        if (this.currentFolder && this.currentFolder !== this.allFolders[i]) {
          continue
        }
        result[this.allFolders[i]] = this.folders[this.allFolders[i]].filter(
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
  cursor: pointer;
  font-weight: 700;
  margin-bottom: calc(var(--unit) * 2);
  display: inline-block;
  font-size: var(--font-medium);
}

.main__task {
  padding: calc(var(--unit) * 2);
  padding-top: calc(var(--unit) * 5);
  border-radius: var(--border-radius-normal);
  margin-bottom: calc(var(--unit) * 2);
}

.main__not-folder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 85px);
}

.task-status__links {
  margin-bottom: calc(var(--unit) * 5);
}

.task-status__link {
  opacity: 1;
  transition: 0.3s;
  cursor: pointer;
}

.task-status__link_active {
  border-bottom: var(--border-width-small) solid var(--color-primary);
}

.task-status__link:not(:last-child) {
  margin-right: calc(var(--unit) * 3);
}

.task-status__link:hover {
  opacity: 0.5;
  transition: 0.3s;
}

.main__task-not-found {
  font-size: var(--font-large);
  text-align: center;
  opacity: 0.3;
}

.task__wrapper {
  margin-bottom: calc(var(--unit) * 2);
  padding: calc(var(--unit) * 2);
  border-radius: var(--border-radius-normal);
}

.tasks__item {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: var(--unit);
}

.task_active {
  text-decoration: line-through;
  text-decoration-color: var(--color-danger);
  opacity: 0.95;
  color: var(--color-danger);
}

.task__status {
  cursor: pointer;
  min-width: 20px;
  min-height: 20px;
  border: var(--border-width-main) solid var(--color-text);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-circle);
  margin-right: var(--unit);
  background: transparent;
}

.task_active > .task__status {
  background: var(--color-text);
  border: 5px solid var(--color-primary);
}

.task__edit,
.task__delete,
.task__show-subtasks {
  cursor: pointer;
  width: 24px;
  height: 24px;
}

.task__text {
  margin-left: calc(var(--unit) * 2);
  margin-right: auto;
  word-break: break-all;
  mix-blend-mode: difference;
}

.subtask__item {
  margin-left: calc(var(--unit) * 4);
}
</style>
<!-- 180 -->
