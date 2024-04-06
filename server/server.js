require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;


//CORS Middleware
// Parse incoming JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = ['http://localhost:3000', 'https://placementapp-123.web.app'];
app.use(cors({
    origin: allowedOrigins,
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true,
}));


// Connect to your MongoDB Atlas database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.error('MongoDB Connection Error:', err);
});



const db = mongoose.connection;

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && user.password === password) {
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});



// Event schema
const eventSchema = new mongoose.Schema({
    companyname: String,
    degree: String,
    batch: String,
    branch: String,
    role: String,
    date: String,
    category: String
});

const Event = mongoose.model('Event', eventSchema);

// Route to get all events
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
    }
});

// Route to add an event
app.post('/events/add', async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();

        res.status(200).send('Event added successfully!');
    } catch (error) {
        res.status(500).send('Error adding event: ' + error.message);
    }
});



// Route to delete an event
app.delete('/events/:companyName', async (req, res) => {
    const companyName = req.params.companyName;
    try {
        await Event.deleteOne({ companyname: companyName });
        res.status(200).json({ message: `Event ${companyName} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting event' });
    }
});




// Student schema
const studentSchema = new mongoose.Schema({
    name: String,
    rollnumber: String,
    email: String,
    fathername: String,
    dob: String,
    batch: String,
    branch: String,
    cgpa: String,
    phone: String,
    degree: String,
    placed: String,
    registered: [String],
    resume: String,
    higherstudies: String,
    arrearCount: String,
    offerLetter: [String]
});

const Student = mongoose.model('Student', studentSchema);

// Route to get all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching students' });
    }
});

app.post('/students/add', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();

        res.status(200).send('Student added successfully!');
    } catch (error) {
        res.status(500).send('Error adding student: ' + error.message);
    }
});

// Route to update student with resume link
app.patch('/students/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        await Student.findByIdAndUpdate(studentId, { resume: req.body.resume });
        res.status(200).json({ message: `Resume link updated for student ${studentId}` });
    } catch (error) {
        res.status(500).json({ error: 'Error updating resume link' });
    }
});

app.put('/students/:rollnumber', async (req, res) => {
    const rollnumber = req.params.rollnumber;
    const { offerLetter } = req.body;

    try {
        const student = await Student.findOne({ rollnumber });

        if (!student) {
            return res.status(404).json({ message: `Student with roll number ${rollnumber} not found` });
        }

        // If the student doesn't have an 'offerLetter' field, initialize it as an empty array
        student.offerLetter = student.offerLetter || [];

        // Concatenate the new offer letters to the existing array
        student.offerLetter = student.offerLetter.concat(offerLetter);

        // Save the updated student document
        await student.save();

        return res.status(200).json({ message: `Offer letters updated for student ${rollnumber}` });
    } catch (error) {
        console.error('Error updating offer letters:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/students/resume/:rollnumber', async (req, res) => {
    const rollnumber = req.params.rollnumber;
    const { resume } = req.body;

    try {
        const student = await Student.findOne({ rollnumber });

        if (!student) {
            return res.status(404).json({ message: `Student with roll number ${rollnumber} not found` });


        }

        student.resume = resume;



        

        // Save the updated student document
        await student.save();

        return res.status(200).json({ message: `Resume uploaded for student ${rollnumber}` });
    } catch (error) {
        console.error('Error updating resume', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

//delete student
app.delete('/students/del/:rollnumber', async (req, res) => {
    const rollnumber = req.params.rollnumber;
    try {
        await Student.deleteOne({ rollnumber: rollnumber });
        res.status(200).json({ message: `Student ${rollnumber} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting student' });
    }
});





app.post('/apply', async (req, res) => {
    const { rollnumber, companyName } = req.body;

    try {
        console.log('Received data:', req.body);

        const student = await Student.findOne({ rollnumber });

        if (!student) {
            console.log('Student not found');
            return res.status(404).json({ message: 'Student not found' });
        }

        const registeredCompanies = student.registered || [];

        if (!registeredCompanies.includes(companyName)) {
            registeredCompanies.push(companyName);
            await student.updateOne({ registered: registeredCompanies });

            console.log(`Successfully applied for ${companyName}`);
            return res.status(200).json({ message: `Successfully applied for ${companyName}` });
        } else {
            console.log(`Already applied for ${companyName}`);
            return res.status(201).json({ message: `You have already applied for ${companyName}` });
        }
    } catch (error) {
        console.error('Error applying for company:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
