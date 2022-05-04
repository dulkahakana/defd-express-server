import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import express from 'express'


import Dictionary from './service/dictionary.serviсe.js'
import { myLogBlue, myLogRed, myLogGreen, myBlueText, myRedText, myGreenText } from './service/mylog.service.js'
import FormatDate from './service/date.serviсe.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const PORT = 5000
// имя файла словаря
const dictionaryName = 'ENGLISH_v2.JSON'
// путь к файлу словаря
const dictionaryPath = path.resolve('db', dictionaryName)
const app = express()
app.disable('x-power-by')

app.use(express.static('public'))
app.use(express.json())

app.disable('x-power-by')

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    myLogRed(__dirname)
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/dictionary/API', async (req, res) => {
    try {
        const dictionary= await Dictionary.getDictionary(dictionaryPath)

        res.send(dictionary)
    } catch(err) {
        myLogRed(FormatDate.getDate())
        myRedText(err)
    }
})

app.get('/dictionary/API/sectionslist', async (req, res) => {
    try {
        const sectionsListName = await Dictionary.getSectionsName(dictionaryPath)

        res.send(sectionsListName)        
    } catch(err) {
        myLogRed(FormatDate.getDate())
        myRedText(err)
    }
})

app.get('/dictionaty/API/quantitywords', async (req, res) => {
    try {
        const quantitywords = await Dictionary.getQuantity(dictionaryPath)
        res.send(quantitywords)
    } catch (err) {
        myLogRed(FormatDate.getDate())
        myRedText(err)
    }
})

app.get('/dictionary/API/:section', async (req, res) => {
    try {
        const sectionName = req.params.section
        const sectionDictionary = await Dictionary.getSection(dictionaryPath, sectionName)

        myLogBlue(FormatDate.getDate())
        myGreenText(`Запрос секции: ${sectionName}`)
        res.send(sectionDictionary)
    } catch(err) {
        myLogRed(FormatDate.getDate())
        myRedText(err)
    }
})

app.post('/dictionary/API', async (req, res) => {
    try {
        const {english, russian} = req.body
        
        await Dictionary.addWord(dictionaryPath, english, russian)

        myLogBlue(FormatDate.getDate())
        myBlueText('В словарь добавлено новое слово:')
        myGreenText(`${english} - ${russian}`)
    } catch(err) {
        myLogRed(FormatDate.getDate())
        myRedText(err)
    }
})

app.delete('/dictionary/API', async (req, res) => {
    try {
        const {english, russian} = req.body
        await Dictionary.removeWord(dictionaryPath, english)
        
        myLogBlue(FormatDate.getDate())
        myBlueText('Из словаря удалено слово:')
        myRedText(`${english} - ${russian}`)
        
    } catch(err) {
        myLogRed(FormatDate.getDate())
        myRedText(err)
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
    myLogBlue(FormatDate.getDate())
    myLogGreen(`Сервер "Dictionary english for development" запущен на http://localhost:${PORT}/`)
    myBlueText(`Запрос словаря: GET http://localhost:${PORT}/dictionary/API`)
    myBlueText(`Запрос списка имен секций словаря: GET http://localhost:${PORT}/dictionary/API/sectionslist`)
    myBlueText(`Запрос секции словаря: GET http://localhost:${PORT}/dictionary/API/:section-name`)
    myGreenText(`Добавление нового слова: POST http://localhost:${PORT}/dictionary/API`)
    myRedText(`Удаление слова: DELETE http://localhost:${PORT}/dictionary/API`)
    myLogGreen('Остановить сервер ctrl: + c')
})