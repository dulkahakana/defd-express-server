// сортирует переданный массив объектов (list) по ключу объетка (optionSort)
export const sortWordsList = (list, optionSort) => {
    return [...list].sort((a, b) => a[optionSort].localeCompare(b[optionSort]))
}

// добавляет новое слово в словарь
// передаем, ({словарь}, 'слово', 'перевод')
export const addWordInSection = (dictionary, word, translation) => {
    const dictionarySection = [...dictionary[word[0]]]
    dictionarySection.push({english: word, russian: translation})
    dictionary[word[0]] = dictionarySection
    return dictionary
}

// удаляет слово из словаря
// передаем, ({словарь}, 'слово')
export const removeWordInSection = (dictionary, word) => {
    const dictionarySection = [...dictionary[word[0]]]
    const newDictionarySection = dictionarySection.filter(item => item.english !== word)
    dictionary[word[0]] = newDictionarySection
    return dictionary
}