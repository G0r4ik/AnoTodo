<template>
  <div ref="modalBackdrop" class="modal-backdrop" @keydown.tab="trapTab">
    <div class="modal-content">
      <div
        class="modal-inner-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline">
        <button
          ref="closeBtn"
          class="modal-close-btn"
          @click="$emit('closeModal')">
          <IconCross />
        </button>
        <h5 class="modal-title">
          <slot name="header">I'm empty inside</slot>
        </h5>
        <slot name="content">I'm empty inside</slot>
      </div>
    </div>
  </div>
</template>

<script>
import { hotkeys } from '@/hotkeys.js'

export default {
  props: {
    isShow: { type: Boolean, default: false },
  },
  emits: ['closeModal'],

  data() {
    return {
      bodyWidth: null,
    }
  },
  mounted() {
    this.bodyWidth = document.body.clientWidth
    document.body.style.maxWidth = `${this.bodyWidth}px`
    hotkeys.closeModal.handler = this.closeModal
    this.$refs.closeBtn.focus()
    document.body.classList.add('no-scroll')
  },
  beforeUnmount() {
    hotkeys.closeModal.handler = null
    document.body.style.maxWidth = ''
    document.body.classList.remove('no-scroll')
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    trapTab(event) {
      const focusableElements = this.$refs.modalBackdrop.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const arrayOfFocusableElements = [...focusableElements]
      const firstFocusableElement = arrayOfFocusableElements[0]
      const lastFocusableElement = arrayOfFocusableElements.at(-1)
      const activeElement = document.activeElement
      if (event.shiftKey && activeElement === firstFocusableElement) {
        event.preventDefault()
        lastFocusableElement.focus()
      } else if (!event.shiftKey && activeElement === lastFocusableElement) {
        event.preventDefault()
        firstFocusableElement.focus()
      }
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
  background-color: var(--color-modal-backdrop);
}

.modal-title {
  margin-bottom: calc(var(--unit) * 3);
  font-size: var(--font-medium);
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
  background: url('@/assets/grain.png') var(--color-bg);
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
  width: var(--height-icon-main);
  height: var(--height-icon-main);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-fast) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transition: opacity var(--transition-fast) ease;
}

.fade-enter-active .modal-content,
.fade-leave-active .modal-content {
  opacity: 1;
  transition: all var(--transition-fast) cubic-bezier(0.23, 1, 0.32, 1) 0s;
  transform: translateY(0);
}

.fade-enter-from .modal-content,
.fade-leave-to .modal-content {
  opacity: 0;
  transition: all var(--transition-fast) cubic-bezier(0.23, 1, 0.32, 1) 0s;
  transform: translateY(-100px);
}
</style>
