const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const task = require('./task.json');

let lastId = task['tasks'].length;

const validatePayload = (payload) => {
    const haveAllProps = payload.title && payload.description && typeof payload.completed == 'boolean';
    const typeMatched = typeof payload.title == 'string' && typeof payload.description == 'string';
    return haveAllProps && typeMatched;
};

app.get('/healthCheck', (req, res) => {
    res.send('Service is in good health!');
});

app.get('/tasks', (req, res) => {
    res.json(task['tasks']);
});

app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    if (!id) res.status(404).json({ message: 'Non existant id' });
    const tasks = task['tasks'];
    for (const task of tasks) {
        if (task.id == id) {
            return res.json(task);
        }
    }
    res.status(404).json({ message: 'Non existant id' });
});

app.post('/tasks', (req, res) => {
    const payloadIsValid = validatePayload(req.body);
    if (!payloadIsValid) {
        return res.status(400).json({ message: 'Invalid input' });
    }
    lastId += 1;
    task['tasks'].push({ id: lastId, ...req.body });
    res.json(task['tasks']);
});

app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    if (!id) res.status(404).json({ message: 'Non existant id' });
    const payloadIsValid = validatePayload(req.body);
    console.log('payload is valid', payloadIsValid);
    if (!payloadIsValid) {
        res.status(400).json({ message: 'Invalid input' });
    }
    let idFound = false;
    task['tasks'] = task['tasks'].map((task) => {
        console.log('iterating', task.id);
        if (task.id == id) {
            idFound = true;
            console.log('id is found');
            return {
                id: task.id,
                ...req.body
            };
        }
        return task;
    });
    if (!idFound) {
        res.status(404).json({ message: 'Non existant id' });
    }
    res.json(task['tasks']);
});

app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    if (!id) res.status(404).json({ message: 'Non existant id' });
    let idFound = false;
    let deletedData;
    task['tasks'] = task['tasks'].filter((task) => {
        if (task.id == id) {
            idFound = true;
            deletedData = task;
            return false;
        }
        return true;
    });
    if (!idFound) res.status(404).json({ message: 'Non existant id' });
    res.json(deletedData);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;
