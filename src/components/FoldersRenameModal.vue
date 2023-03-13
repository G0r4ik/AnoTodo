<template>
  <teleport to="body">
    <transition name="fade">
      <ModalWrapper v-if="isShow" @close-modal="$emit('closeModal')">
        <template #header>Переименовать</template>
        <template #content>
          <div class="edit-folder">
            <input
              v-for="folder of allUserFolders"
              :key="folder"
              class="edit-folder__folder"
              type="text"
              :value="folder"
              @change="renameFolder(folder, $event.target.value)" />
          </div>
        </template>
      </ModalWrapper>
    </transition>
  </teleport>
</template>

<script>
import ModalWrapper from '@/components/ModalWrapper.vue'
import { useFolderStore } from '@/store/folders.js'

export default {
  components: { ModalWrapper },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['closeModal'],
  computed: {
    allUserFolders() {
      return useFolderStore().allUserFolders()
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
  max-height: var(--height-folder-rename);
  overflow-y: auto;
}

.edit-folder__folder {
  display: block;
  padding: var(--unit);
  margin-bottom: var(--unit);
}
</style>
