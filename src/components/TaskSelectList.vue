<template>
  <div class="task-status__links">
    <span
      tabindex="0"
      class="task-status__link"
      :class="{ 'task-status__link_active': statusList === 'all' }"
      @click="$emit('changeTaskStatusList', 'all')"
      @keypress.enter="$emit('changeTaskStatusList', 'all')">
      {{ $t('all') }}
    </span>
    <span
      class="task-status__link"
      tabindex="0"
      :class="{ 'task-status__link_active': statusList === 'active' }"
      @click="$emit('changeTaskStatusList', 'active')"
      @keypress.enter="$emit('changeTaskStatusList', 'active')">
      {{ $t('active') }}
    </span>
    <span
      class="task-status__link"
      tabindex="0"
      :class="{ 'task-status__link_active': statusList === 'ready' }"
      @click="$emit('changeTaskStatusList', 'ready')"
      @keypress.enter="$emit('changeTaskStatusList', 'ready')">
      {{ $t('ready') }}
    </span>
  </div>
</template>

<script>
import { hotkeys } from '@/helpers/hotkeys'

export default {
  props: {
    statusList: { type: String, default: 'all' },
  },
  emits: ['changeTaskStatusList'],
  mounted() {
    hotkeys.changeListAll.handler = () => {
      this.$emit('changeTaskStatusList', 'all')
    }
    hotkeys.changeListReady.handler = () => {
      this.$emit('changeTaskStatusList', 'ready')
    }
    hotkeys.changeListNotReady.handler = () => {
      this.$emit('changeTaskStatusList', 'active')
    }
  },
}
</script>
