import {createServer} from 'http';
const PORT = process.env.PORT ?? 8000

const users = [
    {id: 1, name: 'Hadi Baig'},
    {id: 2, name: 'John Doe'},
    {id: 3, name: 'Jane Smith'},
    {id: 4, name: 'Bob Johnson'}
]


// Logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}


// JSON mkiddelware
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}

// Route Handler for GET /api/users
const getUsersByIdHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
};

// Route Hanlder for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
    const id = req.url.split('/')[3];
    const user = users.find(u => u.id === parseInt(id));

    if (user){
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(user));
        res.end();

    }
    else {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.write('User not Found!');
        res.end();

    }
}

// Not found Handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.write('Not Found');
    res.end();
}


// Route handles for POST /api/users

// The reason we need to use req.on , with 'data', and 'chunks', is due to Nodejs not recieving data from the Client all at once. In Node, the client data gets recieved in pieces called Streams. 
// As data flows into the Server from the Clinet, the req object calls the 'data' event, and triggers the callback function. The 'chunk' param is a small buffer of Binary Data, which is why we need to use .toString() to convert it to a readable format.
// Once the Client thas finished sending all of its data, Nodejs trigers the 'end' event, triggering its callback.
// Since Node.js in Asymnchornous, all code needs to be inside these callbacks, otherwise it will get executed instantly, which is probabaly not what you want.
const createUserHandler = (req, res) => {
    let body = '';
    // Listen for the data
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    // Triggered all once the data has been recieved
    req.on('end', () => {
        const newUser = JSON.parse(body);
        users.push(newUser)

        res.statusCode = 201;
        res.write(JSON.stringify(newUser));
        res.end()
    })
    
}


const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if(req.url === '/api/users' && req.method === 'GET'){
                getUsersByIdHandler(req, res);
            }
            else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
                getUserByIdHandler(req, res);
            }
            else if (req.url === '/api/users' && req.method === 'POST'){
              createUserHandler(req, res)  
            }
            else {
                notFoundHandler(req, res)
            }


    })})
    
});

server.listen(PORT, () => {
    console.log(`Server Running on Port: http://localhost:${PORT}`)
})