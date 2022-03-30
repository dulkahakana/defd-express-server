const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

console.log(chalk.black.bgBlueBright(' CHALK TEST '))

// путь до словаря
const filePath = path.join(__dirname, 'src')
// название файла словаря
const fileName = 'ENGLISH_v2.JSON'

// перезаписывает файл
const writeFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                return reject(err.message)
            } else {
                resolve()
            }
        })
    })
}

// читает файлы, раскодирует 
const readFileAsync = async (path) => {
    return new Promise((resolve, reject) => fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
        if (err) {
            return reject(err.message)
        } else {
            resolve(data)
        }
    }))
}

// сортирует переданный массив объектов (list) по ключу объетка (optionSort)
const sortWordsList = (list, optionSort) => {
    return [...list].sort((a, b) => a[optionSort].localeCompare(b[optionSort]))
}

// добавляет новое слово в словарь
// передаем, ({словарь}, 'слово', 'перевод')
const addWordInSection = (dictionary, word, translation) => {
    const dictionarySection = [...dictionary[word[0]]]
    dictionarySection.push({english: word, russian: translation})
    dictionary[word[0]] = dictionarySection
    return dictionary
}

// удаляет слово из словарь
// передаем, ({словарь}, 'слово')
const removeWordInSection = (dictionary, word) => {
    const dictionarySection = [...dictionary[word[0]]]
    const newDictionarySection = dictionarySection.filter(item => item.english !== word)
    dictionary[word[0]] = newDictionarySection
    return dictionary
}

// ? добавление слова + сортировка
// ? перезапись файла
const addWordInDictionary = async(filePath, fileName, newWord, newWordTranslation, optionSort = 'english') => {
    await readFileAsync(path.resolve(filePath, fileName))    
        .then(data => JSON.parse(data))
        .then(data => {
            addWordInSection(data, newWord, newWordTranslation)
            return data
        })
        .then(data => {
            for (key in data) {
                data[key] = sortWordsList(data[key], optionSort)
            }
            return data
        })
        .then(data => writeFileAsync(path.resolve(filePath, fileName), JSON.stringify(data)))
        .catch(err => console.log(err))
}

// ? удаление файла + сортировка
// ? перезапись файла
const removeWordInDictionary = async(filePath, fileName, removeWord, optionSort = 'english') => {
    await readFileAsync(path.resolve(filePath, fileName))
        .then(data => JSON.parse(data))
        .then(data => {
            removeWordInSection(data, removeWord)
            return data
        })
        .then(data => {
            for (key in data) {
                data[key] = sortWordsList(data[key], optionSort)
            }
            return data
        })
        .then(data => writeFileAsync(path.resolve(filePath, fileName), JSON.stringify(data)))
        .catch(err => console.log(err))
}

// словарь в консоль
const logDictionary = async (filePath, fileName) => {
    try {
        const dictionary = JSON.parse(await readFileAsync(path.resolve(filePath, fileName)))
        console.log(dictionary)
    } catch(err) {
        console.log(err)
    }
}

// удалить слово и перезапишет файл
// removeWordInDictionary(filePath, fileName, 'layout')

// добавить слово и перезаписать файл
// addWordInDictionary(filePath, fileName, 'layout', 'расположение, планировка')


// logDictionary(filePath, fileName)









// ? сортировка по параметру
// ? перезапись файла
// const sortDictionary = async(filePath, fileName, optionSort) => {
//     await readFileAsync(path.resolve(filePath, fileName))
//         .then(data => JSON.parse(data))
//         .then(data => {
//             for (key in data) {
//                 data[key] = sortWordsList(data[key], optionSort)
//             }
//             return data
//         })
//         .then(data => console.log(data))
//         .catch(err => console.log(err))
// }


// addWordInDictionary(filePath, fileName, 'anton', 'антон')
// sortDictionary(filePath, fileName, 'english')





// writeFileAsync(path.resolve(filePath, 'test.txt'), 'data')
//     .then(() => appendFileAsync(path.resolve(filePath, 'test.txt'),'123'))
//     .then(() => appendFileAsync(path.resolve(filePath, 'test.txt'),'456'))
//     .then(() => appendFileAsync(path.resolve(filePath, 'test.txt'),'789'))
//     .then(() => readFileAsync(path.resolve(filePath, 'test.txt')))
//     .then(data => console.log(data))
//     .catch(err => console.log(err))