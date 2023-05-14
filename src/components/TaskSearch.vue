<template>
  <div class="task-search">
    <div class="task-search__top">
      <input
        id="task-search"
        ref="taskSearch"
        name="task-search"
        type="search"
        :placeholder="$t('search')"
        autocomplete="off"
        class="task-search__input-main"
        @input="updateSearchFilter($event.target.value)" />
      <IconMore class="task-search__more" @click="showMoreFilters" />
    </div>
    <div
      ref="moreFilters"
      class="task-search__another task-search__another_hide">
      <label for="" class="task-search__small-label">
        <span class="task-search__small-label-text">Включаемые папки</span>
        <input
          v-model="includedFolders"
          class="task-search__input"
          type="text"
          placeholder="folder1, folder2" />
        <IconTool
          ref="regInclude"
          tabindex="0"
          class="task-search__icon"
          @click="useRegExp('include')"
          @keydown.enter="useRegExp('include')" />
      </label>
      <label for="" class="task-search__small-label">
        <span class="task-search__small-label-text">Исключаемые папки</span>
        <input
          v-model="excludedFolders"
          class="task-search__input"
          type="text"
          placeholder="folder1, folder2" />
        <IconTool
          ref="regExclude"
          tabindex="0"
          class="task-search__icon"
          @click="useRegExp('exclude')"
          @keydown.enter="useRegExp('exclude')" />
      </label>
      <label for="" class="task-search__small-label">
        <span class="task-search__small-label-text"> Дата создания</span>
        <div class="task-search__dates">
          от
          <input
            id=""
            v-model="dateOfStart"
            type="datetime-local"
            name=""
            class="task-search__input" />
          до
          <input
            id=""
            v-model="dateOfEnd"
            type="datetime-local"
            name=""
            class="task-search__input" />
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import { useFolderStore } from '../store/folders'

export default {
  data() {
    return {
      includedFolders: '',
      excludedFolders: '',
      isExcludedFoldersRegExp: false,
      isIncludedFoldersRegExp: false,
      dateOfStart: '',
      dateOfEnd: '',
    }
  },
  watch: {
    includedFolders() {
      if (this.isIncludedFoldersRegExp) {
        this.createRegExp('include')
      } else {
        useFolderStore().includeFolders(this.splitAndTrimFolders('include'))
      }
    },
    excludedFolders() {
      if (this.isExcludedFoldersRegExp) {
        this.createRegExp('exclude')
      } else {
        useFolderStore().excludeFolders(this.splitAndTrimFolders('exclude'))
      }
    },
  },
  methods: {
    updateSearchFilter(value) {
      useFolderStore().setSearchQuery(value)
      useFolderStore().setCurrentFolder(null)
    },
    showMoreFilters() {
      this.$refs.moreFilters.classList.toggle('task-search__another_hide')
    },
    splitAndTrimFolders(value) {
      const currentFolders =
        value === 'include' ? this.includedFolders : this.excludedFolders
      return currentFolders.split(',').map(folder => folder.trim())
    },
    useRegExp(fixme) {
      if (fixme === 'include') {
        this.$refs.regInclude.$el.classList.toggle('task-search__icon_active')
        this.isIncludedFoldersRegExp = !this.isIncludedFoldersRegExp
        if (this.isIncludedFoldersRegExp) {
          this.createRegExp('include')
          useFolderStore().includeFolders([])
        } else {
          useFolderStore().changeRegExp('include')
          useFolderStore().includeFolders(this.splitAndTrimFolders('include'))
        }
      } else {
        this.$refs.regExclude.$el.classList.toggle('task-search__icon_active')
        this.isExcludedFoldersRegExp = !this.isExcludedFoldersRegExp
        if (this.isExcludedFoldersRegExp) {
          this.createRegExp('exclude')
          useFolderStore().excludeFolders([])
        } else {
          useFolderStore().changeRegExp('exclude')
          useFolderStore().excludeFolders(this.splitAndTrimFolders('exclude'))
        }
      }
    },
    createRexExpFunc(value) {
      try {
        return new RegExp(value)
      } catch (error) {}
    },
    createRegExp(fixme) {
      if (fixme === 'include') {
        useFolderStore().includeFolders([])
        useFolderStore().RegExpIncludedFolders = this.createRexExpFunc(
          this.includedFolders
        )
      } else {
        useFolderStore().excludeFolders([])
        useFolderStore().RegExpExcludedFolders = this.createRexExpFunc(
          this.excludedFolders
        )
      }
    },
  },
}
</script>

<style>
.task-search {
  margin-bottom: calc(var(--unit) * 2);
}

.task-search__top {
  display: flex;
  align-items: center;
}

.task-search__input-main {
  width: 100%;
  padding: var(--unit);
  transition: var(--transition-fast);
}

.task-search__input-main:focus,
.task-search__input-main:not(:placeholder-shown) {
  transition: var(--transition-fast);
}

.task-search__more {
  margin-left: calc(var(--unit) * 2);
  cursor: pointer;
}

.task-search__another {
  /* height: 85px; */
  margin-top: calc(var(--unit) * 3);
  overflow: hidden;
  transition: var(--transition-fast);
}

.task-search__another_hide {
  height: 0;
  transition: var(--transition-fast);
}

.task-search__input {
  width: calc(100% - var(--unit));
  margin: 0 calc(var(--unit) / 2);
  font-size: var(--font-small);
}

.task-search__small-label {
  position: relative;
  display: block;
  margin-bottom: calc(var(--unit) * 2);
  font-size: var(--font-small);
}

.task-search__small-label-text {
  display: inline-block;
  margin-bottom: calc(var(--unit) / 2);
  opacity: 0.5;
}

.task-search__dates {
  display: flex;
  align-items: center;
}

.task-search__icon {
  position: absolute;
  right: 10px;
  bottom: 4px;
  width: 22px;
  height: 22px;
  padding: calc(var(--unit) / 4);
  cursor: pointer;
  border: var(--border-width-small) solid transparent;
}

.task-search__icon_active {
  background: var(--color-modal-backdrop);
  border-color: var(--color-primary);
  border-radius: 5px;
  fill: var(--color-bg);
}
</style>
<!-- 234 -->
