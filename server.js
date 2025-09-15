const http = require('http');
const port = 6000;
const app = require('./app')


const server = http.createServer(app)

server.listen(port, () => {
    console.log("app is running on port ", port)
});