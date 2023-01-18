<script>
// import AppHeader from './components/AppHeader'
import AppHeader from './components/AppHeader.vue'
import AppTasks from './components/AppTasks.vue'
import AddTask from './components/AddTask.vue'
export default {
  components: { AppHeader, AddTask, AppTasks },

  data() {
    return {
      folder: 'active',
      tasks: [],
      newId: 0,
    }
  },

  computed: {
    filteredTasks() {
      return this.tasks.filter(task => {
        if (this.folder === 'active') return !task.isReady
        return task.isReady
      })
    },
  },
  methods: {
    changeFolderOfTasks(folder) {
      this.folder = folder
    },

    changeStatus(_task) {
      const task = this.tasks.find(item => _task.id === item.id)
      task.isReady = !task.isReady
      console.log('test')
    },

    addTask(task) {
      this.newId++
      task.id = this.newId
      this.tasks.push(task)
      console.log(task)
    },
  },
}
</script>
<template>
  <AppHeader @changeFolderOfTasks="changeFolderOfTasks"> </AppHeader>
  <main>
    <AddTask @addTask="addTask" :newId="newId"></AddTask>
    <div></div>
    <AppTasks :tasks="filteredTasks" @changeStatus="changeStatus"> </AppTasks>
  </main>
</template>

<style>
body {
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 20px;
  font-family: 'Arial', sans-serif;
}
button {
  color: var(--color-text);
}
</style>
