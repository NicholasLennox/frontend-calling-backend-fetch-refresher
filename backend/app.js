const express = require('express')
const app = express()
const cors = require('cors');

app.use(cors());

let events = [
    { id: 1, name: 'Spring Festival', date: '2025-06-01' },
    { id: 2, name: 'Tech Conference', date: '2025-06-10' },
    { id: 3, name: 'Music Gig', date: '2025-07-05' }
];

app.get('/events', (req, res) => {
    const mode = req.query.mode || 'success';

    if (mode === 'success') {
        return res.status(200).json({
            status: 'success',
            data: events
        });
    }

    if (mode === 'fail') {
        return res.status(400).json({
            status: 'fail',
            message: 'Bad request while fetching events.'
        });
    }

    if (mode === 'error') {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error while fetching events.'
        });
    }

    return res.status(200).json({ // 422 means the server cant process it
        status: 'fail',
        message: `Invalid mode: ${mode}`
    });
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})