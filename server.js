import http from 'http'; 
import fs from 'fs/promises'
import url from 'url'
import path from 'path'
const PORT = process.env.PORT ?? 8000
// http is a module included with Node.js, so we do not use .js, since it is not a file

// Get Current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename);
console.log(__dirname);

const server = http.createServer( async (req, res) => {
  try {
    if (req.method !== 'GET') {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method not allowed');
      return;
    }

    let filePath;
    if (req.url === '/') {
      filePath = path.join(__dirname, 'public', 'index.html');
    } else if (req.url === '/about') {
      filePath = path.join(__dirname, 'public', 'about.html');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }

    const data = await fs.readFile(filePath);
    res.setHeader('Content-Type', 'text/html');
    res.write(data);
    res.end();

  } 
  catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error');
  }

  console.log(req.url);
  console.log(req.method);

 
});

server.listen(PORT, () => {
  console.log(`Server Running on Port: http://localhost:${PORT}`)
})
