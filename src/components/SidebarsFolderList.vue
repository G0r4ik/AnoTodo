<template>
  <div class="sidebar__folders">
    <div
      tabindex="0"
      class="sidebar__folder"
      :class="{ sidebar__folder_active: !currentFolder }"
      @click="changeCurrentFolder('all')"
      @keypress.enter="changeCurrentFolder('all')">
      Все
    </div>
    <div
      tabindex="0"
      class="sidebar__folder"
      :class="{ sidebar__folder_active: currentFolder === 'Неотсортированное' }"
      @click="changeCurrentFolder('Неотсортированное')"
      @keypress.enter="changeCurrentFolder('Неотсортированное')">
      Неотсортированное
    </div>
    <div
      v-for="folder of allFolders"
      :key="folder"
      tabindex="0"
      class="sidebar__folder"
      :class="{ sidebar__folder_active: folder === currentFolder }"
      @click="changeCurrentFolder(folder)"
      @keypress.enter="changeCurrentFolder(folder)">
      <span class="sidebar__folder-text">{{ folder }} </span>
      <button class="sidebar__new-folder-delete" @click="deleteFolder(folder)">
        <IconCross />
      </button>
    </div>
  </div>
</template>

<script>
import { useFolderStore } from '@/store/folders.js'
export default {
  data() {
    return {}
  },
  computed: {
    allFolders() {
      return Object.keys(this.folders).filter(
        item => item !== 'Неотсортированное'
      )
    },
    currentFolder() {
      return useFolderStore().currentFolder
    },
    folders() {
      return useFolderStore().folders
    },
  },
  methods: {
    changeCurrentFolder(folder) {
      useFolderStore().setCurrentFolder(folder)
      if (folder === 'all') useFolderStore().setCurrentFolder(null)
    },
    deleteFolder(folder) {
      useFolderStore().setCurrentFolder(null)
      useFolderStore().deleteFolder(folder)
    },
  },
}
</script>

<style>
.sidebar__folders {
  height: 100%;
  margin-bottom: 80px;
  overflow-y: auto;
}

.sidebar__folder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--unit) 0;
  margin-bottom: var(--unit);
  cursor: pointer;
  border-radius: var(--border-radius-small);
}

.sidebar__folder-text {
  display: block;
  width: auto;
  max-width: calc(100% - 24px);
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.sidebar__new-folder-delete {
  width: 24px;
  height: 24px;
}

.sidebar__folder_active {
  font-weight: 700;
  color: var(--color-primary);
}
</style>
