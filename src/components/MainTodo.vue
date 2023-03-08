<template>
  <main class="main">
    <strong class="main__current-folder">
      {{ currentFolder ? currentFolder : 'Все папки' }}
    </strong>
    <task-status-list-links
      :statusList="statusList"
      @changeStatusList="changeStatusList" />
    <div class="main__tasks">
      <TasksItems
        :filteredTasks="filteredTasks"
        @showEditTaskPopup="showEditTaskPopup">
      </TasksItems>
    </div>
  </main>

  <task-edit
    v-if="currentEditTask"
    :task="currentEditTask.task"
    :folder="currentEditTask.folder"
    @closePopup="closeEditTaskPopup" />
</template>

<script>
import TaskAdd from './TaskAdd.vue'
import TaskStatusListLinks from './TakskStatusListLinks.vue'
import TasksItems from './TasksItems.vue'
import { useFolderStore } from '../store/folders.js'
import TaskEdit from './TaskEdit.vue'

export default {
  components: {
    TaskAdd,
    TaskStatusListLinks,
    TasksItems,
    TaskEdit,
  },
  data() {
    return {
      currentEditTask: null,
      statusList: 'all',
    }
  },
  computed: {
    currentFolder() {
      return useFolderStore().currentFolder
    },
    allFolders() {
      return Object.keys(this.folders)
    },
    folders() {
      return useFolderStore().folders
    },
    searchFilter() {
      return useFolderStore().searchFilter
    },
    filteredTasks() {
      const result = {}
      for (let i = 0; i < this.allFolders.length; i++) {
        if (this.currentFolder && this.currentFolder !== this.allFolders[i])
          continue
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
    showEditTaskPopup(folder, task) {
      this.currentEditTask = { folder, task }
    },
    changeStatusList(statusList) {
      this.statusList = statusList
    },
    closeEditTaskPopup() {
      this.currentEditTask = null
    },
  },
}
</script>

<style>
.main {
  margin-top: 60px;
  margin-left: 270px;
  height: 100%;
  overflow-y: auto;
  padding: 0 15px;
}
.main__task {
  /* box-shadow: rgb(99 99 99 / 50%) 0px 2px 8px 0px; */
  padding: 12px;
  padding-top: 24px;
  border-radius: var(--border-radius-normal);
  margin-bottom: 12px;
}
.search-result-folder {
  cursor: pointer;
  font-weight: 700;
  margin-bottom: 12px;
  display: inline-block;
  font-size: var(--font-medium);
}
.main__not-folder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 85px);
}
.main__current-folder {
  display: inline-block;
  font-size: var(--font-large);
  margin-bottom: 24px;
  word-break: break-all;
  max-width: 100%;
}
.task-status__links {
  margin-bottom: 24px;
}
.task-status__link {
  opacity: 1;
  transition: 0.3s;
  cursor: pointer;
}
.task-status__link_active {
  border-bottom: 1px solid orange;
}
.task-status__link:not(:last-child) {
  margin-right: 45px;
}
.task-status__link:hover {
  opacity: 0.5;
  transition: 0.3s;
}

@media (max-width: 768px) {
  .main {
    margin-left: 0;
  }
  .task-status__link:not(:last-child) {
    margin-right: 25px;
  }
}
</style>
