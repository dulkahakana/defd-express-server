import { promises } from 'fs'

export const readDictionary = async (path) => {
    let data = {}
    if (isExist(path)) {
        const file = await promises.readFile(path)
        data = JSON.parse(file)
    }
    return data
}

export const writeDictionary = async (path, data) => {
    await promises.writeFile(path, JSON.stringify(data))
}

const isExist = async (path) => {
    try {
        await promises.stat(path)
        return data
    } catch(err) {
        return false
    }
}