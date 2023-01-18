<script>
export default {
  props: ['tasksLength'],
  data() {
    return {
      newTask: { text: '', date: '', time: '', isReady: false, childrens: [] },
    }
  },
  methods: {
    addTask() {
      this.newTask.text = ''
      this.newTask.date = ''
      this.newTask.time = ''
      this.$emit('addTask', { ...this.newTask })
    },
  },
}
</script>
<template>
  <div class="add-class">
    <input
      class="add-task_text"
      type="search"
      name="search-tasks"
      id="search-tasks"
      v-model="newTask.text"
    />
    <input class="add-task__date" type="date" />
    <input class="add-task__time" type="time" />
    <button @click="addTask">Добавить</button>
  </div>
</template>
<style></style>
