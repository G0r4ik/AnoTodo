<template>
  <AppHeader ref="header" />
  <AppSidebar />
  <MainTodo />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import MainTodo from '@/components/MainTodo.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { useFolderStore } from '@/store/folders'
export default {
  components: {
    AppHeader,
    MainTodo,
    AppSidebar,
  },
  computed: {
    folders() {
      return useFolderStore().folders
    },
  },
  mounted() {
    document.body.addEventListener('keydown', this.handleKeydown)
    useFolderStore().setFolders()
  },
  watch: {
    folders: {
      handler(newValue) {
        localStorage.setItem('folders', JSON.stringify(newValue))
      },
      deep: true,
    },
  },
  methods: {
    handleKeydown(event) {
      if (event.ctrlKey && event.keyCode === 81) {
        this.$refs.header.$refs.headerSearch.focus()
      }
    },
  },
}
</script>
