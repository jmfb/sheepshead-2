const express = require('express');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({
	target: 'http://sheepshead.azurewebsites.net',
	changeOrigin: true
});

const app = express();
app.all('/api/*', (req, res) => {
	proxy.web(req, res);
});
app.use(express.static(__dirname + '/web'));
app.listen(3000);
console.log('Listening at localhost:3000');
