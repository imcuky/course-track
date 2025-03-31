const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// connet MongoDB
mongoose.connect('mongodb://localhost:27017/course-track', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


const assignmentSchema = new mongoose.Schema({
    title: String,
    dueDate: String,
    course: String,
    type: String,
    detail: String,
    completed: Boolean
});

const Assignment = mongoose.model('Assignment', assignmentSchema);


const eventSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    startTime: String,
    endTime: String
});

const Event = mongoose.model('Event', eventSchema);

// 获取所有作业
app.get('/api/assignments', async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).send('Internal Server Error');
    }
});

// add new assignment
app.post('/api/assignments', async (req, res) => {
    try {
        const newAssignment = new Assignment(req.body);
        const savedAssignment = await newAssignment.save();
        res.json(savedAssignment);
    } catch (error) {
        console.error('Error adding assignment:', error);
        res.status(500).send('Internal Server Error');
    }
});

// update assignment
app.put('/api/assignments/:id', async (req, res) => {
    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedAssignment);
    } catch (error) {
        console.error('Error updating assignment:', error);
        res.status(500).send('Internal Server Error');
    }
});

// delete assignment
app.delete('/api/assignments/:id', async (req, res) => {
    try {
        await Assignment.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting assignment:', error);
        res.status(500).send('Internal Server Error');
    }
});

// get all event
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Internal Server Error');
    }
});

// add new event
app.post('/api/events', async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();
        res.json(savedEvent);
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).send('Internal Server Error');
    }
});

// update event
app.put('/api/events/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).send('Internal Server Error');
    }
});

// delete event
app.delete('/api/events/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).send('Internal Server Error');
    }
});

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
