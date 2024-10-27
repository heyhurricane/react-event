# React Event

Это SPA-маркетплейс для благотворительных сборов, созданный в рамках [хакатона](https://github.com/nat-davydova/charity_event_back_oct2024).
Приложение позволяет пользователям просматривать запросы о помощи от различных фондов, откладывать интересующие их запросы в "Избранное" и участвовать в благотворительности.
[Деплой]()

## Основные возможности

- **Просмотр благотворительных запросов**: Пользователи могут просматривать все доступные запросы в формате списка или сетки.
- **Фильтрация и поиск**: В блоке "Найдено" отображается количество запросов, соответствующих выбранным фильтрам и поисковому запросу.
- **Аутентификация**: Доступ к приложению возможен только для трех заранее определенных пользователей.
- **Личный профиль**: Пользователи могут просматривать свои личные данные и избранные запросы.
- **Управление сессией**: Возможность выхода из аккаунта в любой момент, что аннулирует текущую сессию и перенаправляет на страницу Входа.

## Используемые технологии

- **TypeScript**: Статическая типизация для повышения надежности кода.
- **React**: Библиотека для построения пользовательского интерфейса.
- **MUI (Material-UI)**: Компонентная библиотека для быстрого создания интерфейсов с использованием Material Design.
- **Redux Toolkit**: Набор инструментов для управления состоянием приложения и упрощения работы с Redux.
- **React Toastify**: Библиотека для удобного отображения уведомлений и всплывающих сообщений.

## Установка

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/heyhurricane/react-event.git
   ```
2. Перейдите в папку проекта:
   ```bash
   cd react-event
   ```
3. Установите зависимости:
   ```bash
   npm install
   ```
4. Запустите проект:
   ```bash
   npm pun dev
   ```

## Функционал и сценарии использования

### Аутентификация

- Пользователь может войти только с учетными данными одного из трех предопределенных пользователей.
- При неверно указанной паре логин пароль выводится сообщение "Неправильный логин пароль! Попробуйте еще раз"
- При получении ошибки от сервера, выводится сообщение "Ошибка на сервере! Попробуйте позже"
- Успешная аутентификация перенаправляет пользователя на страницу со списком запросов.
- Авторизированный пользователь не может попасть на страницу логина пока сам не разлогинится.
- Если у пользователя просрочился jwt токен, редиректим его на страницу логина.
- Валидация полей логина как имейла и пароля не меньше 6 символов.

### Список запросов

- Все запросы загружаются через API при загрузке страницы.
- Запросы можно просматривать в виде списка или сетки, с указанием их общего количества.

### Профиль пользователя

- Профиль содержит разделы "Личные данные" и "Контакты", данные для которых загружаются через API.
- Раздел "Избранное" показывает запросы, добавленные пользователем, аналогично отображению на странице списка запросов.

### Меню профиля

- В меню доступно два действия: "Мой профиль" и "Выйти".
- Нажатие на "Выйти" аннулирует сессию и возвращает пользователя на страницу Входа.
- Нажатие на "Мой профиль" переадресует пользователя на страницу профиля.

## Ошибки

- Если API вызовы для загрузки данных или избранного завершатся с ошибкой, пользователю отображаются соответствующие сообщения об ошибках.

```

```
