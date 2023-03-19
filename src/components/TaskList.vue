<template>
  <div class="main__tasks">
    <template v-for="folder of Object.keys(filteredTasks)" :key="folder">
      <div v-if="filteredTasks[folder]?.length" class="main__tasks-item task">
        <strong
          v-if="!currentFolder && filteredTasks[folder].length"
          class="task__folder"
          @click="setCurerentFolder(folder)">
          {{ folder }}
        </strong>

        <div ref="tasks" :data-folder="folder" class="task__wrapper">
          <div
            v-for="task of filteredTasks[folder]"
            :key="task.id"
            draggable="true"
            :data-task-id="task.id"
            :data-task-folder="folder"
            class="task__wrapper-item"
            :style="{ background: task.style.bg, color: task.style.color }">
            <div class="tasks__item" :class="{ task_active: task.isReady }">
              <TaskListItem
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
                :type="'subtask'"
                :task="task"
                :subtask="subtask"
                :list="subtask"
                @toggle-subtasks-list="toggleSubtasksList" />
            </div>
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
import Sortable from 'sortablejs'

export default {
  components: { TaskListItem },
  props: {
    statusList: { type: String, default: 'all' },
  },
  data() {
    return {
      currentTask: { taskId: null, folder: null },
    }
  },
  computed: {
    searchQuery() {
      return useFolderStore().searchQuery
    },
    isEmptyTasks() {
      return Object.values(this.filteredTasks).every(item => item?.length === 0)
    },
    currentFolder() {
      return useFolderStore().currentFolder
    },
    allIndexedFolders() {
      return useFolderStore().allIndexedFolders
    },
    allFolders() {
      return useFolderStore().allFolders
    },
    allFavouritesTasks() {
      return useFolderStore().allFavouritesTasks
    },
    folders() {
      return useFolderStore().folders
    },
    filteredTasks() {
      const result = {}
      if (this.currentFolder === 'Избранное') {
        return { Избранное: this.allFavouritesTasks.filter(this.func) }
      }
      for (let i = 0; i < this.allIndexedFolders.length; i++) {
        if (
          this.currentFolder &&
          this.currentFolder !== this.allIndexedFolders[i]
        ) {
          continue
        }

        result[this.allIndexedFolders[i]] = this.folders
          .get(this.allIndexedFolders[i])
          ?.filter(this.func)
      }
      return result
    },
  },

  updated() {
    const elements = this.$refs.tasks
    if (!elements) return
    const folders = this.folders
    for (const element of elements) {
      Sortable.create(element, {
        draggable: '.task__wrapper-item',
        group: { name: 'folders', pull: true, put: true },
        onEnd: event => {
          if (!event.target) return
          const currentFolder =
            useFolderStore().currentFolder ||
            event.target.getAttribute('data-folder')
          const targetFolder =
            useFolderStore().currentFolder ||
            event.to.getAttribute('data-folder')
          const oldIndex = event.oldIndex
          const newIndex = event.newIndex
          if (currentFolder === targetFolder && oldIndex === newIndex) return
          const currentTask = folders.get(currentFolder)[oldIndex]
          const currentTasks = folders.get(currentFolder)

          const targetTasks = folders.get(targetFolder)
          currentTask.folder = targetFolder
          if (currentTasks.length === 1) event.item.style.display = 'none'
          currentTasks.splice(oldIndex, 1)
          targetTasks.splice(newIndex, 0, currentTask)
        },
      })
    }

    for (const task of elements) {
      for (const task2 of task.children) {
        task2.addEventListener('dragstart', e => {
          const taskId = e.target.getAttribute('data-task-id')
          const taskFolder = e.target.getAttribute('data-task-folder')
          c.taskId = taskId
          c.folder = taskFolder
        })
      }
    }
    const c = this.currentTask

    const dropzone = [...document.querySelectorAll('.sidebar__folder')]
    const func = this.func2
    dropzone.forEach(el => {
      el.removeEventListener('drop', func)
      el.addEventListener('drop', func)
    })
  },

  methods: {
    func2(e) {
      const folders = this.folders
      const c = this.currentTask
      if (!c.taskId) return
      e.preventDefault()
      const target = e.target.closest('.sidebar__folder')
      const folder = target.getAttribute('data-folder')
      const currentFolder = folders.get(c.folder)
      const idx = currentFolder.findIndex(item => item.id === c.taskId)
      const currentTask = currentFolder.splice(idx, 1)[0]
      currentTask.folder = c.folder
      folders.get(folder).push(currentTask)
      c.folder = null
      c.taskId = null
    },

    func(task) {
      if (!task.text.includes(this.searchQuery)) return false
      if (this.statusList === 'ready' && !task.isReady) return false
      if (this.statusList === 'active' && task.isReady) return false
      return true
    },
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

.task__wrapper-item {
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
  /* color: var(--color-danger); */
  text-decoration: line-through;
  text-decoration-color: var(--color-danger);
  opacity: 0.75;
}

.task__edit,
.task__delete,
.task__show-subtasks {
  width: var(--height-icon-main);
  height: var(--height-icon-main);
  cursor: pointer;
}
</style>
<!-- 180 -->
