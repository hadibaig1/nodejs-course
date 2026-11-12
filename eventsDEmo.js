import {EventEmitter} from 'events';


const myEmitter = new EventEmitter();

function greetHandler(name) {
    console.log('Hello', name)
}

function goodbyeHandler(name) {
    console.log('Goodbye ', name)
}

// Register event listenenrs
myEmitter.on('greet', greetHandler);
myEmitter.on('goodbye', goodbyeHandler);

// Emit events
myEmitter.emit('greet', 'John')
myEmitter.emit('goodbye', 'John')


// Error handling
myEmitter.on('error', (error) => {
    console.log('An Error Occured: ', error)
})

// Simulating the Error
myEmitter.emit('error', new Error('Something went wrong'))