<template>
  <ModalWrapper @close-modal="$emit('closeModal')">
    <h5 class="edit-folder__title">Переименовать</h5>
    <div class="edit-folder__content">
      <input
        v-for="folder of Object.keys(folders)"
        :key="folder"
        class="edit-folder__folder"
        type="text"
        :readonly="folder === 'Неотсортированное'"
        :value="folder"
        @change="renameFolder(folder, $event.target.value)" />
    </div>
  </ModalWrapper>
</template>

<script>
import { useFolderStore } from '@/store/folders.js'
import ModalWrapper from '@/components/ModalWrapper.vue'

export default {
  components: { ModalWrapper },
  emits: ['closeModal'],
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
.edit-folder__title {
  margin-bottom: calc(var(--unit) * 2);
  font-size: var(--font-medium);
}

.edit-folder__content {
  overflow-y: auto;
  max-height: 300px;
}

.edit-folder__folder {
  margin-bottom: var(--unit);
  display: block;
}
</style>
