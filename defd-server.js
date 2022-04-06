import path from 'path'
import express from 'express'


import Dictionary from './service/dictionary.serviсe.js'
import { myLogBlue, myLogRed, myLogGreen, myBlueText, myRedText } from './service/mylog.service.js'
import FormatDate from './service/date.serviсe.js'


const PORT = 5000
const dictionaryName = 'ENGLISH_v2.JSON'
const dictionaryPath = path.resolve('src', dictionaryName)
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "*")

    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/dictionary/API', async (req, res) => {
    try {
        const dictionary= await Dictionary.getDictionary(dictionaryPath)

        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "*")

        res.send(dictionary)
    } catch(err) {
        myLogRed(FormatDate.getDate())
        myRedText(err)
    }
})

app.get('/dictionary/API/sectionslist', async (req, res) => {
    try {
        const sectionsListName = await Dictionary.getSectionsName(dictionaryPath)

        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "*")

        res.send(sectionsListName)        
    } catch(err) {
        myLogRed(FormatDate.getDate())
        myRedText(err)
    }
})

app.get('/dictionary/API/:section', async (req, res) => {
    try {
        const sectionName = req.params.section
        const sectionDictionary = await Dictionary.getSection(dictionaryPath, sectionName)

        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "*")

        res.send(sectionDictionary)
    } catch(err) {
        myLogRed(FormatDate.getDate())
        myRedText(err)
    }
})


app.listen(PORT, () => {
    myLogBlue(FormatDate.getDate())
    myLogGreen(`Сервер "Dictionary english for development" запущен на http://localhost:${PORT}/`)
    myBlueText(`Запрос словаря: http://localhost:${PORT}/dictionary/API`)
    myBlueText(`Запрос списка имен секций словаря: http://localhost:${PORT}/dictionary/API/sectionslist`)
    myBlueText(`Запрос секции словаря: http://localhost:${PORT}/dictionary/API/:section-name`)
    myBlueText('Остановить сервер ctrl: + c')
})


// ? удалить слово и перезапишет файл
// ? removeWordInDictionary(dictionaryPath, fileName, 'layout')
// Dictionary.removeWord(dictionaryPath, 'value')

// ? добавить слово и перезаписать файл
// ? addWordInDictionary(dictionaryPath, fileName, 'layout', 'расположение, планировка')
// Dictionary.addWord(dictionaryPath, 'exist', 'существовать')
// Dictionary.addWord(dictionaryPath, 'implements', 'реализовать')

// Dictionary.log(dictionaryPath)