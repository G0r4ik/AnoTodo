<template>
  <aside class="sidebar" :class="{ sidebar_hidden: !isShowFolders }">
    <div class="sidebar__top">
      <div class="sidebar__title">Папки</div>
      <div
        class="sidebar__edit"
        @click="showIsEditFolder"
        @keypress.enter="showIsEditFolder"
        tabindex="0">
        <IconEdit />
      </div>
    </div>
    <div class="sidebar__folders">
      <div
        @click="changeCurrentFolder('all')"
        @keypress.enter="changeCurrentFolder('all')"
        tabindex="0"
        class="sidebar__folder"
        :class="{ sidebar__folder_active: !currentFolder }">
        Все
      </div>
      <div
        v-for="folder of allFolders"
        @click="changeCurrentFolder(folder)"
        @keypress.enter="changeCurrentFolder(folder)"
        tabindex="0"
        class="sidebar__folder"
        :class="{ sidebar__folder_active: folder === currentFolder }">
        <span class="sidebar__folder-text">{{ folder }} </span>
        <div
          class="sidebar__new-folder-delete"
          @click.stop="deleteFolder(folder)">
          <IconCross />
        </div>
      </div>
    </div>
    <div class="sidebar__new-folder">
      <input
        v-model.trim="newFolder"
        class="sidebar__new-folder-input"
        type="text"
        name="new-folder"
        id="new-folder"
        placeholder="Новая папка"
        @keypress.enter="createNewFolder" />
      <button class="sidebar__new-folder-button" @click="createNewFolder">
        +
      </button>
    </div>
  </aside>
  <FolderEdit
    v-if="isShowEditFolder"
    @closePopup="closeIsEditFolder"></FolderEdit>
</template>

<script>
import { useFolderStore } from '../store/folders.js'
import FolderEdit from './FolderEdit.vue'

export default {
  components: { FolderEdit },

  data() {
    return {
      newFolder: '',
      isShowEditFolder: false,
    }
  },
  computed: {
    isShowFolders() {
      return useFolderStore().isShowFolders
    },
    folders() {
      return useFolderStore().folders
    },
    allFolders() {
      return Object.keys(this.folders)
    },
    currentFolder() {
      return useFolderStore().currentFolder
    },
  },
  methods: {
    showIsEditFolder() {
      this.isShowEditFolder = true
    },
    closeIsEditFolder() {
      this.isShowEditFolder = false
    },
    deleteFolder(folder) {
      useFolderStore().setCurrentFolder(null)
      useFolderStore().deleteFolder(folder)
    },
    createNewFolder() {
      if (this.newFolder === '' || this.folders[this.newFolder]) return
      useFolderStore().createNewFolder(this.newFolder)
      this.folders[this.newFolder] = []
      this.newFolder = ''
    },
    changeCurrentFolder(folder) {
      useFolderStore().setCurrentFolder(folder)
      if (folder === 'all') useFolderStore().setCurrentFolder(null)
    },
  },
}
</script>

<style>
.sidebar {
  position: fixed;
  top: 50px;
  left: 0;
  width: 270px;
  height: calc(100% - 50px);
  padding: calc(var(--unit) * 2);
  overflow-y: auto;
  background-color: var(--color-bg);
  background: url('../assets/grain.png');
  border-right: var(--border-width-main) solid var(--color-secondary);
}
.sidebar__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: calc(var(--unit) * 3);
  padding-bottom: 6px;
  border-bottom: 1px solid var(--color-secondary);
}
.sidebar__title {
  font-weight: 700;
}
.sidebar__edit {
  cursor: pointer;
  width: 20px;
  height: 20px;
}
.sidebar__folders {
  margin-bottom: calc(var(--unit) * 2);
}
.sidebar__folder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--unit) 0;
  margin-bottom: var(--unit);
  border-radius: var(--border-radius-small);
  /* box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px; */
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
.sidebar__new-folder {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}
.sidebar__new-folder-input {
  background: rgba(255, 180, 58, 0.2);
  border: var(--border-width-main) var(--color-primary) solid;
  border-radius: var(--border-radius-normal);
  color: var(--color-primary);
  margin-right: 6px;
  padding: 5px 10px;
  width: 100%;
  max-width: 150px;
}
.sidebar__new-folder-input::placeholder {
  color: var(--color-primary);
}
.sidebar__new-folder-button {
  align-items: center;
  background: rgba(255, 180, 58, 0.2);
  border: var(--border-width-main) solid var(--color-primary);
  border-radius: var(--border-radius-circle);
  color: var(--color-primary);
  display: inline-flex;
  height: 30px;
  justify-content: center;
  margin-left: 6px;
  min-height: 30px;
  min-width: 30px;
  width: 30px;
}
@media (max-width: 768px) {
  .sidebar {
    left: 0;
    position: fixed;
  }
  .sidebar_hidden {
    display: none;
  }
}
</style>
