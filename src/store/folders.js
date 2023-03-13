import { defineStore } from 'pinia'

export const useFolderStore = defineStore('folder', {
  state: () => ({
    isShowFolders: false,
    searchFilter: '',
    currentFolder: null,
    folders: {},
    defaultFolders: ['Неотсортированное'],
    notIndexedFolders: ['Избранное'],
  }),
  actions: {
    allFolders() {
      return [...this.allIndexedFolders(), ...this.notIndexedFolders]
    },

    allIndexedFolders() {
      return [...this.defaultFolders, ...this.allUserFolders()]
    },

    allStaticFolders() {
      return [...this.defaultFolders, ...this.notIndexedFolders]
    },

    allUserFolders() {
      return [
        ...Object.keys(this.folders).filter(
          f =>
            !this.defaultFolders.includes(f) &&
            !this.notIndexedFolders.includes(f)
        ),
      ]
    },

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
      delete this.folders[folder]
      if (this.currentFolder === folder) this.currentFolder = null
    },
    setFolders() {
      try {
        const dateInLocalStorage = JSON.parse(localStorage.getItem('folders'))
        if (dateInLocalStorage) {
          this.folders = dateInLocalStorage
        } else {
          // this.folders = this.allStaticFolders()
          console.log(this.allStaticFolders().length)
          for (const folder of this.allStaticFolders()) {
            console.log(folder)
            this.folders[folder] = []
          }
        }
        // ['Неотсортированное', 'Избранное'] => {'Неотсортированное': [], 'Избранное': []}
      } catch (error) {
        console.log(error)
        localStorage.clear()
        console.log('123')
        for (const folder of this.allStaticFolders().length) {
          this.folders[folder] = []
        }
      }
    },
    changeStatus(folder, task) {
      console.log(folder, task)
      const currentTask = this.folders[folder].find(item => item.id === task.id)
      currentTask.isReady = !currentTask.isReady
      if (currentTask.isReady) {
        currentTask.subtasks.map(subtask => (subtask.isReady = true))
      }
    },
    toggleFavourite(folder, taskId) {
      const currentTask = this.folders[folder].find(item => item.id === taskId)
      currentTask.isFavourite = !currentTask.isFavourite
      if (currentTask.isFavourite) {
        this.folders['Избранное'].push(currentTask)
        console.log('lala')
      } else {
        //
        console.log('olol')
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
    editTask(folder, task, text) {
      this.folders[folder].find(_task => _task === task).text = text
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
    deleteSubtask(folder, task, subtask) {
      const currentTask = this.folders[folder].find(t => t.id === task.id)
      currentTask.subtasks = currentTask.subtasks.filter(s => s !== subtask)
    },
    addSubtask(folder, task, subtask) {
      this.folders[folder].find(_task => _task === task).subtasks.push(subtask)
    },
  },
})
