<template>
  <ModalWrapper @close-modal="$emit('closeModal')">
    <template #header>Переименовать</template>
    <template #content>
      <div class="edit-folder">
        <AppError
          v-if="error"
          :error="error"
          class="edit-folder__error"
          @close-error="closeError" />
        <div class="edit-folder__folders">
          <input
            v-for="folder of allUserFolders"
            :key="folder"
            class="edit-folder__folder-input"
            type="text"
            :value="folder"
            @change="renameFolder(folder, $event.target.value)" />
        </div>
      </div>
    </template>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from '@/components/ModalWrapper.vue'
import { useFolderStore } from '@/store/folders.js'

export default {
  components: { ModalWrapper },
  props: {
    isShow: { type: Boolean, default: false },
  },
  emits: ['closeModal'],
  data() {
    return {
      error: null,
    }
  },
  computed: {
    allUserFolders() {
      return useFolderStore().allUserFolders
    },
  },
  mounted() {
    console.log('mountedFoldersRename')
  },
  methods: {
    closeError() {
      this.error = null
    },
    renameFolder(oldFolderName, newFolderName) {
      if (newFolderName.length < 2) {
        this.error = 'Название папки не может быть меньше двух символов'
      } else if (useFolderStore().folders[newFolderName]) {
        this.error = 'Папка с таким именем уже существует'
      } else {
        useFolderStore().renameFolder(oldFolderName, newFolderName)
      }
    },
  },
}
</script>

<style>
.edit-folder {
  position: relative;
  max-width: 300px;
}

.edit-folder__error {
  position: absolute;
  margin-bottom: var(--unit);
}

.edit-folder__folders {
  max-height: var(--height-folder-rename);
  overflow-x: hidden;
  overflow-y: auto;
}

.edit-folder__folder-input {
  display: block;
  padding: var(--unit);
  margin-bottom: var(--unit);
}
</style>
