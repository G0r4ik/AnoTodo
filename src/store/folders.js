import { defineStore } from 'pinia'

export const useFolderStore = defineStore('folder', {
  state: () => ({
    isFoldersVisible: false,
    _searchQuery: '',
    folders: new Map(),
    copyOfFolders: new Map(),
    staticFolders: ['Неотсортированное'],
    notIndexedFolders: ['Избранное'],
    currentFolder: null,
    duplicateFolder: null,

    includedFolders: [],
    excludedFolders: [],
    RegExpIncludedFolders: null,
    RegExpExcludedFolders: null,
    lockedFolders: JSON.parse(localStorage.getItem('lockedFolders')) || [],
  }),

  getters: {
    searchQuery: ({ _searchQuery }) => _searchQuery.trim().toLowerCase(),
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
    setFolders(value = null) {
      try {
        const folders = localStorage.getItem('folders')
        if (!value && folders) {
          const dataInLocalStorage = new Map(JSON.parse(folders))
          this.folders = new Map(dataInLocalStorage)
        } else if (value) {
          this.folders = new Map(JSON.parse(value))
          for (const folder of this.allStaticFolders) {
            this.addFolder(folder)
          }
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
      this._searchQuery = query
    },
    includeFolders(folders) {
      this.includedFolders = folders
    },
    excludeFolders(folders) {
      this.excludedFolders = folders
    },
    changeRegExp(fixme2) {
      if (fixme2 === 'include') this.RegExpIncludedFolders = null
      if (fixme2 === 'exclude') this.RegExpExcludedFolders = null
    },

    //  Tasks
    addTask(task) {
      this.folders.get(task.folder).push(task)
    },
    editTask(task, newTask) {
      const currentFolder = this.folders.get(task.folder)
      const newFolder = this.folders.get(newTask.folder)
      if (currentFolder === newFolder) {
        const idx = currentFolder.findIndex(item => task.id === item.id)
        currentFolder[idx] = { ...newTask }
      } else {
        const length_ = newFolder.length
        newFolder[length_] = { ...newTask }
        const idx = currentFolder.findIndex(item => task.id === item.id)
        currentFolder.splice(idx, 1)
      }
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
    //
    //
    //
    pushLockedFolders(folder) {
      const folders = JSON.parse(localStorage.getItem('lockedFolders')) || []
      folders.push(folder)
      localStorage.setItem('lockedFolders', JSON.stringify(folders))
      this.lockedFolders = folders
    },
    deleteLockedFolder(folder) {
      const folders = JSON.parse(localStorage.getItem('lockedFolders')) || []
      const idx = folders.findIndex(item => item === folder)
      folders.splice(idx, 1)
      localStorage.setItem('lockedFolders', JSON.stringify(folders))
      this.lockedFolders = folders
    },
  },
})
