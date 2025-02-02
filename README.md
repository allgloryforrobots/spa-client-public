# Стек
React, Redux Toolkit, TS, FSD, sass, editorjs, react-router-dom, JWT-авторизация

# FSD

## Однонаправленный поток данных
    Верхние слои могут использовать нижние
    Нижние не могут использовать верхние
    Слои одного уровня не могут использовать друг друга
    Чем выше слой, тем более он привязан к предметной области и тем больше в нем бизнес-логики
    Можно легко удалить любой блок со страницы
    Модуль должен решать одну конкретную задачу
    Каждый из слайсов должен обладать Public Api, выводит наружу не все, а то что снаружи действительно нужно

## Слайсы
Слои делятся на слайсы (модули)
Каждый слайс содержит сегменты: 

## Сегменты
    - UI 
        компоненты 
    - model 
        взаимодействие со стейтом, селекторы, экшены
    - lib 
        хелперы, вспомогательные функции, хуки
    - config 
    - api 
        CRUD-запросы, мапперы, которые подготавливают данные к отправке на сервер, либо подготавливают данные к работе на фронтенде
    - consts
    - types

##  Слои

App (инициализирующая логика приложения)
    Провайдеры, роутер, глобальная конфигурация, глобальные стили, глобальные декларации с типами

Processes (deprecated, не используется, но зарезервировано, затрагивает несколько страниц)

Pages (страницы приложения)
    Страница должна быть тонкой
    В идеальном варианте сочетание виджетов и фичей, обернутых  в лейаут

Widgets (самостоятельные и полноценные блоки для страниц)
    Комбинация Entity с фичами
    Sidebar, Header, Navbar, Footer, Postcard (карточка поста с лайками, комментариями)
    
Features (обрабатываемые пользовательские сценарии)
    1 фича =  1 задача
    AuthByPhone
    ArticleFeedback
    ChangePhoneForm
    Лайки, менюшки с действиями, кнопка подписаться
    Смена языка 
    Авторизация по email
    Кнопка, открывающая список уведомлений
    Кнопка, открывающая список уведомлений (где сам список - entity Notification)
    

Entities (бизнес-сущности)
    User, Article, Product, Order, Comment, Contract

Shared (переиспользуемые модули без привязки к бизнес-логике, можно перенести из одного проекта в другой)
    - Кнопки, инпуты
    - api
        Инстанс axios
        Базовые настройки fetch или rtk query
    - config
        storybook
        i18n
    - lib
        хуки
        хелперы для работы с контекстом, со стором, с url, с объектами


## Пример
pages ShopProductPage

features\widgets 
    ShopProductDetail ProductComments ProductRecommendations

entities 
    (относиться к ShopProductDetail):
        ProductDescription ProductCharacteristic 
    (относиться к ProductComments)
        CommentsList CommentForm 
    (относиться к ProductRecommendations)
        ProductList

shared 
    input, button


