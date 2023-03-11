<template>
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
    <a
      href="#"
      role="button"
      class="sidebar__shortcuts"
      @click="toggleHotkeysModal">
      <IconShortcuts class="sidebar__shortcuts-icon" />
      <span class="sidebar__shortcuts-text">показать сочетания клавиш</span>
    </a>
  </div>

  <HotkeysModal
    :is-show="isShowHotkeysModal"
    @close-modal="toggleHotkeysModal" />
</template>
<script>
import HotkeysModal from '@/components/HotkeysModal.vue'
import { hotkeys } from '@/hotkeys.js'
import { useFolderStore } from '@/store/folders.js'

export default {
  components: { HotkeysModal },
  data() {
    return {
      newFolder: '',
      isShowHotkeysModal: false,
    }
  },
  computed: {
    folders() {
      return useFolderStore().folders
    },
  },
  mounted() {
    hotkeys.showHotkeys.handler = this.toggleHotkeysModal
  },
  methods: {
    createNewFolder() {
      if (this.newFolder === '' || this.folders[this.newFolder]) return
      useFolderStore().createNewFolder(this.newFolder)
      this.newFolder = ''
    },
    toggleHotkeysModal() {
      this.isShowHotkeysModal = !this.isShowHotkeysModal
    },
  },
}
</script>

<style>
.sidebar__bottom {
  position: absolute;
  bottom: 0;
  padding: calc(var(--unit) * 2) 0;
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
  font-size: 14px;
  color: var(--color-text);
}
</style>
