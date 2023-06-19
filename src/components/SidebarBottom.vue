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
          :placeholder="$t('newFolder')"
          @keypress.enter="addFolder" />
        <button class="sidebar__new-folder-button" @click="addFolder">+</button>
      </div>
      <a
        href="#"
        role="button"
        class="sidebar__shortcuts"
        @click="toggleHotkeysModal">
        <IconShortcuts class="sidebar__shortcuts-icon" />
        <span class="sidebar__shortcuts-text">
          {{ $t('keyboardShortcuts') }}
        </span>
      </a>
      <span
        tabindex="0"
        class="sidebar__date-manipulation"
        @click="toggleDateManipulation">
        <IconDownload class="sidebar__date-manipulation-icon" />
        <span class="sidebar__date-manipulation-text">
          {{ $t('export') }}\{{ $t('import') }}
        </span>
      </span>
      <span
        tabindex="0"
        class="sidebar__change-theme"
        @click="toggleChangeTheme">
        <IconSettings class="sidebar__change-theme-icon" />
        <span class="sidebar__change-theme-text">
          {{ $t('changeTheme') }}
        </span>
      </span>
      <span v-if="isHasUser" class="sidebar__auth" @click="google">
        <IconLogIn class="sidebar__auth-icon" />
        Войти
      </span>
      <span v-else class="sidebar__auth" @click="google">
        <IconLogOut class="sidebar__auth-icon" />
        Выйти
      </span>

      <span
        tabindex="0"
        class="sidebar__change-language"
        @click="toggleChangeLanguage">
        <IconLanguage class="sidebar__change-language-icon" />
        <span class="sidebar__change-language-text">
          {{ $t('changeLanguage') }}
        </span>
      </span>
    </div>
  </div>
  <teleport to="body">
    <transition name="fade">
      <HotkeysModal
        v-if="isShowHotkeysModal"
        @close-modal="toggleHotkeysModal" />
    </transition>
  </teleport>
  <teleport to="body">
    <transition name="fade">
      <ChangeTheme
        v-if="isShowChangeThemeModal"
        @close-modal="toggleChangeTheme" />
    </transition>
  </teleport>
  <teleport to="body">
    <transition name="fade">
      <ChangeLanguage
        v-if="isShowChangeLanguageModal"
        @close-modal="toggleChangeLanguage" />
    </transition>
  </teleport>
  <!-- {{ Object.fromEntries(folders) }} -->
</template>

<script>
import HotkeysModal from '@/components/HotkeysModal.vue'
import ChangeTheme from '@/components/ChangeTheme.vue'
import ChangeLanguage from './ChangeLanguage.vue'
import { hotkeys } from '@/helpers/hotkeys.js'
import { useFolderStore } from '@/store/folders.js'
import {
  downloadMarkdownAsFile,
  jsonToMarkdown,
} from '@/helpers/jsonToMarkdown.js'
import { getTasks } from '../helpers/firebaseApp'
export default {
  components: { HotkeysModal, ChangeTheme, ChangeLanguage },
  data() {
    return {
      newFolder: '',
      isShowHotkeysModal: false,
      isShowChangeThemeModal: false,
      isShowChangeLanguageModal: false,
      timerOne: null,
      timerTwo: null,
      error: null,
    }
  },
  computed: {
    isHasUser() {
      return localStorage.getItem('user')
    },
    folders() {
      return useFolderStore().folders
    },
    duplicateFolder() {
      return useFolderStore().duplicateFolder
    },
  },
  mounted() {
    hotkeys.showHotkeys.handler = this.toggleHotkeysModal
  },
  methods: {
    closeError() {
      this.error = null
    },
    addFolder() {
      const store = useFolderStore()
      clearTimeout(this.timerOne)
      clearTimeout(this.timerTwo)
      if (this.newFolder.length < 2) {
        this.error = this.$t('folderLengthError')
      } else if (store.folders[this.newFolder]) {
        store.duplicateFolder = this.newFolder
        this.error = this.$t('folderLengthErrorS')
        this.timerTwo = setTimeout(() => (this.error = null), 3000)
        this.timerOne = setTimeout(() => (store.duplicateFolder = null), 750)
      } else {
        store.addFolder(this.newFolder)
        store.duplicateFolder = null
        this.error = null
        this.newFolder = ''
      }
    },
    toggleChangeTheme() {
      this.isShowChangeThemeModal = !this.isShowChangeThemeModal
    },
    toggleChangeLanguage() {
      this.isShowChangeLanguageModal = !this.isShowChangeLanguageModal
    },
    toggleHotkeysModal() {
      this.isShowHotkeysModal = !this.isShowHotkeysModal
    },
    toggleDateManipulation() {
      downloadMarkdownAsFile(jsonToMarkdown(), 'task1.md')
      // exportToPdf()
    },
  },
}
</script>

<style>
.sidebar__bottom {
  position: absolute;
  bottom: 0;
  height: var(--height-sidebar-bottom);
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

.sidebar__shortcuts,
.sidebar__date-manipulation,
.sidebar__change-theme,
.sidebar__change-language,
.sidebar__auth {
  margin-bottom: var(--unit);
}

.sidebar__shortcuts,
.sidebar__date-manipulation,
.sidebar__change-theme,
.sidebar__change-language,
.sidebar__auth {
  display: flex;
  align-items: center;
  font-size: var(--font-small);
  cursor: pointer;
}

.sidebar__shortcuts-icon,
.sidebar__change-theme-icon,
.sidebar__change-language-icon,
.sidebar__auth-icon,
.sidebar__date-manipulation-icon {
  width: 20px;
  height: 20px;
  margin-right: calc(var(--unit) * 2);
}

.sidebar__shortcuts-text,
.sidebar__change-theme-text,
.sidebar__change-language-text,
.sidebar__date-manipulation-text,
.sidebar__auth {
  font-size: 18px;
  color: var(--color-text);
}
</style>
