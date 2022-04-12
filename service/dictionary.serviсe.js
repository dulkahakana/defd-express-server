import { readDictionary, writeDictionary } from './storage.service.js'
import { myLogBlue, myLogRed, myLogGreen, myGreenText} from './mylog.service.js'
import FormatDate from './date.serviсe.js'

export default class Dictionary {

    // ? получение всего словаря
    static async getDictionary(path) {
        try {
            const dictionary = await readDictionary(path)
            return dictionary
        } catch(err) {
            myLogRed(err)
        }
    }

    // ? получение секции словарая
    static async getSection(path, sectionName) {
        try {
            const dictionary = await readDictionary(path)
            const sectionDictionary = dictionary[sectionName]
            return sectionDictionary
        } catch(err) {
            myLogRed(err)
        }
    }

    // ? получение массива имен секций (алфавит)
    static async getSectionsName(path) {
        const dictionary = await readDictionary(path)
        return Object.keys(dictionary)    
    }

    // ? добавление слова + сортировка
    // ? перезапись файла
    static async addWord(path, newWord, newWordTranslation, optionSort = 'english') {
        try {
            let dictionary = await readDictionary(path)
            dictionary = addWordInSection(dictionary, newWord, newWordTranslation)
            for (let key in dictionary) {
                if (key === newWord[0]) {
                    dictionary[key] = sortWordsList(dictionary[key], optionSort)
                }
            }
            await writeDictionary(path, dictionary)

        } catch (err) {
            myLogRed(err)
        }
    }

    // ? удаление файла
    // ? перезапись файла
    static async removeWord(path, removeWord, optionSort = 'english') {
        try {
            let dictionary = await readDictionary(path)
            dictionary = removeWordFromSection(dictionary, removeWord)
            await writeDictionary(path, dictionary)
            myGreenText(FormatDate.getDate())
            myLogBlue(`${removeWord}`)
            myLogGreen('Удалено')
        } catch (err) {
            myLogRed(err)
        }
    }

    // ? кол-во слов в словаре
    static async getQuantity(path) {
        try {
            let dictionary = await readDictionary(path)
            let count = 0
            for (let key in dictionary) {                
                count += dictionary[key].length
            }
            return {quantitywords: count}
        } catch (err) {
            myLogRed(err)
        }
    }

    // ? словарь в консоль
    static async log(path) {
        try {
            const dictionary = await readDictionary(path)
            console.log(dictionary)
        } catch (err) {
            myLogRed(err)
        }
    }
} // class Dictionary

// ? сортирует переданный массив объектов (list) по ключу объетка (optionSort)
function sortWordsList(list, optionSort) {
    return [...list].sort((a, b) => a[optionSort].localeCompare(b[optionSort]))
}

// ? добавляет новое слово в словарь
// ? передаем, ({словарь}, 'слово', 'перевод')
function addWordInSection(dictionary, word, translation) {
    const dictionarySection = [...dictionary[word[0]]]
    dictionarySection.push({
        english: word,
        russian: translation
    })
    dictionary[word[0]] = dictionarySection
    return dictionary
}

// ? удаляет слово из словаря
// ? передаем, ({словарь}, 'слово')
function removeWordFromSection(dictionary, word) {
    const dictionarySection = [...dictionary[word[0]]]
    const newDictionarySection = dictionarySection.filter(item => item.english !== word)
    dictionary[word[0]] = newDictionarySection
    return dictionary
}