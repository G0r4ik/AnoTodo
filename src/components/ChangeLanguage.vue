<template>
  <ModalWrapper>
    <template #header>{{ $t('changeLanguage') }}</template>
    <template #content>
      <div class="change-language">
        <div
          v-for="(language, code) of languages"
          :key="code"
          class="change-language__item"
          :class="{
            'change-language__item_active': state.currentLanguage === code,
          }"
          @click="changeLanguage(code)">
          {{ language }}
        </div>
      </div>
    </template>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from './ModalWrapper.vue'
import { languages, changeLanguage, state } from '../localize'

export default {
  components: { ModalWrapper },
  data() {
    return {
      languages,
      state,
    }
  },
  methods: {
    changeLanguage(language) {
      changeLanguage(language)
    },
  },
}
</script>

<style>
.change-language__item {
  padding: var(--unit) calc(var(--unit) * 2);
  margin-bottom: var(--unit);
  cursor: pointer;
  border: var(--border-width-main) solid var(--color-secondary);
}
.change-language__item_active {
  color: var(--color-bg);
  background: var(--color-text);
}
</style>
