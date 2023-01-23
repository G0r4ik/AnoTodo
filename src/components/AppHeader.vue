<script>
import IconBurger from './icons/IconBurger.vue'

export default {
  emits: ['inputSearch', 'changeShowFolders'],
  data() {
    return {}
  },
  components: { IconBurger },
}
</script>

<template>
  <header class="header">
    <div class="header__burger" @click="$emit('changeShowFolders')">
      <IconBurger />
    </div>
    <div class="search">
      <input
        :ref="'header-search'"
        class="search__input"
        type="search"
        name="search"
        id="header-search"
        placeholder="Поиск"
        @input="$emit('inputSearch', $event.target.value)"
      />
    </div>
  </header>
</template>

<style>
.header__burger {
  cursor: pointer;
  margin-right: auto;
  display: none;
}
.header__burger svg {
  width: 24px;
  height: 24px;
}
.header {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid var(--color-gray);
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  background-color: white;
  background-image: url('../assets/grain.png');
  z-index: 10;
}

.search__input {
  transition: 0.3s;
  width: 300px;
}
.search__input:focus,
.search__input:not(:placeholder-shown) {
  width: 500px;
  transition: 0.6s;
}

.search__where {
  display: flex;
  flex-direction: column;
  font-size: 18px;
}

.search__where-input {
  display: none;
}

.search__where-input:checked ~ .search__where-label {
  font-weight: 700;
}

.search__where-label {
  cursor: pointer;
}

@media (max-width: 768px) {
  .header__burger {
    display: block;
  }
  .visible-header {
    display: none;
  }
  .search {
    width: 100%;
    margin-left: 12px;
    text-align: right;
  }
  .search__input:focus,
  .search__input:not(:placeholder-shown) {
    width: 100%;
  }
}
</style>
