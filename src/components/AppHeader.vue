<template>
  <header class="header">
    <button class="header__burger" @click="changeShowFolders">
      <IconBurger />
    </button>
    <input
      id="header-search"
      ref="headerSearch"
      name="header-search"
      type="search"
      placeholder="Поиск"
      autocomplete="off"
      class="header__search-input"
      @input="updateSearchFilter($event.target.value)" />
    <button class="header__create-post" @click="toggleCreatePostModal">
      Создать пост
    </button>
  </header>

  <TaskAdd :is-show="isShowCreatePost" @close-modal="toggleCreatePostModal" />
</template>

<script>
import TaskAdd from '@/components/TaskAdd.vue'
import { hotkeys } from '@/hotkeys.js'
import { useFolderStore } from '@/store/folders.js'

export default {
  components: { TaskAdd },
  data() {
    return {
      isShowCreatePost: false,
    }
  },
  mounted() {
    hotkeys.showPopup.handler = this.toggleCreatePostModal
    hotkeys.focusSearch.handler = () => {
      if (document.activeElement === this.$refs.headerSearch) {
        this.$refs.headerSearch.blur()
      } else {
        this.$refs.headerSearch.focus()
      }
    }
    hotkeys.showSidebar.handler = this.changeShowFolders
  },
  methods: {
    toggleCreatePostModal() {
      this.isShowCreatePost = !this.isShowCreatePost
    },
    updateSearchFilter(value) {
      useFolderStore().setSearchQuery(value)
      useFolderStore().setCurrentFolder(null)
    },
    changeShowFolders() {
      useFolderStore().toggleIsShowFolders()
    },
  },
}
</script>

<style>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-index-overlay);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: var(--height-header);
  padding: 0 calc(var(--unit) * 2);
  background: url('@/assets/grain.png') var(--color-bg);
  border-bottom: var(--border-width-main) solid var(--color-secondary);
}

.header__burger {
  display: none;
  width: var(--height-icon-main);
  height: var(--height-icon-main);
  cursor: pointer;
}

.header__burger svg {
  height: 100%;
}

.header__search-input {
  width: var(--width-header);
  min-width: var(--width-header);
  padding: var(--unit);
  margin: 0 calc(var(--unit) * 2);
  transition: var(--transition-fast);
}

.header__search-input:focus,
.header__search-input:not(:placeholder-shown) {
  transition: var(--transition-fast);
}

.header__create-post {
  padding: var(--unit) calc(var(--unit) * 2);
  color: var(--color-primary);
  background: var(--color-bg-primary);
  border: var(--border-width-main) var(--color-primary) solid;
  border-radius: var(--border-radius-normal);
}

.header__create-post::placeholder {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .header {
    justify-content: space-between;
  }

  .header__burger {
    display: block;
  }

  .visible-header {
    display: none;
  }

  .header__search-input:focus,
  .header__search-input:not(:placeholder-shown) {
    width: 100%;
    transition: var(--transition-fast);
  }

  .header__create-post {
    padding: var(--unit);
    font-size: var(--font-small);
    white-space: nowrap;
    border-width: 2px;
    border-radius: var(--border-radius-small);
  }
}
</style>
