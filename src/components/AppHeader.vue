<template>
  <header class="header">
    <div class="header__burger" @click="changeShowFolders">
      <IconBurger />
    </div>
    <div class="header__search">
      <input
        :ref="'headerSearch'"
        class="search__input"
        type="search"
        name="search"
        id="header-search"
        placeholder="Поиск"
        @input="updateSearchFilter($event.target.value)" />
    </div>
    <button class="header__create-post" @click="showCreatePostModal">
      Создать пост
    </button>
  </header>
  <TaskAdd v-if="isShowCreatePost" @closePopup="closeCreatePostModal" />
</template>

<script>
import TaskAdd from './TaskAdd.vue'
import { useFolderStore } from '../store/folders.js'

export default {
  components: { TaskAdd },
  data() {
    return {
      isShowCreatePost: false,
    }
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
.header__burger {
  cursor: pointer;
  margin-right: auto;
  display: none;
}
.header__burger svg {
  width: 24px;
  height: 24px;
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  padding: 0 15px;
  border-bottom: 1px solid var(--color-secondary);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  background-color: var(--color-bg);
  background-image: url('../assets/grain.png');
}

.search__input {
  transition: 0.3s;
  max-width: 300px;
  width: 100%;
}
.search__input:focus,
.search__input:not(:placeholder-shown) {
  max-width: 500px;
  transition: 0.6s;
}
.search__where {
  display: flex;
  flex-direction: column;
}
.search__where-input {
  display: none;
}
.search__where-input:checked ~ .search__where-label {
  font-weight: 700;
}
.search__where-label {
  cursor: pointer;
}
.header__create-post {
  background: rgba(255, 180, 58, 0.2);
  padding: 5px 10px;
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
    margin: 0 12px;
    text-align: right;
  }
  .search__input:focus,
  .search__input:not(:placeholder-shown) {
    width: 100%;
  }
  .header__create-post {
    white-space: nowrap;
    /* font-size: var(--font-extra-small); */
    border-width: 2px;
  }
}
</style>
