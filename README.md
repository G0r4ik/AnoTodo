|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue

|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue

|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue

## НОВОЕ:

- дать возможность закрепить папку или драгндропать
- улучшить отзывчивость (при ошибках, валидациях)
- возможнось добавить подзадачу в окне редактора
- возможность редактирование горячих клавиш
- интеграция с google drive
- post css and another
- bundler analize
- dragndrop
- фильтры

## ФИКС:

- focus \ tabindex \ всё можно делать с помощью клавиатуры
- если открыты два модальных окна то не закрываются.=(
- удалить прослушиватели
- цвет текста на тасках
- bject.keys(folders)
- CSS REFACTORING...
- task-list
- убрать ?.

## ВОПРОСЫ:

- нужно ли нам передовать id или сразу
- что делать если мы работаем с localStorage и кардинально меняем данные, то единтсвенное что попомгает это clear(), но на стороне клиента это делать плохо.
- modal vs popup vs ...
- default: () => ({})?

## READY

- transition запихнуть в модальные компоненты
- что нам делать при переполнении folder name
- возможность создавать неотсортированные
- более оптимизированный шрифт добавить
- при нажатии на нужную папку скрывать.
- border на модальных окнах не видно
- Анимации к модальным окнам
- где расположить создание
- разным цветом помечать
- Object.keys(folders)
- переименовать папку
- страница с хотекями
- скролл красивый
- :key пофиксить
- stylelint
- избранное
- eslint
