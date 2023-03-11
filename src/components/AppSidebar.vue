<template>
  <aside class="sidebar" :class="{ sidebar_hidden: !isShowFolders }">
    <div class="sidebar__inner">
      <div class="sidebar__top">
        <span class="sidebar__title">Папки</span>
        <div
          class="sidebar__edit"
          tabindex="0"
          @click="toggleEditFolderModal"
          @keypress.enter="toggleEditFolderModal">
          <IconEdit />
        </div>
      </div>
      <FoldersList />
      <div class="sidebar__bottom">
        <div class="sidebar__new-folder">
          <input
            id="new-folder"
            v-model.trim="newFolder"
            class="sidebar__new-folder-input"
            type="text"
            name="new-folder"
            placeholder="Новая папка"
            @keypress.enter="createNewFolder" />
          <button class="sidebar__new-folder-button" @click="createNewFolder">
            +
          </button>
        </div>
        <span class="sidebar__shortcuts" @click="toggleHotkeysModal">
          <IconShortcuts class="sidebar__shortcuts-icon" />
          <span class="sidebar__shortcuts-text">
            показать сочетания клавиш
          </span>
        </span>
      </div>
    </div>
  </aside>
  <transition name="fade">
    <FoldersRenameModal
      v-if="isShowEditFolder"
      @close-modal="toggleEditFolderModal" />
  </transition>
  <transition name="fade">
    <HotkeysModal v-if="isShowHotkeysModal" @close-modal="toggleHotkeysModal" />
  </transition>
</template>

<script>
import FoldersRenameModal from '@/components/FoldersRenameModal.vue'
import HotkeysModal from '@/components/HotkeysModal.vue'
import FoldersList from '@/components/FoldersList.vue'
import { useFolderStore } from '@/store/folders.js'
import { hotkeys } from '@/hotkeys.js'
export default {
  components: { FoldersRenameModal, HotkeysModal, FoldersList },
  data() {
    return {
      newFolder: '',
      isShowEditFolder: false,
      isShowHotkeysModal: false,
    }
  },
  computed: {
    isShowFolders() {
      return useFolderStore().isShowFolders
    },
    folders() {
      return useFolderStore().folders
    },
  },
  mounted() {
    hotkeys.showHotkeys.handler = this.toggleHotkeysModal
  },
  methods: {
    toggleHotkeysModal() {
      this.isShowHotkeysModal = !this.isShowHotkeysModal
    },
    toggleEditFolderModal() {
      this.isShowEditFolder = !this.isShowEditFolder
    },
    createNewFolder() {
      if (this.newFolder === '' || this.folders[this.newFolder]) return
      useFolderStore().createNewFolder(this.newFolder)
      this.folders[this.newFolder] = [] // ????
      this.newFolder = ''
    },
  },
}
</script>

<style>
.sidebar {
  position: fixed;
  top: var(--height-header);
  left: 0;
  z-index: var(--z-index-overlay);
  width: var(--width-sidebar);
  height: calc(100% - var(--height-header));
  padding: calc(var(--unit) * 2);
  background: url('@/assets/grain.png') var(--color-bg);
  border-right: var(--border-width-main) solid var(--color-secondary);
}

.sidebar__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.sidebar__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--unit);
  margin-bottom: calc(var(--unit) * 3);
  border-bottom: var(--border-width-main) solid var(--color-secondary);
}

.sidebar__title {
  font-weight: 700;
}

.sidebar__edit {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.sidebar__bottom {
  position: absolute;
  bottom: 0;
  padding: var(--unit) 0;
  background: url('@/assets/grain.png') var(--color-bg);
}

.sidebar__new-folder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: calc(var(--unit) * 2);
}

.sidebar__new-folder-input {
  width: 100%;
  height: 35px;
  padding: var(--unit) calc(var(--unit) * 2);
  margin-right: var(--unit);
  color: var(--color-primary);
  background: rgba(255, 180, 58, 0.2);
  border: var(--border-width-main) var(--color-primary) solid;
  border-radius: var(--border-radius-normal);
}

.sidebar__new-folder-input::placeholder {
  color: var(--color-primary);
}

.sidebar__new-folder-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  min-width: 35px;
  height: 35px;
  min-height: 35px;
  margin-left: var(--unit);
  color: var(--color-primary);
  background: rgba(255, 180, 58, 0.2);
  border: var(--border-width-main) solid var(--color-primary);
  border-radius: var(--border-radius-circle);
}

.sidebar__shortcuts {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.sidebar__shortcuts-icon {
  width: 15px;
  height: 15px;
  margin-right: var(--unit);
}

.sidebar__shortcuts-text {
  font-size: 16px;
  line-height: 0;
}

@media (max-width: 768px) {
  .sidebar_hidden {
    display: none;
  }
}
</style>
<!-- // 250  -80-->
