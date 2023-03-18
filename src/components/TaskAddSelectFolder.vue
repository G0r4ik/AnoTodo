<template>
  <select
    id="add-task-folder"
    class="add-task__select-folder"
    name="add-task-folder"
    :value="folder"
    @input="$emit('update:folder', $event.target.value)">
    <option
      v-for="folderItem of allFolders"
      :key="folderItem"
      :value="folderItem">
      {{ folderItem }}
    </option>
  </select>
</template>

<script>
import { useFolderStore } from '@/store/folders'

export default {
  props: { folder: { type: String, default: 'Неотсортированное' } },
  emits: ['add-task', 'update:folder'],
  computed: {
    allFolders() {
      return useFolderStore().allIndexedFolders
    },
  },
}
</script>

<style>
.add-task__select-folder {
  width: 100%;
  margin-bottom: var(--unit);
}
</style>
