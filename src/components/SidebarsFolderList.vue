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
      v-for="folder of allStaticFolder"
      :key="folder"
      tabindex="0"
      class="sidebar__folder"
      :class="{ sidebar__folder_active: currentFolder === folder }"
      @click="changeCurrentFolder(folder)"
      @keypress.enter="changeCurrentFolder(folder)">
      {{ folder }}
    </div>
    <div
      v-for="folder of allUserFolders"
      :key="folder"
      tabindex="0"
      class="sidebar__folder"
      :class="{ sidebar__folder_active: folder === currentFolder }"
      @click="changeCurrentFolder(folder)"
      @keypress.enter="changeCurrentFolder(folder)">
      <span class="sidebar__folder-text">{{ folder }}</span>
      <button
        class="sidebar__new-folder-delete"
        @click.stop="deleteFolder(folder)">
        <IconCross />
      </button>
    </div>
  </div>
</template>

<script>
import { useFolderStore } from '@/store/folders.js'

export default {
  computed: {
    allUserFolders() {
      return useFolderStore().allUserFolders()
    },
    allStaticFolder() {
      return useFolderStore().allStaticFolders()
    },
    currentFolder() {
      return useFolderStore().currentFolder
    },
  },
  methods: {
    changeCurrentFolder(folder) {
      useFolderStore().setCurrentFolder(folder === 'all' ? null : folder)
    },
    deleteFolder(folder) {
      useFolderStore().deleteFolder(folder)
    },
  },
}
</script>

<style>
.sidebar__folders {
  height: 100%;
  margin-bottom: var(--height-sidebar-bottom);
  overflow-y: auto;
}

.sidebar__folder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--unit) 0;
  margin-bottom: var(--unit);
  cursor: pointer;
}

.sidebar__folder-text {
  display: block;
  max-width: calc(100% - var(--height-icon-main));
  overflow-wrap: break-word;
}

.sidebar__new-folder-delete {
  width: var(--height-icon-main);
  height: var(--height-icon-main);
}

.sidebar__folder_active {
  color: var(--color-primary);
}
</style>
