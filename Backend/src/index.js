const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const schemeRoutes = require('./routes/schemes');
const chatRoutes = require('./routes/chat'); // ⭐ NEW
const sttRoutes = require("./routes/stt");
const ttsRoutes = require("./routes/tts");
const app = express();

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

connectDB();

app.use("/api/auth", authRoutes);

app.use('/api/complaints', complaintRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/chat', chatRoutes); // ⭐ NEW
app.use("/api/stt", sttRoutes);
app.use("/api/tts", ttsRoutes);

app.get('/', (req, res) => res.json({ status: 'ok', name: 'CivicSeva API' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(process.env.GEMINI_API_KEY)
});
