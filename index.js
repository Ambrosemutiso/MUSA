const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const https = require("https");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const bcrypt = require("bcrypt");
const fs = require('fs');
require('dotenv').config();

// Ensure upload directory exists
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware and configuration
app.use(express.json());

// CORS configuration
const allowedOrigins = [
    'https://officialmusamakueni.co.ke',
    'https://user.officialmusamakueni.co.ke',
    'https://admin.officialmusamakueni.co.ke'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); 
        } else {
            callback(new Error('Not allowed by CORS')); 
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.options('*', cors());  

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error: ", err);
});

// Basic API route
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Multer storage configuration
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serving static images
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// File upload endpoint
app.post('/upload', upload.single('candidate'), (req, res) => {
    res.json({
        success: 1,
        image_url: `https://officialmusamakueni.co.ke/images/${req.file.filename}` // Removed port from URL
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
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="
                    max-width: 600px; 
                    margin: 0 auto; 
                    padding: 20px; 
                    border: 1px solid #ddd; 
                    border-radius: 10px; 
                    background-color: #f9f9f9;">
                    
                    <!-- Logo Section -->
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="LOGO_URL" alt="MUSA Logo" style="width: 150px; height: auto;"/>
                    </div>
                    
                    <!-- Email Heading -->
                    <h2 style="text-align: center; color: #007bff;">Hello, ${userName}</h2>
                    <p style="text-align: center; font-size: 18px; color: #2d3748;">
                        I hope this message finds you well.
                    </p>
        
                    <!-- Membership Details -->
                    <div style="background-color: #e0f7e0; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                        <h3 style="color: #008000; text-align: center;">
                            <strong>Your MUSA Registration Number:</strong>
                        </h3>
                        <p style="font-size: 20px; text-align: center; color: #006400;">
                            <strong>${userId}</strong>
                        </p>
                    </div>
        
                    <!-- Important Information -->
                    <p style="font-size: 16px; color: #333;">
                        <strong>Please note the following:</strong>
                    </p>
                    <ul style="font-size: 16px; color: #333; padding-left: 20px;">
                        <li>This registration number will be used as your first-time login password.</li>
                        <li>Contact us immediately if you believe this message has been received in error.</li>
                    </ul>
        
                    <!-- Footer and Contact Information -->
                    <p style="font-size: 16px; color: #333;">
                        If you have any questions or require further clarification, please don't hesitate to reach out to us directly via <a href="mailto:officialmusa.makueni017@gmail.com" style="color: #007bff; text-decoration: none;">officialmusa.makueni017@gmail.com</a>.
                    </p>
        
                    <p style="text-align: center; font-size: 18px; color: #2d3748;">
                        Best regards,
                    </p>
                    <p style="text-align: center; font-size: 18px; color: #2d3748;">
                        <strong>MUSA Tech Team</strong>
                    </p>
        
                    <!-- Slogan or Motto -->
                    <div style="text-align: center; padding: 10px; background-color: #f9f9f9; border-top: 1px solid #ddd;">
                        <p style="font-size: 16px; font-weight: bold; color: #2d3748;">
                            <span style="color: #008000;">Unity</span>, <span style="color: #007bff;">Vision</span> & <span style="color: #ffcc00;">Progress</span>
                        </p>
                    </div>
        
                    <!-- Social Media Icons -->
                    <div style="text-align: center; margin-top: 20px;">
                        <a href="https://www.facebook.com/musamakueni" style="margin-right: 15px;">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" style="width: 30px; height: 30px;">
                        </a>
                        <a href="https://www.twitter.com/MUSA_makueni017?t=LTZiDkJ9vfNuSGwZvkLCbg&s=09" style="margin-right: 15px;">
                            <img src="https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg" alt="Twitter" style="width: 30px; height: 30px;">
                        </a>
                        <a href="https://www.instagram.com/makueni_comrades?igshid=OGQ5ZDc2ODk22ZA==" style="margin-right: 15px;">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style="width: 30px; height: 30px;">
                        </a>
                        <a href="https://www.linkedin.com/company/makueni-university-students-association-musa/">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" style="width: 30px; height: 30px;">
                        </a>
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
async function sendPasswordResetEmail(userEmail, userName, resetToken) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const resetLink = `https://user.officialmusamakueni.co.ke/password/${resetToken}`;

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
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="
                    max-width: 600px; 
                    margin: 0 auto; 
                    padding: 20px; 
                    border: 1px solid #ddd; 
                    border-radius: 10px; 
                    background-color: #f9f9f9;">
                    <h2 style="text-align: center; color: #007bff;">Hello, ${userName}</h2>
                    <p style="text-align: center; font-size: 18px; color: #2d3748;">You have requested to reset your password. Please click the link below to reset it:</p>
                    <p style="text-align: center; font-size: 18px; color: #2d3748;"><a href="${resetLink}">Reset Password</a></p>
                    <p>This link will expire in 1 hour.</p>
                                        <p style="text-align: center; font-size: 18px; color: #2d3748;">
                        Best regards,
                    </p>
                    <p style="text-align: center; font-size: 18px; color: #2d3748;">
                        <strong>MUSA Tech Team</strong>
                    </p>
        
                    <!-- Slogan or Motto -->
                    <div style="text-align: center; padding: 10px; background-color: #f9f9f9; border-top: 1px solid #ddd;">
                        <p style="font-size: 16px; font-weight: bold; color: #2d3748;">
                            <span style="color: #008000;">Unity</span>, <span style="color: #007bff;">Vision</span> & <span style="color: #ffcc00;">Progress</span>
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
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        res.json({ success: true, message: 'Password reset successfully!' });
    } catch (error) {
        console.error("Token verification error:", error);
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
    console.log("Returning user:", req.user);
    res.json({ name: req.user.name });
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

//creating Endpoint for admin login and signup
/*creating admin model*/
const Admins = mongoose.model('admin', {
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
    password: { 
        type: String, 
        required: true, 
    },
    date: { 
        type: Date, 
        default: Date.now, 
    },
});

//user signup endpoint
app.post('/adminsignup', async (req, res) => {
    try {
        // Check if user already exists
        let check = await Admins.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, error: "You are already registered as an admin, try to log in." });
        }

        // Generate new user ID
        let admins = await Admins.find({});
        let adminNumber = admins.length > 0 
            ? (parseInt(admins.slice(-1)[0].id.split("/").slice(-1)[0]) + 1).toString().padStart(3, '0') 
            : '001';

        const adminId = `AUCT/2024/25/${adminNumber}`;
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);  // Generate salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt);  // Hash the password

        // Create new user with 'pending' payment status
        const admin = new Admins({
            id: adminId,
            name: req.body.adminName,
            email: req.body.email.toLowerCase(), 
            password: hashedPassword,  
        });

        await admin.save();

        const data = {
            admin: {
                id: admin.id,
                name: admin.name
            }
        };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, error: "An error occurred during signup. Please try again." });
    }
});

//admin login Endpoint
app.post('/adminlogin', async (req, res) => {
    let admin = await Admins.findOne({ email: req.body.email });
    if (admin) {
        const passCompare = await bcrypt.compare(req.body.password, admin.password);
        if (passCompare) {
            const data = {
                admin: {
                    id: admin.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    } else {
        res.json({ success: false, errors: "Wrong Email Id" });
    }
});

// Load SSL certificate and private key
const sslOptions = {
    key: fs.readFileSync('/home/kepyurbc/ssl/pri/api.officialmusamakueni.co.ke.key'),    
    cert: fs.readFileSync('/home/kepyurbc/ssl/cert/api.officialmusamakueni.co.ke.crt') 
};
// Start HTTPS server
const httpsServer = https.createServer(sslOptions, app);

httpsServer.listen(port, (error) => {
    if (!error) {
        console.log("HTTPS Server Running on Port " + port);
    } else {
        console.log("Error : " + error);
    }
});

httpsServer.setTimeout(500000);
// End of Server Endpoints