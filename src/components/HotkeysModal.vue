<template>
  <ModalWrapper @close-modal="$emit('closeModal')">
    <div class="hotkeys">
      <div class="hotkeys__inner">
        <h2 class="hotkeys__title">Shortcuts</h2>
        <input
          id="hotkeys-input"
          type="text"
          name="hotkeys-input"
          class="hotkeys__input" />
        <div v-for="(hotkey, i) of hotkeys" :key="i" class="hotkeys__item">
          <div class="hotkeys__action">
            <IconEdit class="hotkeys__icon-edit" />
            <span class="hotkeys__action-text">{{ hotkey.description }}</span>
          </div>
          <div class="hotkeys__buttons">
            <div class="hotkeys__modifiers">
              <template v-for="(modifier, j) of hotkey.modifiers" :key="j">
                <div class="hotkeys__button">{{ modifier }}</div>
              </template>
            </div>
            <template v-if="hotkey.modifiers.length > 0">+</template>
            <div class="hotkeys__button">{{ hotkey.key }}</div>
          </div>
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from '@/components/ModalWrapper.vue'
import { hotkeys } from '@/hotkeys.js'
export default {
  components: {
    ModalWrapper,
  },
  emits: ['closeModal'],
  data() {
    return {
      hotkeys,
    }
  },
}
</script>

<style>
.hotkeys {
  width: 100%;
}

.hotkeys__item {
  display: flex;
  gap: calc(var(--unit) * 15);
  align-items: center;
  justify-content: space-between;
}

.hotkeys__item:not(:last-child) {
  margin-bottom: calc(var(--unit) * 2);
}

.hotkeys__icon-edit {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.hotkeys__buttons {
  display: flex;
  gap: calc(var(--unit) * 2);
  align-items: center;
}

.hotkeys__modifiers {
  display: flex;
  gap: calc(var(--unit) * 2);
  align-items: center;
}

.hotkeys__modifiers-inner {
  display: flex;
  align-items: center;
}

.hotkeys__action {
  display: flex;
  gap: var(--unit);
  align-items: center;
}

.hotkeys__button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 35px;
  height: 35px;
  padding: var(--unit);
  font-size: var(--font-medium);
  border: 1px solid var(--color-primary);
  border-radius: var(--border-width-main);
}
</style>
