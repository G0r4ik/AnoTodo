<template>
  <div class="task-status__links">
    <span
      tabindex="0"
      class="task-status__link"
      :class="{ 'task-status__link_active': statusList === 'all' }"
      @click="$emit('changeStatusList', 'all')"
      @keypress.enter="$emit('changeStatusList', 'all')">
      Все
    </span>
    <span
      class="task-status__link"
      tabindex="0"
      :class="{ 'task-status__link_active': statusList === 'active' }"
      @click="$emit('changeStatusList', 'active')"
      @keypress.enter="$emit('changeStatusList', 'active')">
      Активные
    </span>
    <span
      class="task-status__link"
      tabindex="0"
      :class="{ 'task-status__link_active': statusList === 'ready' }"
      @click="$emit('changeStatusList', 'ready')"
      @keypress.enter="$emit('changeStatusList', 'ready')">
      Выполненные
    </span>
  </div>
</template>

<script>
import { hotkeys } from '@/hotkeys'

export default {
  props: {
    statusList: {
      type: String,
      default: 'all',
    },
  },
  emits: ['changeStatusList'],
  mounted() {
    hotkeys.changeListAll.handler = () => {
      this.$emit('changeStatusList', 'all')
    }
    hotkeys.changeListReady.handler = () => {
      this.$emit('changeStatusList', 'ready')
    }
    hotkeys.changeListNotReady.handler = () => {
      this.$emit('changeStatusList', 'active')
    }
  },
}
</script>
