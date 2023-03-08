<template>
  <div v-for="folder of Object.keys(filteredTasks)" :key="folder">
    <app-tasks
      v-if="filteredTasks[folder].length > 0"
      :tasks="filteredTasks[folder]"
      :folder="folder"
      @showEditTaskPopup="showEditTaskPopup" />
  </div>
  <div v-if="isEmptyTasks" class="main__task-not-found">Ничего не найдено</div>
</template>
<script>
import AppTasks from '../components/AppTasks.vue'
export default {
  components: {
    AppTasks,
  },
  emits: ['showEditTaskPopup'],
  props: {
    filteredTasks: Object,
  },
  computed: {
    isEmptyTasks() {
      return Object.values(this.filteredTasks).every(item => item.length == 0)
    },
  },

  methods: {
    showEditTaskPopup(folder, task) {
      this.$emit('showEditTaskPopup', folder, task)
    },
  },
}
</script>

<style>
.main__task-not-found {
  font-size: var(--font-large);
  text-align: center;
  opacity: 0.3;
}
</style>
