<template>
  <div class="error">
    <div class="error__inner">
      <IconCross class="error__close" @click="closeError" />
      <small class="error__text">{{ error }}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: { type: String, default: () => this.$t('error') },
    timeToClose: { type: Number, default: 3000 },
  },
  emits: ['closeError'],
  mounted() {
    console.log(this.$t('error'))
    setTimeout(() => {
      this.closeError()
    }, this.timeToClose)
  },
  methods: {
    closeError() {
      this.$emit('closeError')
    },
  },
}
</script>

<style>
.error {
  display: block;
  width: 100%;
  font-size: var(--font-small);
  color: var(--color-bg);
  text-align: center;
  background: var(--color-danger);
  border-radius: var(--border-width-main);
}

.error__inner {
  position: relative;
  width: 100%;
  padding: var(--unit);
  padding-right: calc(var(--unit) * 5);
}

.error__close {
  position: absolute;
  top: 0;
  right: 0;
  width: var(--height-icon-main);
  height: var(--height-icon-main);
  cursor: pointer;
}

.error__close path {
  fill: var(--color-bg);
}
</style>
