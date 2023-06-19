import { reactive } from 'vue'

export const state = reactive({
  currentLanguage: localStorage.getItem('lang') || 'en',
})

export const languages = { en: 'English', ru: 'Русский' }

export function $t(word) {
  if (!messages[word]) return 'Localization error'
  return messages[word][state.currentLanguage] || 'error l1'
}

export function changeLanguage(lang) {
  localStorage.setItem('lang', lang)
  state.currentLanguage = lang
}

export const messages = {
  changeLanguage: {
    ru: 'Сменить язык',
    en: 'Change language',
  },
  Edit: {
    ru: 'Изменить',
    en: 'Edit',
  },
  changeTask: {
    ru: 'Изменить задачу',
    en: 'Change task',
  },
  notSorted: {
    ru: 'Неотсортированное',
    en: 'Not sorted',
  },
  textOfTask: {
    ru: 'Текст задачи',
    en: 'Text of task',
  },
  textOfSubtask: {
    ru: 'Текст подзадачи',
    en: 'Text of subtask',
  },
  allFolders: {
    ru: 'Все папки',
    en: 'All Folders',
  },
  all: {
    ru: 'Все',
    en: 'All',
  },
  active: {
    ru: 'Активные',
    en: 'Active',
  },
  ready: {
    ru: 'Выполненные',
    en: 'Ready',
  },
  notSorted: {
    ru: 'Неотсортированные',
    en: 'Not Sorted',
  },
  search: {
    ru: 'Поиск',
    en: 'Search',
  },
  favorites: {
    ru: 'Избранное',
    en: 'Favorites',
  },
  newFolder: {
    ru: 'Новая папка',
    en: 'New Folder',
  },
  changeTheme: {
    ru: 'Сменить тему',
    en: 'Change Theme',
  },
  keyboardShortcuts: {
    ru: 'Сочетания клавиш',
    en: 'Keyboard Shortcuts',
  },
  folders: {
    ru: 'Папки',
    en: 'Folders',
  },
  createTask: {
    ru: 'Создать задачу',
    en: 'Create task',
  },
  export: {
    ru: 'Экспорт',
    en: 'Export',
  },
  import: {
    ru: 'Импорт',
    en: 'Import',
  },
  folderLengthError: {
    ru: 'Длина папки не может быть меньше 2',
    en: 'Folder length cannot be less than 2',
  },
  noResultsFound: {
    ru: 'Ничего не найдено',
    en: 'No results found',
  },
  lightTheme: {
    ru: 'Светлая тема',
    en: 'Light Theme',
  },
  darkTheme: {
    ru: 'Темная тема',
    en: 'Dark Theme',
  },
  shortcuts: {
    ru: 'Сочетания клавиш',
    en: 'Shortcuts',
  },
  rename: {
    ru: 'Переименовать',
    en: 'Rename',
  },
  createTask: {
    ru: 'Создать задачу',
    en: 'Create Task',
  },
  addSubtask: {
    ru: 'Добавить подзадачу',
    en: 'Add Subtask',
  },
  add: {
    ru: 'Добавить',
    en: 'Add',
  },
  error: {
    ru: 'Ошибка',
    en: 'Error',
  },
  errorFolderName: {
    ru: 'Название папки не может быть меньше двух символов',
    en: 'Error',
  },
  errorFolderNameS: {
    ru: 'Папка с таким именем уже существует',
    en: 'Error',
  },
}
