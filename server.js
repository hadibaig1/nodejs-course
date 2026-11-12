import http from 'http'; 
const PORT = process.env.PORT ?? 8000
// http is a module included with Node.js, so we do not use .js, since it is not a file

const server = http.createServer((req, res) => {
  // res.setHeader('Content-type', 'text/plain');
  // res.statusCode = 404;
  if(req.url === '/'){
     res.writeHead(200, {'Content-Type': 'text/html'})
      res.end('<h1>Homepage</h1>');
  } else if(req.url === '/about') {
    res.writeHead(200, {'Content-Type': 'text/html'})
      res.end('<h1>About</h1>');
  }
  else {
    res.writeHead(404, {'Content-Type': 'text/html'})
      res.end('<h1>Not Found</h1>');
  }

  console.log(req.url);
  console.log(req.method);

 
});

server.listen(PORT, () => {
  console.log(`Server Running on Port: http://localhost:${PORT}`)
})
