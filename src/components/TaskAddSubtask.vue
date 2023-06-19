<template>
  <textarea
    id="search-tasks"
    :value="subtask.text"
    class="add-subtask__text"
    type="text"
    name="search-tasks"
    :placeholder="$t('textOfSubtask')"
    @input="changeInput"
    @keypress.enter="addTask"
    @keyup.ctrl.enter.prevent="addSubtask" />
  <div
    class="add-subtask__delete"
    tabindex="0"
    @click="deleteSubtask(subtask)"
    @keypress.enter="deleteSubtask(subtask)">
    <IconCross />
  </div>
</template>

<script>
export default {
  props: {
    subtask: { type: Object, default: () => ({}) },
  },
  emits: ['addSubtask', 'deleteSubtask', 'update:text'],
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
    deleteSubtask(subtask) {
      this.$emit('deleteSubtask', subtask)
    },
  },
}
</script>

<style>
.add-subtask {
  display: flex;
  align-items: center;
}

.add-subtask__delete {
  width: var(--height-icon-main);
  height: var(--height-icon-main);
  cursor: pointer;
}

.add-subtask__delete svg {
  height: 100%;
}

.add-subtask__text {
  resize: none;
}
.add-subtask__button {
  padding: var(--unit) calc(var(--unit) * 2);
  margin-bottom: var(--unit);
  margin-left: calc(var(--unit) * 6);
  font-size: var(--font-small);
}
</style>
