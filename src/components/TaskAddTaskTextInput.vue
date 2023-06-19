<template>
  <textarea
    id="search-tasks"
    ref="searchTasks"
    :value="value"
    class="add-task__text"
    type="text"
    rows="1"
    name="search-tasks"
    :placeholder="$t('textOfTask')"
    @input="changeInput" />
  <!-- @keypress.enter="addTask" -->
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' },
  },
  emits: ['add-task', 'update:text'],
  methods: {
    changeInput(event) {
      const el = event.target
      const offset = el.clientHeight - el.offsetHeight
      if (el.clientHeight < el.scrollHeight) {
        el.style.height = el.scrollHeight - offset + 'px'
      } else {
        el.style.height = '1px'
        el.style.height = el.scrollHeight - offset + 'px'
      }
      this.$emit('update:text', event.target.value)
    },
    addTask(event) {
      this.$emit('add-task')
    },
  },
}
</script>

<style>
.add-task__text {
  flex: 1 1 auto;
  width: 100%;
  max-height: 200px;
  padding: var(--unit);
  margin: var(--unit) 0;
  resize: none;
}

.add-subtask__text {
  width: 100%;
  padding: calc(var(--unit) / 2);
  margin-bottom: var(--unit);
  margin-left: calc(var(--unit) * 5);
}
</style>
