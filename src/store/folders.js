import { defineStore } from 'pinia'

export const useFolderStore = defineStore('folder', {
  state: () => ({
    isFoldersVisible: false,
    searchQuery: '',
    folders: {}, // new Set?
    staticFolders: ['Неотсортированное'],
    notIndexedFolders: ['Избранное'],
    currentFolder: null,
    duplicateFolder: null,
  }),

  getters: {
    allFolders: ({ folders }) => Object.keys(folders),
    allIndexedFolders: ({ staticFolders, allUserFolders }) => [
      ...staticFolders,
      ...allUserFolders,
    ],
    allStaticFolders: ({ staticFolders, notIndexedFolders }) => [
      ...staticFolders,
      ...notIndexedFolders,
    ],
    allUserFolders: ({ folders, staticFolders, notIndexedFolders }) => {
      return Object.keys(folders).filter(
        folder =>
          !staticFolders.includes(folder) && !notIndexedFolders.includes(folder)
      )
    },
    allTasks: ({ folders }) => Object.values(folders).flat(),
    allFavouritesTasks: ({ allTasks }) => allTasks.filter(t => t.isFavourite),
  },

  actions: {
    // Folder management
    setFolders() {
      try {
        const dateInLocalStorage = JSON.parse(localStorage.getItem('folders'))
        if (dateInLocalStorage) {
          this.folders = dateInLocalStorage
        } else {
          for (const folder of this.allStaticFolders()) {
            this.addFolder(folder)
          }
        }
      } catch (error) {
        console.log(error)
        localStorage.clear()
        for (const folder of this.allStaticFolders()) {
          this.addFolder(folder)
        }
      }
    },
    addFolder(folder) {
      this.folders[folder] = []
    },
    renameFolder(oldFolderName, newFolderName) {
      this.folders[newFolderName] = this.folders[oldFolderName]
      this.deleteFolder(oldFolderName)
    },
    deleteFolder(folder) {
      delete this.folders[folder]
      if (this.currentFolder === folder) this.currentFolder = null
    },
    isFolderDuplicate(folderName) {
      return this.duplicateFolder === folderName
    },
    setCurrentFolder(folder) {
      this.currentFolder = folder
      this.isFoldersVisible = false
    },
    toggleIsShowFolders() {
      this.isFoldersVisible = !this.isFoldersVisible
    },

    // Search
    setSearchQuery(query) {
      this.searchQuery = query
    },

    //  Tasks
    addTask(task) {
      this.folders[task.folder].push(task)
    },
    editTask(task, text) {
      task.text = text
    },
    deleteTask(task) {
      const folder = task.folder
      this.folders[folder] = this.folders[folder].filter(t => t !== task)
    },
    toggleTaskFavourite(task) {
      task.isFavourite = !task.isFavourite
    },
    changeTaskStatus(task) {
      task.isReady = !task.isReady
    },

    //  Subtask
    addSubtask(task, subtask) {
      task.subtasks.push(subtask)
    },
    editSubtask(task, subtask, text) {
      task.subtasks.find(_subtask => subtask === _subtask).text = text
    },
    deleteSubtask(task, subtask) {
      task.subtasks = task.subtasks.filter(s => s !== subtask)
    },
    changeTaskStatusSubtask(subtask) {
      subtask.isReady = !subtask.isReady
    },
  },
})
