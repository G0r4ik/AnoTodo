<script>
import IconCross from './icons/IconCross.vue'

export default {
  props: ['task', 'folder'],
  emits: ['editSubtask', 'editTask', 'closePopup'],
  mounted() {
    document.addEventListener('keyup', this.closePopup)
  },
  beforeUnmount() {
    document.removeEventListener('keyup', this.closePopup)
  },
  methods: {
    closePopup(event) {
      if (event.key === 'Escape') this.$emit('closePopup')
    },
  },
  components: { IconCross },
}
</script>
<template>
  <teleport to="body">
    <div class="task-edit">
      <div class="task-edit__inner">
        <div class="task-edit__cross" @click="$emit('closePopup')">
          <IconCross />
        </div>
        <h5 class="task-edit__title">Изменить задачу</h5>
        <input
          class="task-edit__task"
          :value="task.text"
          @change="$emit('editTask', folder, task, $event.target.value)"
        />
        <input
          v-for="subtask of task.subtasks"
          class="task-edit__subtask"
          :value="subtask.text"
          @change="
            $emit('editSubtask', folder, task, subtask, $event.target.value)
          "
        />
      </div>
    </div>
  </teleport>
</template>

<style>
.task-edit {
  position: fixed;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url('../assets/grain.png');
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
  border-radius: 12px;
  padding: 12px;
  z-index: 150;
}
.task-edit__inner {
  position: relative;
}
.task-edit__cross {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.task-edit__cross svg {
  width: 24px;
  height: 24px;
}
.task-edit__title {
  margin-bottom: 12px;
}
.task-edit__task {
  margin-bottom: 6px;
}
.task-edit__subtask {
  margin-bottom: 6px;
  margin-left: 12px;
}
</style>
