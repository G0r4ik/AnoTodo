<script>
import AppHeader from './components/AppHeader.vue'
import AppTasks from './components/AppTasks.vue'
import TaskAdd from './components/TaskAdd.vue'
import AppSidebar from './components/AppSidebar.vue'
import TaskEdit from './components/TaskEdit.vue'
import { toHandlers } from 'vue'

export default {
  components: { AppHeader, TaskAdd, AppTasks, AppSidebar, TaskEdit },

  data() {
    return {
      searchFilter: '',
      folders: {},
      currentFolder: '',
      list: 'all',
      newId: 0,
      currentEditTask: null,
      isShowFolders: true,
    }
  },

  computed: {
    allFolders() {
      return Object.keys(this.folders)
    },
    filteredTasks() {
      const result = {}

      if (this.currentFolder) {
        this.folders[this.currentFolder].map(task => {
          const isActive = this.list === 'ready' && task.isReady
          const isReady = this.list === 'active' && !task.isReady
          if (!task.text.includes(this.searchFilter)) return

          if (this.list === 'all' || isActive || isReady) {
            if (!result[this.currentFolder]) result[this.currentFolder] = []
            result[this.currentFolder].push(task)
          }
        })
        return result
      }
      for (let i = 0; i < this.allFolders.length; i++) {
        this.folders[this.allFolders[i]].map(task => {
          const isActive = this.list === 'ready' && task.isReady
          const isReady = this.list === 'active' && !task.isReady
          if (!task.text.includes(this.searchFilter)) return

          if (this.list === 'all' || isActive || isReady) {
            if (!result[this.allFolders[i]]) result[this.allFolders[i]] = []
            result[this.allFolders[i]].push(task)
          }
        })
      }
      return result
    },
  },

  watch: {
    folders: {
      handler(newValue) {
        localStorage.setItem('folders', JSON.stringify(newValue))
      },
      deep: true,
    },
  },

  mounted() {
    this.folders = JSON.parse(localStorage.getItem('folders')) || {}
    document.body.addEventListener('keyup', this.handleKeydown)
  },

  methods: {
    handleKeydown(event) {
      if (event.ctrlKey && event.key === 'q') {
        console.log(this.$refs)
        this.$refs.header.$el.querySelector('#header-search').focus()
      }
    },
    changeStatus(folder, _task) {
      console.log(_task)
      const task = this.folders[folder].find(item => _task.id === item.id)
      task.isReady = !task.isReady
      if (task.isReady) {
        task.subtasks.map(subtask => (subtask.isReady = true))
      }
    },
    changeStatusSubtask(folder, task, subtask) {
      const _task = this.folders[folder].find(item => task.id === item.id)
      const _subtask = _task.subtasks.find(item => item === subtask)
      _subtask.isReady = !_subtask.isReady
    },
    addTask(task) {
      this.newId++
      task.id = `${this.newId}_${+new Date()}`
      this.folders[this.currentFolder].push(task)
    },
    deleteTask(folder, task) {
      for (let i = 0; i < this.folders[folder].length; i++) {
        if (this.folders[folder][i].id === task.id)
          return this.folders[folder].splice(i, 1)
      }
    },
    updateSearchFilter(value) {
      this.searchFilter = value
      this.currentFolder = null
    },
    deleteSubtask(folder, task, subtask) {
      const currentTask = this.folders[folder].find(t => t.id === task.id)
      currentTask.subtasks = currentTask.subtasks.filter(s => s !== subtask)
    },
    changeCurrentFolder(folder) {
      if (folder === 'all') return (this.currentFolder = null)
      this.currentFolder = folder
    },
    createNewFolder(folder) {
      if (this.folders[folder]) {
        return
      }

      this.folders[folder] = []
    },
    changeFolder(folder) {
      console.log(folder)
      this.currentFolder = folder
    },
    changeList(list) {
      this.list = list
    },
    deleteFolder(folder) {
      console.log(folder)
      this.currentFolder = null
      delete this.folders[folder]
    },

    editSubtask(folder, task, subtask, text) {
      const currentTask = this.folders[folder].find(_task => _task === task)
      currentTask.subtasks.find(_subtask => subtask === _subtask).text = text
    },
    editTask(folder, task, text) {
      this.folders[folder].find(_task => _task === task).text = text
    },
    showEditTaskPopup(folder, task) {
      this.currentEditTask = { folder, task }
    },
    closeEditTaskPopup() {
      this.currentEditTask = null
    },
    changeShowFolders() {
      this.isShowFolders = !this.isShowFolders
    },
  },
}
</script>
<template>
  <TaskEdit
    v-if="currentEditTask"
    :task="currentEditTask.task"
    :folder="currentEditTask.folder"
    @closePopup="closeEditTaskPopup"
    @editSubtask="editSubtask"
    @editTask="editTask"
  />
  <AppHeader
    :searchFilter="searchFilter"
    @inputSearch="updateSearchFilter"
    @changeShowFolders="changeShowFolders"
    ref="header"
  />
  <main class="main">
    <AppSidebar
      :folders="allFolders"
      :currentFolder="currentFolder"
      :isShowFolders="isShowFolders"
      @createNewFolder="createNewFolder"
      @changeCurrentFolder="changeCurrentFolder"
      @deleteFolder="deleteFolder"
    />
    <div v-if="!allFolders.length" class="not-select-folder">
      Создайте папку
    </div>
    <div v-else class="main__inner">
      <strong class="current-folder">
        {{ !currentFolder ? 'Все папки' : currentFolder }}
      </strong>
      <div class="task-status__links">
        <span
          tabindex="0"
          class="task-status__link"
          :class="{ 'task-status__link_active': list === 'all' }"
          @click="changeList('all')"
          @keypress.enter="changeList('all')"
        >
          Все
        </span>
        <span
          class="task-status__link"
          tabindex="0"
          :class="{ 'task-status__link_active': list === 'active' }"
          @click="changeList('active')"
          @keypress.enter="changeList('active')"
        >
          Активные
        </span>
        <span
          class="task-status__link"
          tabindex="0"
          :class="{ 'task-status__link_active': list === 'ready' }"
          @click="changeList('ready')"
          @keypress.enter="changeList('ready')"
        >
          Выполненные
        </span>
      </div>

      <TaskAdd
        v-if="currentFolder"
        @addTask="addTask"
        :newId="newId"
        :folders="allFolders"
        :currentFolder="currentFolder"
        @changeFolder="changeFolder"
      />

      <div class="main__tasks">
        <div v-for="folder of Object.keys(filteredTasks)" class="main__task">
          <strong
            v-if="!currentFolder"
            class="search-result-folder"
            @click="currentFolder = folder"
          >
            {{ folder }}
          </strong>
          <AppTasks
            :tasks="filteredTasks[folder]"
            :folder="folder"
            @changeStatus="changeStatus"
            @deleteTask="deleteTask"
            @changeStatusSubtask="changeStatusSubtask"
            @deleteSubtask="deleteSubtask"
            @showEditTaskPopup="showEditTaskPopup"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style>
@font-face {
  font-family: 'EntezareZohoor2';
  src: url('/ofont.ru_Sriracha.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*:focus {
  /* border: 10px solid red; */
}
body {
  background: white;
  /* background-color: #2195cb; */
  /* background: orange; */
  color: var(--color-text);
  font-size: 20px;
  font-family: 'Arial', sans-serif;
  background-image: url('./assets/grain.png');
  background-image: url('./assets/grain.png');
  font-family: 'EntezareZohoor2';
  max-height: 100vh;
}

.main {
  height: calc(100vh - 55px);
  overflow-y: auto;
  /* padding: 15px; */
  margin-top: 55px;
  /* margin-left: 200px; */
  display: flex;
}

.main__inner {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 15px;
}

.main__task {
  box-shadow: rgb(99 99 99 / 50%) 0px 2px 8px 0px;
  padding: 12px;
  padding-top: 24px;
  border-radius: 12px;
  margin-bottom: 12px;
}

.search-result-folder {
  cursor: pointer;
  font-weight: 700;
  margin-bottom: 12px;
  display: inline-block;
  font-size: 28px;
}
.main {
}
.not-select-folder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 85px);
}
.current-folder {
  display: inline-block;
  font-size: 40px;
  /* margin-top: 24px; */
  margin-bottom: 24px;
  /* margin-top: 60px; */
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
  border-bottom: 1px solid orangered;
}
.task-status__link:not(:last-child) {
  margin-right: 45px;
}
.task-status__link:hover {
  opacity: 0.5;
  transition: 0.3s;
}
button {
  color: black;
}
input,
select {
  border: 2px solid var(--color-gray);
  border-radius: 6px;
  background: none;
  color: black;
  padding: 6px;
}
select {
  padding: 0;
}
</style>
