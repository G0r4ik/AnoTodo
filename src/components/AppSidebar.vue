<template>
  <aside class="sidebar" :class="{ sidebar_hidden: !isFoldersVisible }">
    <div class="sidebar__inner">
      <SidebarTop />
      <SidebarsFolderList />
      <SidebarBottom />
    </div>
  </aside>
</template>

<script>
import SidebarTop from '@/components/SidebarTop.vue'
import SidebarsFolderList from '@/components/SidebarsFolderList.vue'
import SidebarBottom from '@/components/SidebarBottom.vue'
import { useFolderStore } from '@/store/folders.js'

export default {
  components: { SidebarsFolderList, SidebarBottom, SidebarTop },
  computed: {
    isFoldersVisible() {
      return useFolderStore().isFoldersVisible
    },
  },
}
</script>

<style>
.sidebar {
  position: fixed;
  top: var(--height-header);
  left: 0;
  z-index: var(--z-index-overlay);
  width: var(--width-sidebar);
  height: calc(100% - var(--height-header));
  padding: calc(var(--unit) * 2);
  padding-bottom: var(--unit);
  background: url('@/assets/grain.png') var(--color-bg);
  border-right: var(--border-width-main) solid var(--color-secondary);
}

.sidebar__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media (max-width: 768px) {
  .sidebar_hidden {
    display: none;
  }
}
</style>
