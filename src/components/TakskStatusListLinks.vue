<script>
export default {
  props: ['statusList'],
  emits: ['changeStatusList'],
}
</script>
<template>
  <div class="task-status__links">
    <span
      tabindex="0"
      class="task-status__link"
      :class="{ 'task-status__link_active': statusList === 'all' }"
      @click="$emit('changeStatusList', 'all')"
      @keypress.enter="$emit('changeStatusList', 'all')"
    >
      Все
    </span>
    <span
      class="task-status__link"
      tabindex="0"
      :class="{ 'task-status__link_active': statusList === 'active' }"
      @click="$emit('changeStatusList', 'active')"
      @keypress.enter="$emit('changeStatusList', 'active')"
    >
      Активные
    </span>
    <span
      class="task-status__link"
      tabindex="0"
      :class="{ 'task-status__link_active': statusList === 'ready' }"
      @click="$emit('changeStatusList', 'ready')"
      @keypress.enter="$emit('changeStatusList', 'ready')"
    >
      Выполненные
    </span>
  </div>
</template>
