<template>
  <input
    id="search-tasks"
    :value="value"
    class="add-task__text"
    type="text"
    name="search-tasks"
    placeholder="Текст задачи"
    @keypress.enter="addTask"
    @input="$emit('update:text', $event.target.value)" />
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' },
  },
  emits: ['add-task', 'update:text'],
  methods: {
    addTask() {
      this.$emit('add-task')
    },
  },
}
</script>

<style>
.add-task__text {
  flex: 1 1 auto;
  width: 100%;
  padding: var(--unit);
  margin: var(--unit) 0;
}

.add-subtask__text {
  width: 100%;
  padding: calc(var(--unit) / 2);
  margin-bottom: var(--unit);
  margin-left: calc(var(--unit) * 5);
}
</style>
