<template>
  <div class="sidebar__top">
    <span class="sidebar__title">{{ $t('folders') }}</span>
    <button
      v-if="hasUserFolder"
      class="sidebar__edit"
      @click="toggleEditFolderModal">
      <IconEdit />
    </button>
  </div>

  <teleport to="body">
    <transition name="fade">
      <FoldersRenameModal
        v-if="isShowEditFolder"
        @close-modal="toggleEditFolderModal" />
    </transition>
  </teleport>
</template>

<script>
import FoldersRenameModal from '@/components/FoldersRenameModal.vue'
import { hotkeys } from '@/helpers/hotkeys.js'
import { useFolderStore } from '@/store/folders.js'

export default {
  components: { FoldersRenameModal },
  data() {
    return {
      isShowEditFolder: false,
    }
  },
  computed: {
    hasUserFolder() {
      return useFolderStore().allUserFolders.length
    },
  },
  mounted() {
    hotkeys.showFolderRename.handler = this.toggleEditFolderModal
  },
  methods: {
    toggleEditFolderModal() {
      this.isShowEditFolder = !this.isShowEditFolder
    },
  },
}
</script>
<style>
.sidebar__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--unit);
  margin-bottom: calc(var(--unit) * 3);
  border-bottom: var(--border-width-main) solid var(--color-secondary);
}

.sidebar__title {
  font-weight: 700;
}

.sidebar__edit {
  width: var(--height-icon-main);
  height: var(--height-icon-main);
  cursor: pointer;
}
</style>
