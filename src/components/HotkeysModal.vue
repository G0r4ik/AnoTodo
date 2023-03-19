<template>
  <ModalWrapper @close-modal="$emit('closeModal')">
    <template #header>Shortcuts</template>
    <template #content>
      <div class="hotkeys">
        <input
          id="hotkeys-input"
          v-model="hotkeysInput"
          type="text"
          name="hotkeys-input"
          placeholder="Действие..."
          autocomplete="off"
          class="hotkeys__input" />
        <div
          v-for="(hotkey, i) of filteredHotkeys"
          :key="i"
          tabindex="0"
          class="hotkeys__item"
          @click="doAction(hotkey)"
          @keyup.enter="doAction(hotkey)">
          <div class="hotkeys__action">
            <IconEdit
              class="hotkeys__icon-edit"
              tabindex="0"
              @click.stop="changeHotkeys(hotkey)"
              @keyup.enter.stop="changeHotkeys(hotkey)" />
            <span class="hotkeys__action-text">
              {{ hotkey.description }}
            </span>
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
    </template>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from '@/components/ModalWrapper.vue'
import { hotkeys } from '@/hotkeys.js'

export default {
  components: { ModalWrapper },
  props: {
    isShow: { type: Boolean, default: false },
  },
  emits: ['closeModal'],
  data() {
    return {
      hotkeysV: hotkeys,
      hotkeysInput: '',
    }
  },
  computed: {
    filteredHotkeys() {
      const res = {}
      Object.keys(this.hotkeysV).forEach(hotkey => {
        const low = this.hotkeysV[hotkey].description.toLowerCase()
        if (low.includes(this.hotkeysInput.toLowerCase())) {
          res[hotkey] = this.hotkeysV[hotkey]
        }
      })
      return res
    },
  },
  methods: {
    changeHotkeys(hotkey) {
      hotkey.keyCode = ''
      hotkey.key = 'push buttons'
      hotkey.modifiers = []
      document.body.addEventListener('keyup', e => this.changeFunc(hotkey, e), {
        once: true,
      })
    },
    changeFunc(hotkey, e) {
      hotkey.key = e.key
      hotkey.keyCode = e.keyCode
      hotkey.modifiers = []
      if (e.shiftKey) hotkey.modifiers.push('shift')
      if (e.ctrlKey) hotkey.modifiers.push('ctrl')
      if (e.altKey) hotkey.modifiers.push('alt')
      localStorage.setItem('hotkeys', JSON.stringify(hotkeys))
    },
    doAction(hotkey) {
      if (!hotkey.isOpenModal) {
        this.$emit('closeModal')
      }
      hotkey.handler()
    },
  },
}
</script>

<style>
.hotkeys {
  width: 100%;
}

.hotkeys__input {
  width: 100%;
  margin-bottom: calc(var(--unit) * 2);
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
  width: var(--height-icon-main);
  min-width: var(--height-icon-main);
  height: var(--height-icon-main);
  min-height: var(--height-icon-main);
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
  min-width: var(--height-icon-main);
  height: var(--height-icon-main);
  padding: var(--unit);
  border: var(--border-width-small) solid var(--color-primary);
  border-radius: var(--border-width-main);
}

@media (max-width: 768px) {
  .hotkeys__item {
    gap: calc(var(--unit) * 5);
    font-size: var(--font-small);
  }

  .hotkeys__icon-edit {
    width: var(--height-icon-small);
    min-width: var(--height-icon-small);
    height: var(--height-icon-small);
    min-height: var(--height-icon-small);
  }

  .hotkeys__button {
    min-width: var(--height-icon-main);
    height: var(--height-icon-main);
    font-size: var(--font-small);
  }
}
</style>
