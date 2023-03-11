<template>
  <div ref="modal-backdrop" class="modal-backdrop">
    <div class="modal-content">
      <div
        ref="modal"
        class="modal-inner-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline">
        <button class="modal-close-btn" @click="$emit('closeModal')">
          <IconCross />
        </button>
        <slot>I'm empty inside</slot>
      </div>
    </div>
  </div>
</template>

<script>
import { hotkeys } from '@/hotkeys.js'

export default {
  emits: ['closeModal'],
  mounted() {
    hotkeys.closeModal.handler = this.closeModal
  },
  beforeUnmount() {
    hotkeys.closeModal.handler = null
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>

<style>
.modal-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-index-modal);
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  margin: 0 calc(var(--unit) * 2);
  overflow-y: auto;
}

.modal-inner-content {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-height: 100vh;
  padding: calc(var(--unit) * 3);
  overflow-y: auto;
  background: url('@/assets/grain.png');
  background-color: var(--color-secondary);
  border-radius: var(--border-radius-normal);
  box-shadow: rgba(0, 0, 0, 0.5) 0 2px 8px 0;
}

.modal-close-btn {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}

.modal-close-btn svg {
  width: 24px;
  height: 24px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.fade-enter-active .modal-content,
.fade-leave-active .modal-content {
  opacity: 1;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0s;
  transform: translateY(0);
}

.fade-enter-from .modal-content,
.fade-leave-to .modal-content {
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0s;
  transform: translateY(-100px);
}
</style>