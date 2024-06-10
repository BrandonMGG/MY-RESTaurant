
import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import router from './routes/authRoutes.js';
import routerPassword from './routes/passwordRoutes.js';
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db=>console.log("database is connected")).catch(error=>console.error(error))

// Routes
app.use('/auth/', router);
app.use('/auth/', routerPassword)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
