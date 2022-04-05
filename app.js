const http = require('http');
const fs = require("fs")

const port = process.env.port || 5000;


const server = http.createServer((req, res) => {
    const renderStatic = (path = req.url) => {
         fs.readFile(`${__dirname}/static/${path}.html`, 'Utf-8', (err, data) => {
                if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
                }
                res.writeHead(200, {"Content-Type":"text/html"})
                res.end(data);
            })
    }

    switch(req.url) {
        case '/':
            renderStatic("home")
            break;
        case '/home':
            res.writeHead(302 , {
                'Location' : '/'
            });
            res.end()
            break;
        case '/about':
            renderStatic();
            break;
        case '/contact':
            renderStatic();
            break;
        default:
            renderStatic('error');
            break;
}
});

server.listen(port);