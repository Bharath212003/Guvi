const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Define Mentor Schema
const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    expertise: { type: String, required: true },
});

// Define Student Schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', default: null },
});

// Create Mentor and Student models
const Mentor = mongoose.model('Mentor', mentorSchema);
const Student = mongoose.model('Student', studentSchema);

// API Endpoint 1: Create a Mentor
app.post('/create-mentor', async (req, res) => {
    const { name, expertise } = req.body;
    if (!name || !expertise) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const mentor = new Mentor({ name, expertise });
        await mentor.save();
        res.status(201).json({ message: 'Mentor created successfully', mentor });
    } catch (err) {
        res.status(500).json({ message: 'Error creating mentor', error: err.message });
    }
});

// API Endpoint 2: Create a Student
app.post('/create-student', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Student name is required' });
    }

    try {
        const student = new Student({ name });
        await student.save();
        res.status(201).json({ message: 'Student created successfully', student });
    } catch (err) {
        res.status(500).json({ message: 'Error creating student', error: err.message });
    }
});

// API Endpoint 3: Assign a student to a mentor
app.post('/assign-student', async (req, res) => {
    const { studentId, mentorId } = req.body;

    if (!studentId || !mentorId) {
        return res.status(400).json({ message: 'Missing student or mentor ID' });
    }

    try {
        const student = await Student.findById(studentId);
        const mentor = await Mentor.findById(mentorId);

        if (!student || !mentor) {
            return res.status(404).json({ message: 'Student or Mentor not found' });
        }

        if (student.mentor) {
            return res.status(400).json({ message: 'Student is already assigned a mentor' });
        }

        student.mentor = mentor._id;
        await student.save();

        res.status(200).json({ message: 'Student assigned to mentor successfully', student });
    } catch (err) {
        res.status(500).json({ message: 'Error assigning student', error: err.message });
    }
});

// API Endpoint 4: Assign or Change Mentor for a Student
app.post('/change-mentor', async (req, res) => {
    const { studentId, newMentorId } = req.body;

    if (!studentId || !newMentorId) {
        return res.status(400).json({ message: 'Missing student or new mentor ID' });
    }

    try {
        const student = await Student.findById(studentId);
        const newMentor = await Mentor.findById(newMentorId);

        if (!student || !newMentor) {
            return res.status(404).json({ message: 'Student or New Mentor not found' });
        }

        student.mentor = newMentor._id;
        await student.save();

        res.status(200).json({ message: 'Student mentor changed successfully', student });
    } catch (err) {
        res.status(500).json({ message: 'Error changing mentor', error: err.message });
    }
});

// API Endpoint 5: Get All Students for a Particular Mentor
app.get('/mentor-students/:mentorId', async (req, res) => {
    const { mentorId } = req.params;

    try {
        const students = await Student.find({ mentor: mentorId }).populate('mentor');
        res.status(200).json({ students });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching students', error: err.message });
    }
});

// API Endpoint 6: Get Previous Mentor for a Particular Student
app.get('/student-previous-mentor/:studentId', async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await Student.findById(studentId).populate('mentor');
        if (!student || !student.mentor) {
            return res.status(404).json({ message: 'Student has no mentor' });
        }

        res.status(200).json({ previousMentor: student.mentor });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching previous mentor', error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
