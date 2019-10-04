const http = require("http");

const notFound = (req, res) => {
    res.statusCode = 404;
    if (req.headers["accept"] == "application/xml") {
        const xml = `<?xml version="1.0" encoding="UTF-8">
        <response><status>404</status><message>Not Found</message></response>`;
        res.writeHead(404, { "Content-type": "application/xml" });
        res.write(xml);
    } else {
        res.writeHead(404, { "Content-type": "application/json" });
        res.write(JSON.stringify({ status: 404, message: 'Not Found' }));
    }
    return res.end();
};

const apiRootRoute = (req, res) => {
    switch (req.method) {
        case "GET":
            if (req.headers["accept"] == "application/xml") {
                res.writeHead(200, { "Content-type": "application/xml" });
                const xml = `
                <?xml version="1.0" encoding="UTF-8">
                <user>
                    <name>Marcelo Rios</name>
                </user>`;
                res.write(xml);
            } else {
                res.writeHead(200, { "Content-type": "application/json" });
                res.write(JSON.stringify({ user: { name: 'Marcelo Rios' } }));
            }
            return res.end();
        default: return notFound(req, res);
    }
};

http.createServer((req, res) => {
    req.on("error", err => {
        console.error(err);
        res.statusCode = 400;
        return res.end("400: Bad request");
    });

    res.on("error", err => {
        console.error(err);
        res.statusCode = 500;
        return res.end("500: Server error");
    });

    // if (req.url == '/api' && req.method == 'GET') {
    //     return apiRootRoute(req, res);
    // }

    switch (req.url) {
        case "/":
            return res.end("still alive");
        case "/api":
            return apiRootRoute(req, res);
        default:
            return notFound(req, res);
    }
}).listen(3000, () => console.log("localhost:3000"));
