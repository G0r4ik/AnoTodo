<template>
  <div class="sidebar__folders">
    <div
      tabindex="0"
      class="sidebar__folder"
      :class="{ sidebar__folder_active: !currentFolder }"
      @click="changeCurrentFolder('all')"
      @keypress.enter="changeCurrentFolder('all')">
      Все
    </div>
    <div
      v-for="folder of allStaticFolder"
      :key="folder"
      :data-folder="folder"
      tabindex="0"
      class="sidebar__folder"
      :class="{ sidebar__folder_active: currentFolder === folder }"
      @click="changeCurrentFolder(folder)"
      @keypress.enter="changeCurrentFolder(folder)">
      {{ folder }}
    </div>
    <div class="sidebar__folders-users">
      <div
        v-for="folder of allUserFolders"
        :id="folder"
        :key="folder"
        :data-folder="folder"
        tabindex="0"
        class="sidebar__folder sidebar__folder_user"
        :class="{
          sidebar__folder_active: folder === currentFolder,
          sidebar__folder_dublicate: isFolderDuplicate(folder),
          locked: isLockCheck(folder),
        }"
        @click="changeCurrentFolder(folder)"
        @keypress.enter="changeCurrentFolder(folder)">
        <div class="sidebar__folder-inner" @click.prevent>
          <IconLock
            v-if="isLockCheck(folder)"
            class="sidebar__lock"
            stroke="var(--color-primary)"
            @click.stop="deleteLockedFolder(folder)" />
          <IconUnlock
            v-else
            class="sidebar__lock"
            @click.stop="pushLockedFolders(folder)" />
          <IconMove class="sidebar__move" @click.stop />
          <span class="sidebar__folder-text">{{ folder }} </span>
        </div>

        <button
          class="sidebar__new-folder-delete"
          @click.stop="deleteFolder(folder)">
          <IconCross />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import { useFolderStore } from '@/store/folders.js'

export default {
  data() {
    return {
      sortedList: null,
    }
  },
  computed: {
    allUserFolders() {
      return useFolderStore().allUserFolders
    },
    allStaticFolder() {
      return useFolderStore().allStaticFolders
    },
    currentFolder() {
      return useFolderStore().currentFolder
    },
    folders() {
      return useFolderStore().folders
    },
    isLockCheck() {
      return folder => useFolderStore().lockedFolders.includes(folder)
    },
  },
  mounted() {
    const el = document.querySelector('.sidebar__folders-users')
    Sortable.create(el, {
      handle: '.icon-move',
      filter: '.locked',
      onEnd: event => {
        console.dir(event.item.firstChild)
        const itemEl = event.item
        const newIndex = event.newIndex
        const folderName = itemEl.textContent
        const folders = useFolderStore().allUserFolders
        const oldIndex = folders.indexOf(folderName)
        folders.splice(oldIndex, 1)
        folders.splice(newIndex, 0, folderName)
        const obj = new Map()
        for (const folder of folders) {
          obj.set(folder, this.folders.get(folder))
        }
        for (const folder of this.folders.keys()) {
          if (!obj.has(folder)) {
            obj.set(folder, this.folders.get(folder))
          }
        }
        useFolderStore().folders = obj
      },
    })
  },

  methods: {
    pushLockedFolders(folder) {
      useFolderStore().pushLockedFolders(folder)
    },
    deleteLockedFolder(folder) {
      useFolderStore().deleteLockedFolder(folder)
    },
    isFolderDuplicate(folderName) {
      return useFolderStore().isFolderDuplicate(folderName)
    },
    changeCurrentFolder(folder) {
      useFolderStore().setCurrentFolder(folder === 'all' ? null : folder)
    },
    deleteFolder(folder) {
      useFolderStore().deleteFolder(folder)
    },
  },
}
</script>

<style>
.sidebar__folders {
  height: 100%;
  margin-bottom: var(--height-sidebar-bottom);
  overflow-y: auto;
}

.sidebar__folder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--unit) 0;
  margin-bottom: var(--unit);
  cursor: pointer;
}

.sidebar__folder-inner {
  display: flex;
  gap: var(--unit);
  align-items: center;
}

.sidebar__folder-text {
  display: block;
  max-width: calc(100% - var(--height-icon-main));
  word-break: break-all;
  overflow-wrap: break-word;
}

.sidebar__new-folder-delete {
  width: var(--height-icon-main);
  min-width: var(--height-icon-main);
  height: var(--height-icon-main);
}

.sidebar__folder_active {
  color: var(--color-primary);
}

.sidebar__folder_dublicate {
  color: var(--color-danger);
  transform: rotate(0);
  animation: shake 0.75s ease-in-out infinite;
}

.sidebar__lock,
.sidebar__move {
  width: var(--height-icon-main);
  min-width: var(--height-icon-main);
}

@keyframes shake {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(2deg);
  }

  50% {
    transform: rotate(-2deg);
  }

  100% {
    transform: rotate(0);
  }
}
</style>
