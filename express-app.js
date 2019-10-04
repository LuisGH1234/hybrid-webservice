const express = require('express');
const app = express();

app.get('/', (_, res) => res.send('still alive'));
app.get('/api', (req, res) => {
    if (req.headers['accept'] == 'application/xml') {
        res.setHeader('Content-Type', 'application/xml');
        const xml = `
        <?xml version="1.0" encoding="UTF-8">
        <user>
            <name>Marcelo Rios</name>
        </user>`;
        res.send(xml);
    } else res.json({ user: { name: 'Marcelo Rios' } });
    return res.end();
});

app.use((req, res) => {
    if (req.headers['accept'] == "application/xml") {
        const xml = `<?xml version="1.0" encoding="UTF-8">
        <response><status>404</status><message>Not Found</message></response>`;
        res.setHeader('Content-Type', 'application/xml');
        res.status(404).send(xml);
    } else {
        res.status(404).json({ status: 404, message: 'Not Found' });
    }
    return res.end();
});

app.listen(3000, err => {
    if (err) return console.error(err);
    console.log('localhost:3000');
});