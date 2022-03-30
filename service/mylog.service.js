import chalk from 'chalk'

export const myLogBlue = (string) => {
    console.log(chalk.black.bgBlueBright(` ${string} `))
}

export const myLogRed = (string) => {
    console.log(chalk.black.bgRedBright(` ${string} `))
}

export const myLogGreen = (string) => {
    console.log(chalk.black.bgGreenBright(` ${string} `))
}