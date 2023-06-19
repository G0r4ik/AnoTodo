<template>
  <ModalWrapper class="differences__wrapper" @close-modal="$emit('closeModal')">
    <template #header>Произошло несоотсветствие</template>
    <template #content>
      <div class="differences">
        <div class="differences__text">
          <div>Сервер:</div>
          <div>Клиент:</div>
        </div>
        <!-- <div class="differences__server">{{ JSON.parse(serverFolders) }}</div> -->
        <!-- <pre class="differences__client">{{ JSON.parse(clientFolders) }}</pre> -->
        <div class="differences__inner">
          <!-- {{ JSON.parse(serverFolders) }} -->
          <TaskList
            :my-tasks="JSON.parse(serverFolders)"
            class="differences__item differences__server"
            :status-list="'all'" />
          <TaskList
            class="differences__item differences__client"
            :status-list="'all'" />
        </div>
        <div class="differences__buttons">
          <button class="differences__button" @click="saveServerData()">
            Выбрать эти данные
          </button>
          <button class="differences__button" @click="saveLoacalData()">
            Выбрать эти данные
          </button>
        </div>
      </div>
    </template>
  </ModalWrapper>
</template>
<script>
import { editTask } from '../helpers/firebaseApp'
import { useFolderStore } from '../store/folders'
import ModalWrapper from './ModalWrapper.vue'
import TaskList from './TaskList.vue'

export default {
  components: { ModalWrapper, TaskList },
  props: {
    serverFolders: { type: String, default: '[]' },
    clientFolders: { type: String, default: '' },
  },
  emits: ['closeModal'],
  data() {
    return {
      parseData: null,
    }
  },
  mounted() {
    this.parseData = JSON.parse(this.serverFolders)
  },
  methods: {
    async saveLoacalData() {
      await editTask(localStorage.getItem('folders'))
      this.$emit('closeModal')
    },
    saveServerData() {
      const folders = this.serverFolders
      useFolderStore().setFolders(folders)
      localStorage.setItem('folders', folders)
      location.reload()
    },
  },
}
</script>

<style>
.differences__wrapper > div > div {
  width: 90%;
}

.differences__inner,
.differences__text,
.differences__buttons {
  display: flex;
}

.differences__buttons {
  justify-content: space-around;
}

.differences__item,
.differences__text div {
  width: 50%;
}

.differences__button {
  padding: 15px;
  border: 1px solid gray;
}
</style>
