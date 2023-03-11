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
      v-for="folder of allFolders"
      :key="folder"
      tabindex="0"
      class="sidebar__folder"
      :class="{ sidebar__folder_active: folder === currentFolder }"
      @click="changeCurrentFolder(folder)"
      @keypress.enter="changeCurrentFolder(folder)">
      <span class="sidebar__folder-text">{{ folder }} </span>
      <div class="sidebar__new-folder-delete" @click="deleteFolder(folder)">
        <IconCross />
      </div>
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
      return Object.keys(this.folders)
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
  margin-bottom: 70px;
  height: 100%;
  overflow-y: auto;
}

.sidebar__folder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--unit) 0;
  margin-bottom: var(--unit);
  border-radius: var(--border-radius-small);
  cursor: pointer;
}

.sidebar__folder-text {
  display: block;
  max-width: calc(100% - 24px);
  overflow-wrap: break-word;
  word-wrap: break-word;
  width: auto;
}

.sidebar__new-folder-delete {
  height: 24px;
  width: 24px;
}

.sidebar__folder_active {
  color: var(--color-primary);
  font-weight: 700;
}
</style>
