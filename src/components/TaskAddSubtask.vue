<template>
  <div v-for="(subtask, i) of subtasks" :key="subtask.id" class="add-subtask">
    <input
      id="search-tasks"
      v-model="subtasks[i].text"
      class="add-subtask__text"
      type="text"
      name="search-tasks"
      placeholder="Текст подзадачи"
      @keypress.enter="addTask"
      @keyup.ctrl.enter.prevent="addSubtask" />
    <div
      class="add-subtask__delete"
      tabindex="0"
      @click="deleteSubtask(subtask)"
      @keypress.enter="deleteSubtask(subtask)">
      <IconCross />
    </div>
  </div>
  <button class="add-subtask__button" @click="addSubtask">
    Добавить подзадачу
  </button>
</template>

<script>
export default {
  props: {
    subtasks: { type: Array, default: () => [] },
  },
  emits: ['addSubtask', 'deleteSubtask'],
  methods: {
    addSubtask() {
      const id = Date.now().toString(36) + Math.random().toString(36)
      this.$emit('addSubtask', { text: '', isReady: false, id })
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

.add-subtask__button {
  padding: var(--unit) calc(var(--unit) * 2);
  margin-bottom: var(--unit);
  margin-left: calc(var(--unit) * 6);
  font-size: var(--font-small);
}
</style>
