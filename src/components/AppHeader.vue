<template>
  <header class="header">
    <div class="header__burger" @click="changeShowFolders">
      <IconBurger />
    </div>
    <div class="header__search">
      <input
        id="header-search"
        :ref="'headerSearch'"
        class="header__search-input"
        type="search"
        name="search"
        placeholder="Поиск"
        autocomplete="off"
        @input="updateSearchFilter($event.target.value)" />
    </div>
    <button class="header__create-post" @click="showCreatePostModal">
      Создать пост
    </button>
  </header>

  <transition name="fade">
    <TaskAdd v-if="isShowCreatePost" @close-modal="closeCreatePostModal" />
  </transition>
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
    hotkeys.showPopup.handler = this.showCreatePostModal
    hotkeys.focusSearch.handler = () => this.$refs.headerSearch.focus()
    hotkeys.showSidebar.handler = this.changeShowFolders
  },
  beforeUnmount() {
    // hotkeys.showPopup.handler = null
    // hotkeys.showPopup.handler = null
  },
  methods: {
    showCreatePostModal() {
      this.isShowCreatePost = true
    },
    closeCreatePostModal() {
      this.isShowCreatePost = false
    },
    updateSearchFilter(value) {
      useFolderStore().setSearchFilter(value)
      useFolderStore().setCurrentFolder(null)
    },
    changeShowFolders() {
      useFolderStore().changeIsShowFolders()
    },
  },
}
</script>

<style>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--height-header);
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  padding: 0 calc(var(--unit) * 3);
  border-bottom: var(--border-width-main) solid var(--color-secondary);
  background-color: var(--color-bg);
  background-image: url('@/assets/grain.png');
}

.header__burger {
  cursor: pointer;
  margin-right: auto;
  display: none;
}

.header__burger svg {
  width: 24px;
  height: 24px;
}

.header__search-input {
  transition: 0.3s;
  width: 200px;
  padding: var(--unit);
}

.header__search-input:focus,
.header__search-input:not(:placeholder-shown) {
  transition: 0.6s;
}

.header__create-post {
  background: rgba(255, 180, 58, 0.2);
  padding: var(--unit) calc(var(--unit) * 2);
  color: var(--color-primary);
  border: var(--border-width-main) var(--color-primary) solid;
  border-radius: var(--border-radius-normal);
}

.header__create-post::placeholder {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .header__burger {
    display: block;
  }

  .visible-header {
    display: none;
  }

  .header__search {
    width: 100%;
    margin: 0 calc(var(--unit) * 2);
    text-align: right;
  }

  .header__search-input:focus,
  .header__search-input:not(:placeholder-shown) {
    width: 100%;
    transition: 0.3s;
  }

  .header__create-post {
    white-space: nowrap;
  }
}
</style>
