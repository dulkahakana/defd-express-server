import path from 'path'
import express from 'express'

import { addWordDictionary, removeWordDictionary, logDictionary, getDictionary } from './service/dictionaty.service.js'
import { myLogBlue, myLogRed, myLogGreen } from './service/mylog.service.js'


const PORT = 5000
// ? название файла словаря
const fileName = 'ENGLISH_v2.JSON'
// ? путь до словаря
const filePath = path.resolve('src', fileName)
// myLogRed(filePath)
const app = express()

app.get('/dictionary', async (req, res) => {
    try {
        const dictionary = await getDictionary(filePath)
        res.send(dictionary)
    } catch(err) {
        myLogRed(err)
    }
})

// app.get('/dictionary/add/:word', (req, res) => {
//     const rap = req.params.word
//     myLogBlue(`id: ${rap}`)
// })


app.listen(PORT, () => myLogGreen(`REST API ENGLISH running on localhost:${PORT}`))

// удалить слово и перезапишет файл
// removeWordInDictionary(filePath, fileName, 'layout')
// removeWordDictionary(filePath, 'value')

// добавить слово и перезаписать файл
// addWordInDictionary(filePath, fileName, 'layout', 'расположение, планировка')
// addWordDictionary(filePath, 'exist', 'существовать')
// addWordDictionary(filePath, 'implements', 'реализовать')

// logDictionary(filePath)