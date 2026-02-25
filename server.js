import express from 'express';
import cors from 'cors';
import dotenv from  'dotenv';
import connectDB from './config/db.js';
import { createServer } from 'http';
import blogRoutes from "./routes/blog.js";

dotenv.config();

connectDB(); // connect to database


const app = express();

const httpServer = createServer(app);

app.use(cors());

app.use(express.json());

// mongoose connection

// Routes
app.use("/api/blogs", blogRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log('listening on *:5000');
});