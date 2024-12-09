const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const bcrypt = require("bcrypt");
const fs = require('fs');
require('dotenv').config();

// Middleware and configuration
app.use(express.json());

// CORS configuration
const allowedOrigins = ['http://localhost:3000', 'https://admin.officialmusamakueni.co.ke'];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE','USE'],
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'auth-token'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error: ", err);
});

// Basic API route
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: '/var/www/upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    } 
});

const upload = multer({ storage: storage });

// Serving Static Images
app.use('/upload/images', express.static(path.join(__dirname, 'upload/images')));

// Upload Endpoint for Images
app.post('/upload', upload.single('candidate'), (req, res) => {
    res.json({
        success: 1,
        image_url: `https://api.officialmusamakueni.co.ke/upload/images/${req.file.filename}`
    });
});


// Schema for creating candidates
const Candidate = mongoose.model("candidates", {
    id: {
        type: Number,
        required:true,
    },
    firstName: {
        type: String,
        required:true,
    },
    lastName: {
        type: String,
        required:true,
    },
    university: {
        type: String,
        required: true,
    },
    chapter: {
        type: String,
        required:true,
    },
    position: {
        type: String,
        required:true,
    },
    voteCount: {
         type: Number, 
         default: 0,
    },
    image: {
        type: Object,
        required:true,
    },
    date: {
        type: Date,
        default:Date.now,
    },
    available: {
        type: Boolean,
        default:true,
    },
});

const Users = mongoose.model('users', {
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String, 
        required: true,
    },    
    email: {
        type: String, 
        unique: true,
        required: true, 
    },
    phoneNumber: { 
        type: String, 
        unique: true, 
        required: true, 
    },
    idNumber: { 
        type: String, 
        unique: true, 
        required: true, 
    },
    chapter: { 
        type: String, 
        required: true, 
    },
    university: { 
        type: String, 
        required: true, 
    },
    admNumber: { 
        type: String, 
        required: true, 
    },
    transaction: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
    password: { 
        type: String, 
        required: true, 
    },
    votedPositions: { 
        type: [String], 
        default: [], 
    },
    date: { 
        type: Date, 
        default: Date.now, 
    },
});

//user signup endpoint
app.post('/signup', async (req, res) => {
    try {
        // Check if user already exists
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, error: "You are already registered with MUSA, try to log in." });
        }

        // Generate new user ID
        let users = await Users.find({});
        let userNumber = users.length > 0 
            ? (parseInt(users.slice(-1)[0].id.split("/").slice(-1)[0]) + 1).toString().padStart(3, '0') 
            : '001';

        const userId = `AUCT/2024/25/${userNumber}`;
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);  // Generate salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt);  // Hash the password

        // Create new user with 'pending' payment status
        const user = new Users({
            id: userId,
            name: req.body.username,
            email: req.body.email.toLowerCase(),
            phoneNumber: req.body.phoneNumber,
            idNumber: req.body.idNumber,
            chapter: req.body.chapter,
            university: req.body.university,
            admNumber: req.body.admNumber,
            transaction: req.body.transaction, 
            paymentStatus: 'pending', 
            password: hashedPassword,  
        });

        await user.save();

        const data = {
            user: {
                id: user.id,
                chapter: user.chapter,
                name: user.name
            }
        };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, error: "An error occurred during signup. Please try again." });
    }
});

// Fetch pending users
app.get('/pendingusers', async (req, res) => {
    try {
        const pendingUsers = await Users.find({ paymentStatus: 'pending' });
        res.json(pendingUsers);
    } catch (error) {
        console.error("Error fetching pending users:", error);
        res.status(500).json({ success: false, error: "An error occurred while fetching pending users." });
    }
});

// Admin Approval Endpoint
app.post('/approveuser/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await Users.findByIdAndUpdate(
            userId,
            { paymentStatus: 'completed' },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found." });
        }

        await sendUserIdEmail(user.email, user.name, user.id);

        res.json({ success: true, message: "User approved successfully and email sent." });
    } catch (error) {
        console.error("Error during user approval:", error);
        res.status(500).json({ success: false, error: "An error occurred during user approval. Please try again." });
    }
});

//admin rejecting user endpoint
app.post('/rejectuser/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        user.paymentStatus = 'rejected';
        await user.save();

        res.json({ success: true, message: "User has been rejected." });
    } catch (error) {
        console.error("Error rejecting user:", error);
        res.status(500).json({ success: false, message: "An error occurred while rejecting the user." });
    }
});

//creating endpoint Function to send the user ID email
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendUserIdEmail(userEmail, userName, userId) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.USER_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token
            },
            tls: {
                rejectUnauthorized: false,
            },
            pool: true,
            rateLimit: 1
        });
        let mailOptions = {
            from: process.env.USER_EMAIL,
            to: userEmail,
            subject: 'Your MUSA Membership for the Year 2024/25',
            html: ` 
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; background-color: #f4f4f4; padding: 20px;">
    <div style="
        max-width: 600px; 
        margin: 0 auto; 
        padding: 20px; 
        border: 1px solid #ddd; 
        border-radius: 10px; 
        background-color: #ffffff; 
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">

        <!-- Logo Section -->
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="
                width: 90px; 
                height: 90px; 
                margin: 0 auto; 
                background-color: #007bff; 
                border-radius: 50%; 
                display: flex; 
                justify-content: center; 
                align-items: center;">
                <img src="https://user.officialmusamakueni.co.ke/logo512.png" alt="MUSA Logo" style="width: 60px; height: 60px; border-radius: 50%;"/>
            </div>
        </div>

        <!-- Email Heading -->
        <h2 style="text-align: center; color: #007bff; font-size: 24px;">Hello, ${userName}</h2>
        <p style="text-align: center; font-size: 18px; color: #555;">
            Welcome to the Makueni University Students Association (MUSA) for the year 2024/25.
        </p>

        <!-- Membership Details -->
        <div style="background-color: #e6f9e6; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
            <h3 style="color: #006400; font-size: 20px; margin: 0;">
                <strong>Your MUSA Registration Number:</strong>
            </h3>
            <p style="font-size: 24px; color: #004d00; font-weight: bold; margin: 5px 0;">
                ${userId}
            </p>
        </div>

        <!-- Important Information -->
        <p style="font-size: 16px; color: #333;">
            <strong>Important Information:</strong>
        </p>
        <ul style="font-size: 16px; color: #555; padding-left: 20px; margin-bottom: 20px;">
            <li>Your registration number must be renewed annually.</li>
            <li>If you received this message in error, please contact us immediately.</li>
            <li>Join the MUSA WhatsApp group for updates: 
                <a href="https://chat.whatsapp.com/KDgElqNaWH0Kaib90lhGhH" style="color: #008000; text-decoration: none;">MUSA Official Group</a>.
            </li>
        </ul>

        <!-- Contact Information -->
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            If you have any questions or require assistance, feel free to contact us at 
            <a href="mailto:official.musa.makueni@gmail.com" style="color: #007bff; text-decoration: none;">official.musa.makueni@gmail.com</a>.
        </p>

        <!-- Closing -->
        <p style="text-align: center; font-size: 18px; color: #555; margin-bottom: 5px;">
            Best regards,
        </p>
        <p style="text-align: center; font-size: 18px; color: #555; font-weight: bold;">
            MUSA Tech Team
        </p>

        <!-- Footer and Motto -->
        <div style="text-align: center; padding: 10px; background-color: #f9f9f9; border-top: 1px solid #ddd; margin-top: 20px;">
            <p style="font-size: 16px; font-weight: bold; color: #555; margin: 0;">
                <span style="color: #008000;">Unity</span>, 
                <span style="color: #007bff;">Vision</span>, & 
                <span style="color: #ffcc00;">Progress</span>
            </p>
        </div>
    </div>
</body>
</html>
`

        };
         

        let result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

//user login Endpoint
app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });

        if (user) {

            if (user.paymentStatus === 'completed') {

                const passCompare = await bcrypt.compare(req.body.password, user.password);

                if (passCompare) {
                    const data = {
                        user: {
                            id: user.id,
                            chapter: user.chapter,
                            name: user.name
                        }
                    };
                    const token = jwt.sign(data, 'secret_ecom');
                    return res.json({ success: true, token });
                } else {
                    return res.json({ success: false, errors: "Wrong Password" });
                }
            } else if (user.paymentStatus === 'pending') {
                return res.json({ success: false, errors: "Your account is still pending approval." });
            } else {
                return res.json({ success: false, errors: "Your account status is invalid." });
            }
        } else {
            return res.json({ success: false, errors: "Wrong Email Id" });
        }
    } catch (error) {
        console.error("Login error: ", error);
        res.status(500).json({ success: false, errors: "An error occurred during login." });
    }
});


// Function to send the password reset email
async function sendPasswordResetEmail(userEmail, userName, token) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const resetLink = `https://user.officialmusamakueni.co.ke/password/${token}`;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.USER_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let mailOptions = {
            from: process.env.USER_EMAIL,
            to: userEmail,
            subject: 'Password Reset Request',
            html: `
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; background-color: #f4f4f4; padding: 20px;">
                <div style="
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    background-color: #ffffff;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="font-size: 24px; color: #007bff; margin: 0;">Hello, ${userName}</h2>
                        <p style="font-size: 16px; color: #555;">We're here to help you reset your password.</p>
                    </div>
            
                    <!-- Reset Instructions -->
                    <p style="font-size: 16px; color: #333;">
                        You've requested to reset your password. To proceed, please click the button below:
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${resetLink}" 
                            style="
                                display: inline-block;
                                font-size: 16px;
                                color: #ffffff;
                                background-color: #007bff;
                                padding: 10px 20px;
                                text-decoration: none;
                                border-radius: 5px;
                                font-weight: bold;">
                            Reset Password
                        </a>
                    </div>
                    <p style="font-size: 14px; color: #555; text-align: center;">
                        This link is valid for the next 1 hour. If you did not request this change, please ignore this email.
                    </p>
            
                    <!-- Footer -->
                    <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 10px; text-align: center; color: #777;">
                        <p style="font-size: 14px; margin: 0;">Thank you for using our services!</p>
                        <p style="font-size: 14px; margin: 5px 0;"><strong>MUSA Tech Team</strong></p>
                        <p style="font-size: 14px; margin: 0;">
                            <span style="color: #008000;">Unity</span>, 
                            <span style="color: #007bff;">Vision</span>, & 
                            <span style="color: #ffcc00;">Progress</span>
                        </p>
                    </div>
                </div>
            </body>
        </html>`,
        };        

        let result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
}

// Generate Token and Send Password Reset Email
app.post('/reset', async (req, res) => {
    const { email } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    const resetToken = jwt.sign({ id: user._id }, 'secret_ecom', { expiresIn: '1h' });

    try {
        await sendPasswordResetEmail(user.email, user.name, resetToken);
        res.json({ success: 'Password reset link sent! Please check your email.' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending email' });
    }
});

//password reset verification token Endpoint
app.post('/password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      const decoded = jwt.verify(token, 'secret_ecom');
      console.log("Decoded Token:", decoded);
  
      const user = await Users.findById(decoded.id);
      if (!user) {
        console.error("User not found for ID:", decoded.id);
        return res.status(400).json({ error: 'Invalid or expired token' });
      }
  
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      console.log("Password updated for user ID:", user._id);
  
      res.json({ success: true, message: 'Password reset successfully!' });
    } catch (error) {
      console.error("Error in token verification or password reset:", error);
      if (error.name === 'TokenExpiredError') {
        return res.status(400).json({ error: 'Token has expired' });
      }
      res.status(500).json({ error: 'Invalid or expired token' });
    }
  });
  

//creating endpoint for adding candidates
app.post('/addcandidate', async (req, res) => {
    let candidates = await Candidate.find({});
    let id;
    if (candidates.length > 0) {
        let last_candidate_array = candidates.slice(-1);
        let last_candidate = last_candidate_array[0];
        id = last_candidate.id+1;
    } else {
        id=1;
    }

    const candidate = new Candidate({
        id: id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        university: req.body.university,
        chapter: req.body.chapter,
        position: req.body.position,
        image: req.body.image,
    });

    console.log(candidate);
    await candidate.save();
    console.log("Saved");
    res.json({
        success:true,
        name: req.body.name
    });
});

//Creating API for deleting procedure
app.post('/removecandidate', async (req, res) => {
    await Candidate.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    })
});

//Creating API for getting all the candidates
app.get('/allcandidates', async (req, res) => {
    let candidates = await Candidate.find({});
    console.log("All Candidates Fetched");
    res.send(candidates);
});


// Schema for Votes
const Vote = mongoose.model("votes", {
    userId: {
        type: String,
        required: true
    },
    candidateId: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    chapter: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//creating middleware to fetch the user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
};

//creting endpoint for fetching the user and passing the user to the frontend
app.get('/user', fetchUser, (req, res) => {
    try {
        console.log("Returning user:", req.user);
        // Return all user details instead of just the name
        res.json(req.user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "An error occurred while fetching user details." });
    }
});

// Endpoint to fetch candidates based on user's chapter
app.get('/candidates', fetchUser, async (req, res) => {
    try {
        console.log("User:", req.user);

        const userChapter = req.user.chapter;

        console.log("User Chapter:", userChapter);

        const candidates = await Candidate.find({ chapter: userChapter });

        console.log("Candidates:", candidates);

        if (candidates.length > 0) {
            res.json(candidates);
        } else {
            res.status(404).json({ message: 'No candidates found for your chapter.' });
        }
    } catch (error) {
        console.error('Error fetching candidates:', error);
        res.status(500).json({ message: 'Error fetching candidates' });
    }
});

// Vote endpoint using userId for user identification
app.post('/vote', fetchUser, async (req, res) => {
    const { candidateId, position } = req.body;

    try {
        let existingVote = await Vote.findOne({ userId: req.user.id, position });
        
        if (existingVote) {
            return res.status(400).json({ errors: "You have already voted for this position" });
        }

        await Candidate.findOneAndUpdate({ _id: candidateId }, { $inc: { voteCount: 1 } });

        const newVote = new Vote({
            userId: req.user.id,
            candidateId,
            position,
            chapter: req.user.chapter,
        });
        await newVote.save();

        res.json({ success: "Vote added successfully" });
    } catch (error) {
        console.error("Error processing vote:", error);
        res.status(500).json({ errors: "An error occurred while voting." });
    }
});

// Endpoint to fetch the user's votes
app.get('/votes', fetchUser, async (req, res) => {
    try {
        const userVotes = await Vote.find({ userId: req.user.id });

        const votedPositions = userVotes.map(vote => vote.position);

        res.json({ votedPositions });
    } catch (error) {
        console.error('Error fetching votes:', error);
        res.status(500).json({ error: 'Error fetching votes' });
    }
});

//creating endpoint to get total results
app.get('/results', async (req, res) => {
    try {
      const results = await Candidate.aggregate([
        {
          $group: {
            _id: { chapter: "$chapter", position: "$position" },
            candidates: { $push: { name: "$firstName", votes: "$voteCount" } }
          }
        },
        {
          $group: {
            _id: "$_id.chapter",
            positions: { $push: { position: "$_id.position", candidates: "$candidates" } }
          }
        }
      ]);
      
      res.json(results);
    } catch (error) {
      res.status(500).send('Error fetching results');
    }
  });

// Create Admin model schema
const Admins = mongoose.model('admin', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Admin Signup Route
app.post('/adminsignup', async (req, res) => {
  try {
    // Check the number of existing admins
    const adminCount = await Admins.countDocuments();
    if (adminCount >= 2) {
      return res.status(400).json({ success: false, error: 'Maximum number of admins reached.' });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    // Check if an admin with the same email already exists
    const existingAdmin = await Admins.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, error: 'Admin with this email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admins({
      name,
      email,
      password: hashedPassword
    });

    await newAdmin.save();

    // Generate JWT token
    const token = generateAuthToken(newAdmin);

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// JWT Token Generation Function
const generateAuthToken = (admin) => {
  return jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret_ecom', { expiresIn: '1h' });
};


// End of Server Endpoints
app.post('/adminlogin', async (req, res) => {
    const { email, password } = req.body;
  
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }
  
    try {
      // Check if admin with this email exists
      const admin = await Admins.findOne({ email });
      if (!admin) {
        return res.status(400).json({ success: false, error: 'Invalid email or password.' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isPasswordCorrect = await bcrypt.compare(password, admin.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ success: false, error: 'Invalid email or password.' });
      }
  
      // Generate JWT token
      const token = generateAuthToken(admin);
  
      res.json({ success: true, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  });
 
  app.listen(port, (error) => {
    if (!error) {
        console.log("HTTP Server Running on Port " + port);
    } else {
        console.log("Error : " + error);
    }
});