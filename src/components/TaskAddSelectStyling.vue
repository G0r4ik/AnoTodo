<template>
  <div class="add-task__color">
    <select
      id="add-task-bg"
      v-model="currentStyle"
      name="add-task-bg"
      class="add-task__color-select">
      <option value="none" selected>none</option>
      <option
        v-for="color of allColors"
        :key="color"
        :value="color"
        :style="{ 'background-color': colors[color].bg }">
        {{ color }}
      </option>
    </select>
    <button class="add-task__color-random" @click="setRandomColor">
      <IconShuffle />
    </button>
  </div>
</template>

<script>
export default {
  emits: ['setStyleOfTask'],
  data() {
    return {
      currentStyle: 'none',
      colors: {
        tomato: { bg: 'tomato', color: 'black' },
        lightblue: { bg: 'lightblue', color: 'black' },
        aquamarine: { bg: 'aquamarine', color: 'black' },
        chartreuse: { bg: 'chartreuse', color: 'black' },
        coral: { bg: 'coral', color: 'black' },
        cornflowerblue: { bg: 'cornflowerblue', color: 'black' },
        violet: { bg: 'violet', color: 'black' },
        thistle: { bg: 'thistle', color: 'black' },
        springgreen: { bg: 'springgreen', color: 'black' },
        plum: { bg: 'plum', color: 'black' },
        pink: { bg: 'pink', color: 'black' },
      },
    }
  },
  computed: {
    allColors() {
      return Object.keys(this.colors)
    },
  },
  watch: {
    currentStyle(newValue) {
      if (newValue === 'none') {
        const style = { color: 'var(--color-text)', bg: 'none' }
        this.$emit('setStyleOfTask', style)
      } else {
        this.$emit('setStyleOfTask', this.colors[newValue])
      }
    },
  },
  methods: {
    setRandomColor() {
      const r = Math.floor(Math.random() * this.allColors.length)
      const key = Object.keys(this.colors)[r]
      this.currentStyle = key
    },
  },
}
</script>

<style>
.add-task__color {
  display: flex;
  width: 100%;
  margin-bottom: var(--unit);
}

.add-task__color-select {
  width: 100%;
}

.add-task__color-random {
  width: var(--height-icon-main);
  height: var(--height-icon-main);
  margin-left: var(--unit);
}
</style>
