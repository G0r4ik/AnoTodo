<template>
  <main class="main">
    <strong class="main__current-folder">
      {{ currentFolder ? currentFolder : 'Все папки' }}
    </strong>
    <TaskListSelect
      :status-list="statusList"
      @change-task-status-list="changeTaskStatusList" />
    <TaskList :status-list="statusList" />
  </main>
</template>

<script>
import TaskList from '@/components/TaskList.vue'
import TaskListSelect from '@/components/TaskListSelect.vue'
import { useFolderStore } from '@/store/folders.js'

export default {
  components: {
    TaskListSelect,
    TaskList,
  },
  data() {
    return {
      currentEditTask: null,
      statusList: 'all',
    }
  },
  computed: {
    currentFolder() {
      return useFolderStore().currentFolder
    },
    folders() {
      return useFolderStore().folders
    },
  },
  watch: {
    folders: {
      handler(newValue) {
        localStorage.setItem('folders', JSON.stringify(newValue))
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
