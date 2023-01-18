<script>
export default {
  emits: ['changeFolderOfTasks'],
}
</script>

<template>
  <header class="header">
    <span class="header__link" @click="$emit('changeFolderOfTasks', 'active')">
      Активные
    </span>
    <span class="header__link" @click="$emit('changeFolderOfTasks', 'ready')">
      Выполненные
    </span>
  </header>
</template>

<style>
.header {
  width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
  border: 1px solid var(--color-gray);
}
.header__link {
  opacity: 1;
  transition: 0.3s;
  cursor: pointer;
}
.header__link:not(:last-child) {
  margin-right: 12px;
}
.header__link:hover {
  opacity: 0.5;
  transition: 0.3s;
}
</style>
