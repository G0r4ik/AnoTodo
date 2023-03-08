<template>
  <teleport to="body">
    <div class="edit-folder">
      <div class="edit-folder__inner">
        <div class="edit-folder__cross" @click="$emit('closePopup')">
          <IconCross />
        </div>
        <h5 class="edit-folder__title" @click="showCreatePostModal">
          Переименовать
        </h5>
        <div class="edit-folder__content">
          <input
            v-for="folder of Object.keys(folders)"
            :key="folder"
            class="edit-folder__folder"
            type="text"
            :readonly="folder === 'Неотсортированное'"
            @change="renameFolder(folder, $event.target.value)"
            :value="folder" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { useFolderStore } from '../store/folders.js'
export default {
  emits: ['closePopup'],
  computed: {
    folders() {
      return useFolderStore().folders
    },
  },
  methods: {
    renameFolder(oldFolderName, newFolderName) {
      useFolderStore().renameFolder(oldFolderName, newFolderName)
    },
  },
}
</script>

<style>
.edit-folder {
  position: fixed;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url('../assets/grain.png');
  background-color: var(--color-secondary);
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 8px 0px;
  border-radius: var(--border-radius-normal);
  padding: 12px;
  z-index: var(--z-index-modal);
}
.edit-folder__inner {
  position: relative;
}
.edit-folder__cross {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.edit-folder__cross svg {
  width: 24px;
  height: 24px;
}
.edit-folder__title {
  margin-bottom: 12px;
  font-size: var(--font-medium);
}
.edit-folder__content {
  overflow-y: auto;
  max-height: 300px;
}
.edit-folder__folder {
  margin-bottom: 5px;
}
</style>
