<template>
  <AppHeader />
  <AppSidebar />
  <AppTasks />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTasks from '@/components/AppTasks.vue'
import { handleKeyDown } from '@/hotkeys.js'

export default {
  components: { AppHeader, AppSidebar, AppTasks },
  mounted() {
    document.addEventListener('keydown', handleKeyDown)
  },
}
</script>
