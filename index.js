import express from 'express';
import path from 'path';
import fileRouter from './routes/fileRoutes.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(fileRouter);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})