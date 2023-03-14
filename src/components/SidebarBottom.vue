<template>
  <div class="sidebar__bottom">
    <div class="sidebar__bottom-inner">
      <AppError
        v-if="error"
        :error="error"
        class="sidebar__new-folder-error"
        @close-error="closeError" />
      <div class="sidebar__new-folder">
        <input
          id="new-folder"
          ref="new-folder"
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
      timerOne: null,
      timerTwo: null,
      error: null,
    }
  },
  computed: {
    folders() {
      return useFolderStore().folders
    },
    duplicateFolder() {
      return useFolderStore().duplicateFolder
    },
  },
  mounted() {
    hotkeys.showHotkeys.handler = this.toggleHotkeysModal
    hotkeys.closeModal.handler = this.toggleHotkeysModal
  },
  methods: {
    closeError() {
      this.error = null
    },
    createNewFolder() {
      const store = useFolderStore()
      if (store.folders[this.newFolder]) {
        store.duplicateFolder = this.newFolder
        this.error = 'Уже существует такая папка'
        clearTimeout(this.timerOne)
        clearTimeout(this.timerTwo)
        this.timerOne = setTimeout(() => (store.duplicateFolder = null), 750)
        this.timerTwo = setTimeout(() => (this.error = null), 3000)
      } else {
        clearTimeout(this.timerOne)
        clearTimeout(this.timerTwo)
        store.createNewFolder(this.newFolder)
        store.duplicateFolder = null
        this.error = null
        this.newFolder = ''
      }
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
  height: var(--height-sidebar-bottom);
  padding: calc(var(--unit) * 2) 0;
}

.sidebar__bottom-inner {
  position: relative;
}

.sidebar__new-folder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: calc(var(--unit) * 2);
}

.sidebar__new-folder-error {
  position: absolute;
  bottom: var(--height-sidebar-bottom);
  width: 100%;
}

.sidebar__new-folder-input {
  width: 100%;
  padding: var(--unit) calc(var(--unit) * 2);
  color: var(--color-primary);
  background: var(--color-bg-primary);
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
  width: var(--height-icon-main);
  min-width: var(--height-icon-main);
  height: var(--height-icon-main);
  min-height: var(--height-icon-main);
  margin-left: calc(var(--unit) * 2);
  color: var(--color-primary);
  background: var(--color-bg-primary);
  border: var(--border-width-main) solid var(--color-primary);
  border-radius: var(--border-radius-circle);
}

.sidebar__shortcuts {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.sidebar__shortcuts-icon {
  width: var(--height-icon-small);
  height: var(--height-icon-small);
  margin-right: var(--unit);
}

.sidebar__shortcuts-text {
  font-size: var(--font-small);
  color: var(--color-text);
}
</style>
