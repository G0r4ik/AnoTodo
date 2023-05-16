<template>
  <button
    class="add-task__add-button"
    :style="{
      background: buttonBG,
      color: buttonColor,
      borderColor: buttonBorderColor,
    }"
    @click="$emit('addTask')">
    {{ $t(buttonText) }}
  </button>
</template>

<script>
export default {
  props: {
    buttonBG: { default: '', type: String },
    buttonColor: { default: '', type: String },
    buttonBorderColor: { default: '', type: String },
    buttonText: { default: '', type: String },
  },
  emits: ['addTask'],
}
</script>
