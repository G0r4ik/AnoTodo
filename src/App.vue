<template>
  <AppHeader />
  <AppSidebar />
  <AppTasks />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTasks from '@/components/AppTasks.vue'
import { handleKeyDown } from '@/helpers/hotkeys.js'

export default {
  components: { AppHeader, AppSidebar, AppTasks },
  mounted() {
    document.addEventListener('keydown', handleKeyDown)
    const theme = localStorage.getItem('theme')
    document.documentElement.setAttribute('theme', theme)
  },
}
</script>
