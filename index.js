import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})