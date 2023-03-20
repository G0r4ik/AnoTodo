<template>
  <ModalWrapper>
    <template #header>Сменить цветовую тему</template>
    <template #content>
      <div class="change-theme">
        <div
          v-for="theme of themes"
          :key="theme.title"
          class="change-theme__item"
          @click="changeTheme(theme)">
          {{ theme.title }}
        </div>
      </div>
    </template>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from '@/components/ModalWrapper.vue'
export default {
  components: { ModalWrapper },
  data() {
    return {
      themes: [
        { title: 'Светлая', class: 'light' },
        { title: 'Темная', class: 'dark' },
        { title: 'Dragula', class: 'dragula' },
        { title: 'Cobalt', class: 'cobalt' },
      ],
    }
  },
  methods: {
    changeTheme(theme) {
      document.documentElement.setAttribute('theme', theme.class)
      localStorage.setItem('theme', theme.class)
    },
  },
}
</script>

<style>
.change-theme {
  display: flex;
  gap: var(--unit);
}

.change-theme__item {
  padding: var(--unit) calc(var(--unit) * 2);
  cursor: pointer;
  border: var(--border-width-main) solid var(--color-secondary);
}
</style>
