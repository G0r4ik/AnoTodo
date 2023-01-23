<script>
import IconCrose from './icons/IconCross.vue'

export default {
  props: ['folders', 'currentFolder', 'isShowFolders'],
  emits: ['changeCurrentFolder', 'createNewFolder', 'deleteFolder'],
  data() {
    return {
      newFolder: '',
    }
  },
  mounted() {},
  methods: {
    createNewFolder() {
      this.newFolder = this.newFolder.trim()
      if (this.newFolder === '') return
      this.$emit('createNewFolder', this.newFolder)
      this.newFolder = ''
    },
  },
  components: { IconCrose },
}
</script>
<template>
  <aside class="sidebar" :class="{ sidebar_hidden: isShowFolders }">
    <div class="sidebar__title">Папки</div>
    <div class="sidebar__folders">
      <!-- v-for="folder of [ 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
      4, 4, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, ]" -->
      <div
        @click="$emit('changeCurrentFolder', 'all')"
        @keypress.enter="$emit('changeCurrentFolder', 'all')"
        tabindex="0"
        class="sidebar__folder"
        :class="{ sidebar__folder_active: !currentFolder }"
      >
        Все
      </div>
      <div
        v-for="folder of folders"
        @click="$emit('changeCurrentFolder', folder)"
        @keypress.enter="$emit('changeCurrentFolder', folder)"
        tabindex="0"
        class="sidebar__folder"
        :class="{ sidebar__folder_active: folder === currentFolder }"
      >
        <span class="sidebar__folder-text">{{ folder }} </span>
        <div
          class="sidebar__new-folder-delete"
          @click.stop="$emit('deleteFolder', folder)"
        >
          <IconCrose />
        </div>
      </div>
    </div>
    <div class="sidebar__new-folder">
      <input
        v-model="newFolder"
        class="sidebar__new-folder-input"
        type="text"
        name="new-folder"
        id="new-folder"
        placeholder="Новая папка"
        @keypress.enter="createNewFolder"
      />
      <button class="sidebar__new-folder-button" @click="createNewFolder">
        +
      </button>
    </div>
  </aside>
</template>

<style>
.sidebar {
  overflow-y: auto;
  min-width: 200px;
  width: 200px;
  background: url('../assets/grain.png');
  background-color: white;
  z-index: 50;
  top: 50px;
  height: calc(100vh - 50px);
  overflow-y: auto;
  padding: 0 15px;
  /* box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px; */
  transition: 0.6s;
  padding-top: 12px;
  height: 100%;
  margin-right: 18px;
}

.sidebar__title {
  margin-bottom: 16px;
  padding-bottom: 6px;
  border-bottom: 1px solid black;
}
.sidebar__folders {
  margin-bottom: 12px;
}
.sidebar__folder {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  padding: 6px;
  border-radius: 6px;
  box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
}
.sidebar__folder-text {
  max-width: calc(100% - 24px);
  width: auto;
  display: block;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.sidebar__new-folder-delete svg {
  min-width: 24px;
  min-height: 24px;
}
.sidebar__new-folder-delete {
  min-width: 24px;
  min-height: 24px;
}
.sidebar__folder_active {
  font-weight: 700;
  color: orangered;
}
.sidebar__new-folder {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sidebar__new-folder-input {
  width: 150px;
  width: 100%;
  margin-right: 6px;
  padding: 2px;
}
.sidebar__new-folder-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  min-height: 24px;
  border-radius: 50%;
  border: 1px solid black;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
  }
  .sidebar_hidden {
    display: none;
  }
}
</style>
