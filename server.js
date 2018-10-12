const http = require('http');
const app = require('./index');

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server started on localhost: ${port}; Press Ctrl-C to terminate.`);
});