# Dictionary English Express JS server

Я заполнял файл *ENGLISH.JSON* вручную, для лучшего запоминания слов.
После был написан *createNewJSONFormat.js* (нет на GitHub) для изменения структуры *ENGLISH.JSON*, для подготовки его к работе c сервером. 
Итоговый файл *ENGLISH_v2.JSON*, заменяет серверу базу данных.
Во время запроса происходит асинхронное чтение/запись и сортировка по ключу `english` - файла *ENGLISH_v2.JSON*.

## Запуск
`npm run start`

Сервер запускается по умолчанию на *http://localhost:5000*.
При запуске выдает в логах время запуска, используя *service/date.serviсe.js* и описание возможных запросов. Для вывода в консоль используется *service/mylog.service.js*.
## Роуты:
- **app.get()**
    `/` - собранное React приложение, [deft-react-app](https://github.com/dulkahakana/defd-react-app);
    `/dictionary/API` - все содержимое *ENGLISH_v2.JSON*;
    `/dictionary/API/sectionslist` - список названий секций (алфавит);
    `/dictionaty/API/quantitywords` - кол-во слов в словаре;
    `/dictionary/API/:section` - содержимое секции, переданной в параметрах. Выводит в консоль время запроса и имя, запрашиваемой секции;
- **app.post**
    `/dictionary/API` - добавляет переданное слово (объект {english, russian}) в словарь. Выводит в консоль время запроса и добавленное слово;
- **app.delete**
    `/dictionary/API` - удаляет переданное слово (объект {english, russian}) в словаре, используя значение `req.body.english`. Выводит в консоль время запроса и удаленное слово;


## Клиентская часть на React 18 [deft-react-app](https://github.com/dulkahakana/defd-react-app)
