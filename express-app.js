const express = require('express');
const app = express();

app.get('/', (_, res) => res.send('still alive'));
app.get('/api', (req, res) => {
    if (req.headers['accept'] == 'application/xml') {
        res.setHeader('Content-Type', 'application/xml');
        const xml = `
        <?xml version="1.0" encoding="UTF-8">
        <user>
            <name>Luis</name>
        </user>`;
        res.send(xml);
    } else res.json({ name: 'Luis' });
    return res.end();
});

app.listen(3000, err => {
    if (err) return console.error(err);
    console.log('localhost:3000');
});