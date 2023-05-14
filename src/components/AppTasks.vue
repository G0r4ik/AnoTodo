<template>
  <main class="main">
    <strong class="main__current-folder">
      {{ title }}
    </strong>

    <TaskSearch />
    <TaskSelectList
      :status-list="statusList"
      @change-task-status-list="changeTaskStatusList" />
    <TaskList :status-list="statusList" />
  </main>
</template>

<script>
import TaskList from '@/components/TaskList.vue'
import TaskSelectList from '@/components/TaskSelectList.vue'
import { useFolderStore } from '@/store/folders.js'
import TaskSearch from './TaskSearch.vue'

export default {
  components: {
    TaskSelectList,
    TaskList,
    TaskSearch,
  },
  data() {
    return {
      currentEditTask: null,
      statusList: 'all',
    }
  },
  computed: {
    title() {
      return useFolderStore().currentFolder || this.$t('allFolders')
    },
    folders() {
      return useFolderStore().folders
    },
  },
  watch: {
    folders: {
      handler(newValue) {
        localStorage.setItem('folders', JSON.stringify([...newValue]))
      },
      deep: true,
    },
  },
  mounted() {
    useFolderStore().setFolders()
  },
  methods: {
    changeTaskStatusList(statusList) {
      this.statusList = statusList
    },
  },
}
</script>

<style>
.main {
  height: 100%;
  padding: 0 calc(var(--unit) * 3);
  padding-top: calc(var(--unit) * 2);
  margin-top: var(--height-header);
  margin-left: var(--width-sidebar);
  overflow-y: auto;
}

.main__current-folder {
  display: inline-block;
  max-width: 100%;
  margin-bottom: calc(var(--unit) * 5);
  font-size: var(--font-large);
  word-break: break-all;
}

@media (max-width: 768px) {
  .main {
    margin-left: 0;
  }
}
</style>
