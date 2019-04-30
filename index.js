const server = require('./server');

const port = process.env.PORT || 9000;

server.listen(port, function() {
	console.log(`server  Listening on port :${port} `);
});