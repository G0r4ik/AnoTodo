import { defineStore } from 'pinia'

export const useFolderStore = defineStore('folder', {
  state: () => ({
    isShowFolders: false,
    searchFilter: '',
    currentFolder: null,
    folders: { Неотсортированное: [] },
  }),
  actions: {
    setCurrentFolder(folder) {
      this.currentFolder = folder
      this.isShowFolders = false
    },

    changeIsShowFolders() {
      this.isShowFolders = !this.isShowFolders
    },

    setSearchFilter(searchText) {
      this.searchFilter = searchText
    },

    renameFolder(oldFolderName, newFolderName) {
      if (this.folders[newFolderName]) return
      this.folders[newFolderName] = this.folders[oldFolderName]
      delete this.folders[oldFolderName]
    },
    createNewFolder(folder) {
      if (!this.folders[folder]) {
        this.folders[folder] = []
      }
    },
    deleteFolder(folder) {
      if (folder === 'Неотсортированное') return
      delete this.folders[folder]
      if (this.currentFolder === folder) {
        this.currentFolder = null
      }
    },
    setFolders() {
      try {
        this.folders = JSON.parse(localStorage.getItem('folders')) || {
          Неотсортированное: [],
        }
      } catch (error) {
        console.log(error)
        localStorage.clear()
        this.folders = { Неотсортированное: [] }
      }
    },
    addTask(task, folder) {
      const currentFolder = this.folders[folder]
      currentFolder.push(task)
    },
    deleteTask(folder, task) {
      const currentFolder = this.folders[folder]
      const index = currentFolder.findIndex(item => item.id === task.id)
      if (index >= 0) currentFolder.splice(index, 1)
    },
    changeStatus(folder, task) {
      const currentTask = this.folders[folder].find(item => item.id === task.id)
      currentTask.isReady = !currentTask.isReady
      if (currentTask.isReady) {
        currentTask.subtasks.map(subtask => (subtask.isReady = true))
      }
    },
    changeStatusSubtask(folder, task, subtask) {
      const currentTask = this.folders[folder].find(item => item.id === task.id)
      const currentSubtask = currentTask.subtasks.find(item => item === subtask)
      currentSubtask.isReady = !currentSubtask.isReady
    },
    editSubtask(folder, task, subtask, text) {
      const currentTask = this.folders[folder].find(_task => _task === task)
      currentTask.subtasks.find(_subtask => subtask === _subtask).text = text
    },
    editTask(folder, task, text) {
      this.folders[folder].find(_task => _task === task).text = text
    },
    deleteSubtask(folder, task, subtask) {
      const currentTask = this.folders[folder].find(t => t.id === task.id)
      currentTask.subtasks = currentTask.subtasks.filter(s => s !== subtask)
    },
  },
})
