<template>
  <label class="c-checkbox-label" :class="classLabel" :for="id">
    <span class="c-checkbox-span" :class="classText"> {{ text }} </span>
    <input
      :id="id"
      :checked="modelValue"
      :class="classInput"
      type="checkbox"
      class="c-checkbox-input"
      :name="id"
      @input="$emit('update:modelValue', $event.target.checked)" />
    <div class="check">
      <IconCheck />
    </div>
  </label>
</template>

<script>
export default {
  props: {
    id: { required: true, default: '', type: String },
    classLabel: { default: '', type: String },
    classText: { default: '', type: String },
    classInput: { default: '', type: String },
    text: { required: true, default: 'Текст к чекбоксу', type: String },
    modelValue: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
}
</script>

<style>
.c-checkbox-input {
  display: none;
}

.check {
  position: relative;
  width: 24px;
  height: 24px;
  border: 1px solid var(--color-primary);
  border-radius: 5px;
}

.check svg {
  position: absolute;
  display: none;
}

.c-checkbox-input:checked + .check svg {
  display: block;
}
</style>
