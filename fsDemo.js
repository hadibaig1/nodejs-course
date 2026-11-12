// import fs from 'fs'
import fs from 'fs/promises'

// // readFile() -- callback

// fs.readFile('./test.txt', 'utf-8', (error, data) => {
//     if (error) {
//         throw error
//     }
//     console.log(data)

// });

// // readFileSync() -- Synchornous
// const data = fs.readFileSync('./test.txt', 'utf-8');
// console.log(data)


// readFile() -- Promise way
fs.readFile('./test.txt', 'utf-8')
.then((data) => {
    console.log(data)
})
.catch((error) => {
    console.log(error)
})

// readFile() -- Promise async await
const readFile = async () => {
    try{
        const data = await fs.readFile('./test.txt', 'utf-8');
        console.log(data)
    }
    catch (error) {
        console.log(error)
    }
}




// writeFile()
const writeFile = async () => {
    try {
        await fs.writeFile('./test.txt', 'Hello I am writing to this file')
        console.log('File written to')
    } catch (error) {
        console.log(error)
        
    }
}

// appendfile()
const appendFile = async () => {
    try {
        await fs.appendFile('./test.txt', '\nThis is appended text')
            console.log('File appended to')
    }
     catch (error) {
        console.log(error)
        
    }
}

async function appendFile2() {
    await fs.appendFile('./test.txt', '\nthis is appended other text')
    console.log('Appended more Text!')
}


appendFile2()
await readFile()
