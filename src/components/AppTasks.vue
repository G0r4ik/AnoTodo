<template>
  <main class="main">
    <strong class="main__current-folder">
      {{ title }}
      Всего: в
      {{ countOfFolders }} папках
      {{ Object.values(Object.fromEntries(this.folders)).flat().length }} задач
    </strong>

    <TaskSearch />
    <TaskSelectList
      :status-list="statusList"
      @change-task-status-list="changeTaskStatusList" />
    <TaskList :status-list="statusList" />
    <CompareServerAndClient
      v-if="FIXMEerror"
      :server-folders="serverFolders"
      :client-folders="clientFolders"
      @close-modal="FIXMEerror = false" />
  </main>
</template>

<script>
import TaskList from '@/components/TaskList.vue'
import CompareServerAndClient from '@/components/CompareServerAndClient.vue'
import TaskSelectList from '@/components/TaskSelectList.vue'
import { useFolderStore } from '@/store/folders.js'
import TaskSearch from './TaskSearch.vue'
import { editTask, isEqualServerAndLocalFolders } from '../helpers/firebaseApp'

export default {
  components: {
    CompareServerAndClient,
    TaskSelectList,
    TaskSearch,
    TaskList,
  },
  data() {
    return {
      currentEditTask: null,
      statusList: 'active',
      FIXMEerror: false,
      serverFolders: null,
      clientFolders: null,
    }
  },
  computed: {
    countOfFolders() {
      console.log(
        Object.keys(Object.fromEntries(this.folders)).filter(
          i => !useFolderStore().notIndexedFolders.includes(i)
        )
      )
      return Object.keys(Object.fromEntries(this.folders)).filter(
        i => !useFolderStore().notIndexedFolders.includes(i)
      ).length
    },
    title() {
      return useFolderStore().currentFolder || this.$t('allFolders')
    },
    folders() {
      return useFolderStore().folders
    },
    copyFolders() {
      return JSON.stringify([...this.folders])
    },
  },
  watch: {
    copyFolders: {
      async handler(newV, oldV) {
        // const newValue = JSON.parse(newV)
        // const oldValue = JSON.parse(oldV)
        localStorage.setItem('folders', this.copyFolders)
        if (localStorage.getItem('userIsActive')) {
          console.log(newV)
          console.log(oldV)
          const check = await isEqualServerAndLocalFolders(oldV)
          this.serverFolders = check.serverFolders
          this.clientFolders = check.clientFolders
          if (check.status) {
            await editTask(this.copyFolders)
            console.log('Данные успешно изменены')
          } else {
            console.log('Обнаружена ошибка!!')
            this.FIXMEerror = true
          }
        }
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
