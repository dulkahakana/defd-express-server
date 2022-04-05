export default class FormatDate {
    static getDate () {
        const date = new Date()
        const formatDate = `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()}`
        const formatTime = `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`
        return `${formatDate}  ${formatTime}`        
    }    
}

function addZero(num) {
    let str = String(num)
    return str.length === 1 ? `0${num}` : num
}