import path from 'path'


import { readDictionary, writeDictionary } from './service/storage.service.js'
import { sortWordsList, addWordInSection, removeWordInSection } from './service/dictionaty.service.js'
import { myLogBlue, myLogRed, myLogGreen } from './service/mylog.service.js'



// название файла словаря
const fileName = 'ENGLISH_v2.JSON'
// путь до словаря
const filePath = path.resolve('src', fileName)
// myLogRed(filePath)



// ? добавление слова + сортировка
// ? перезапись файла
const addWordDictionary = async (path, newWord, newWordTranslation, optionSort = 'english') => {
    try {
        let dictionary = await readDictionary(path)
        dictionary = addWordInSection(dictionary, newWord, newWordTranslation)
        for (let key in dictionary) {
            dictionary[key] = sortWordsList(dictionary[key], optionSort)
        }
        await writeDictionary(path, dictionary)
        myLogBlue(`${newWord} - ${newWordTranslation}`)
        myLogGreen('Успешно добавлено')
    } catch(err) {
        myLogRed(err)
    }
}

// ? удаление файла + сортировка
// ? перезапись файла
const removeWordDictionary = async (path, removeWord, optionSort = 'english') => {
    try {
        let dictionary = await readDictionary(path)
        dictionary = removeWordInSection(dictionary, removeWord)
        for (let key in dictionary) {
            dictionary[key] = sortWordsList(dictionary[key], optionSort)
        }
        await writeDictionary(path, dictionary)
        myLogBlue(`${removeWord}`)
        myLogGreen('Удалено')
    } catch(err) {
        myLogRed(err)
    }
}

// ? словарь в консоль
const logDictionary = async (path) => {
    try {
        const dictionary = await readDictionary(path)
        console.log(dictionary)
    } catch(err) {
        myLogRed(err)
    }
}

// удалить слово и перезапишет файл
// removeWordInDictionary(filePath, fileName, 'layout')
removeWordDictionary(filePath, 'xxx')

// добавить слово и перезаписать файл
// addWordInDictionary(filePath, fileName, 'layout', 'расположение, планировка')
// addWordDictionary(filePath, 'exist', 'существовать')
// addWordDictionary(filePath, 'import', 'импортировать')



// logDictionary(filePath)