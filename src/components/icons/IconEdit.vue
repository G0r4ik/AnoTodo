<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 4H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-6M9 15v-2.5l8.8-8.8c.6-.6 1.8-.6 2.4 0v0c.7.7.7 1.9 0 2.5L15.6 11l-4 4H9Z" />
  </svg>
</template>

<script>
export default {
  props: {
    color: { type: String, default: 'var(--color-text)' },
  },
}
</script>
