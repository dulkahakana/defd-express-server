import { readDictionary, writeDictionary } from './storage.service.js'
import { myLogBlue, myLogRed, myLogGreen } from './mylog.service.js'

// ? сортирует переданный массив объектов (list) по ключу объетка (optionSort)
const sortWordsList = (list, optionSort) => {
    return [...list].sort((a, b) => a[optionSort].localeCompare(b[optionSort]))
}

// ? добавляет новое слово в словарь
// ? передаем, ({словарь}, 'слово', 'перевод')
const addWordInSection = (dictionary, word, translation) => {
    const dictionarySection = [...dictionary[word[0]]]
    dictionarySection.push({english: word, russian: translation})
    dictionary[word[0]] = dictionarySection
    return dictionary
}

// ? удаляет слово из словаря
// ? передаем, ({словарь}, 'слово')
const removeWordFromSection = (dictionary, word) => {
    const dictionarySection = [...dictionary[word[0]]]
    const newDictionarySection = dictionarySection.filter(item => item.english !== word)
    dictionary[word[0]] = newDictionarySection
    return dictionary
}

// ? добавление слова + сортировка
// ? перезапись файла
export const addWordDictionary = async (path, newWord, newWordTranslation, optionSort = 'english') => {
    try {
        let dictionary = await readDictionary(path)
        dictionary = addWordInSection(dictionary, newWord, newWordTranslation)
        for (let key in dictionary) {
            if (key === newWord[0]) {
                dictionary[key] = sortWordsList(dictionary[key], optionSort)
            }
        }
        await writeDictionary(path, dictionary)
        myLogBlue(`english: ${newWord}, russian: ${newWordTranslation}`)
        myLogGreen('успешно добавлено')
    } catch(err) {
        myLogRed(err)
    }
}

// ? удаление файла
// ? перезапись файла
export const removeWordDictionary = async (path, removeWord, optionSort = 'english') => {
    try {
        let dictionary = await readDictionary(path)
        dictionary = removeWordFromSection(dictionary, removeWord)
        await writeDictionary(path, dictionary)
        myLogBlue(`${removeWord}`)
        myLogGreen('Удалено')
    } catch(err) {
        myLogRed(err)
    }
}

// ? словарь в консоль
export const logDictionary = async (path) => {
    try {
        const dictionary = await readDictionary(path)
        console.log(dictionary)
    } catch(err) {
        myLogRed(err)
    }
}

export const getDictionary = async (path) => {
    try {
        const dictionary = await readDictionary(path)
        return dictionary
    } catch(err) {
        myLogRed(err)
    }
}