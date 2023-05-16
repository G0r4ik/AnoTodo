<template>
  <div class="add-task__time">
    <div class="add-task__time-item">
      <label for="" class="add-task__time-label">Создано:</label>
      <input
        ref="timeStart"
        v-model="timeStart"
        type="datetime-local"
        class="add-task__time-input" />
    </div>
    <div class="add-task__time-item add-task__time-item_ready">
      <label for="" class="add-task__time-label">Завершено:</label>
      <CustomCheckbox
        id="is-using-time"
        v-model="isEnd"
        class="add-task__use-time"
        text=""
        class-text="add-task__use-time-text"
        class-input="add-task__use-input" />
      <input
        v-if="isEnd"
        ref="timeEnd"
        v-model="timeEnd"
        type="datetime-local"
        class="add-task__time-input add-task__time-input_ready" />
    </div>
  </div>
</template>

<script>
export default {
  emits: ['changeTimeStart', 'changeTimeEnd'],
  data() {
    return {
      timeStart: '',
      timeEnd: '',
      isEnd: false,
    }
  },
  watch: {
    timeStart(value) {
      console.log(value)
      this.$emit('changeTimeStart', value)
    },
    timeEnd(value) {
      this.$emit('changeTimeEnd', value)
    },
  },
  mounted() {
    const pad = num => String(num).padStart(2, '0')
    const today = new Date()
    const date = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
      today.getDate()
    )}`
    const time = `${pad(today.getHours())}:${pad(today.getMinutes())}`
    const dateTime = `${date}T${time}`
    this.timeStart = dateTime
    this.timeEnd = dateTime
  },
}
</script>

<style>
.add-task__time {
}

.add-task__time-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--unit);
}

.add-task__time-item_ready {
  justify-content: start;
}

.add-task__time-label {
  font-size: 20px;
}

.add-task__time-input {
  width: 155px;
  font-size: var(--font-small);
}

.add-task__time-input_ready {
  /* width: 100%; */
  margin-left: auto;
}
</style>
