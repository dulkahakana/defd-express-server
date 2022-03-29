// ? асинхронное создание папки
// ? в колбэк передаем ошибку
// fs.mkdir(path.resolve(__dirname, 'dir'), (err) => {
//     if (err) {
//         console.log(err)
//         return
//     } else {
//         console.log('Folder created')
//     }
// })

// ? асинхронное удаление папки
// fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
//     if (err) {
//         console.log(err)
//         return
//     } else {
//         console.log('Folder remove')
//     }
// })

// ? асинхронное создание файла
// fs.writeFile(path.resolve(filePath, 'test.txt'), 'test', (err) => {
//     if (err) { 
//         // ? выкинуть ошибку
//         throw err 
//     }

//     console.log('File created')
// })