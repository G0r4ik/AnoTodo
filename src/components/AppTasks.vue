<script>
export default {
  props: ['tasks'],
}
</script>
<template>
  <div v-for="task of tasks" class="tasks">
    <div class="tasks__item task">
      <div class="task__isReady">
        {{ task.isReady }}
      </div>
      {{ task.id }}
      <input
        type="checkbox"
        class="task__isReady"
        @click="$emit('changeStatus', task)"
        :checked="task.isReady"
      />
      <div class="task__text" @click="$emit('')">{{ task.text }}</div>
      <div class="task__date" @click="$emit('')">{{ task.date }}</div>
      <div class="task__edit" @click="$emit('')">edit</div>
      <div class="task__delete" @click="$emit('deleteTask')">x</div>
    </div>
  </div>
</template>
<style>
.tasks {
}
.tasks__item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid gray;
}
.task {
}
.task__isReady {
}
.task__text {
}
.task__date {
}
.task__edit {
}
.task__delete {
}
</style>
