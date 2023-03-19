import { defineStore } from 'pinia'

export const useFolderStore = defineStore('folder', {
  state: () => ({
    isFoldersVisible: false,
    searchQuery: '',
    folders: new Map(),
    staticFolders: ['Неотсортированное'],
    notIndexedFolders: ['Избранное'],
    currentFolder: null,
    duplicateFolder: null,
  }),

  getters: {
    allFolders: ({ folders }) => [...folders.keys()],
    allIndexedFolders: ({ staticFolders, allUserFolders }) => [
      ...staticFolders,
      ...allUserFolders,
    ],
    allStaticFolders: ({ staticFolders, notIndexedFolders }) => [
      ...staticFolders,
      ...notIndexedFolders,
    ],
    allUserFolders: ({ folders, staticFolders, notIndexedFolders }) => {
      return [...folders.keys()].filter(
        folder =>
          !staticFolders.includes(folder) && !notIndexedFolders.includes(folder)
      )
    },
    allTasks: ({ folders }) => [...folders.values()].flat(),
    allFavouritesTasks: ({ allTasks }) => allTasks.filter(t => t.isFavourite),
  },

  actions: {
    // Folder management
    setFolders() {
      try {
        const folders = localStorage.getItem('folders')
        if (folders) {
          const dataInLocalStorage = new Map(JSON.parse(folders))
          this.folders = new Map(dataInLocalStorage)
        } else {
          for (const folder of this.allStaticFolders) {
            this.addFolder(folder)
          }
        }
      } catch (error) {
        console.log(error)
        localStorage.clear()
        for (const folder of this.allStaticFolders) {
          this.addFolder(folder)
        }
      }
    },
    addFolder(folder) {
      this.folders.set(folder, [])
    },
    renameFolder(oldFolderName, newFolderName) {
      this.folders.set(newFolderName, this.folders.get(oldFolderName))
      this.folders.delete(oldFolderName)
    },
    deleteFolder(folder) {
      this.folders.delete(folder)
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
      this.folders.get(task.folder).push(task)
    },
    editTask(task, text) {
      task.text = text
    },
    deleteTask(task) {
      const folder = task.folder
      this.folders.set(
        folder,
        this.folders.get(folder).filter(t => t !== task)
      )
    },
    toggleTaskFavourite(task) {
      task.isFavourite = !task.isFavourite
    },
    changeTaskStatus(task) {
      task.isReady = !task.isReady
    },

    //  Subtask
    addSubtask(task, subtask) {
      console.log(task)
      console.log(subtask)
      task.subtasks.push(subtask)
    },
    editSubtask(task, subtask, text) {
      console.log(task, subtask)
      console.log(task.subtasks.find(_subtask => subtask.id === _subtask.id))
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
