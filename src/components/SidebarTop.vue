<template>
  <div class="sidebar__top">
    <span class="sidebar__title">Папки</span>
    <button class="sidebar__edit" @click="toggleEditFolderModal">
      <IconEdit />
    </button>
  </div>

  <FoldersRenameModal
    :is-show="isShowEditFolder"
    @close-modal="toggleEditFolderModal" />
</template>

<script>
import FoldersRenameModal from '@/components/FoldersRenameModal.vue'

export default {
  components: { FoldersRenameModal },
  data() {
    return {
      isShowEditFolder: false,
    }
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
