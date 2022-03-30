const path = require('path')
const fs = require('fs')

const filePath = path.join(__dirname, '../src')
const oldFormatFileName = 'ENGLISH.JSON'
const newFormatFileName = 'ENGLISH_v2.JSON'


// ? чтения файла ('директрория', 'имя_файла')
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

const readFileAsync = async (path) => {
    return new Promise((resolve, reject) => fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
        if (err) {
            return reject(err.message)
        } else {
            resolve(data)
        }
    }))
}

const getNewLibrary = (obj) => {
    const editObj = []
    for (key in obj) {
        editObj.push({
            english: key,
            russian: obj[key]
        })
    }
    return editObj
}

const sortWordsList = (list, optionSort) => {
    return [...list].sort((a, b) => a[optionSort].localeCompare(b[optionSort]))
}

const formatAndSaveDictionary = async (oldFormatFileName, newFormatFileName) => {
    await readFileAsync(path.resolve(filePath, oldFormatFileName))
    .then(data => JSON.parse(data))
    .then(data => data[0])
    .then(data => {
        const editData = {}
        for (key in data) {
            editData[key] = getNewLibrary(data[key])            
        }
        return editData
    })
    .then(data => {
        for (key in data) {
            // console.log(`== ${key.toUpperCase()} ==`)
            data[key] = sortWordsList(data[key], 'english')
            // data[key] = data[key].map((item, index) => ({id: `${key}${index + 1}`, ...item}))
            // console.log(data[key])
            for (item of data[key]) {
                // console.log(item)
                // console.log(sortWordsList(item, 'english'))
            } 
        }
        return data
    })
    .then(data => {
        writeFileAsync(path.resolve(filePath, newFormatFileName), JSON.stringify(data))
        console.log('Dictionary is created')
    })
    .catch(err => console.log(err))
}

formatAndSaveDictionary(oldFormatFileName, 'ENGLISH_test_dictionary_2.JSON')
