import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

const uploadsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'uploads');

app.use(express.static('public'));
app.use('/uploads', express.static(uploadsDir));

app.get('/files', (req, res) => {
    fs.readdir(uploadsDir, (error, files) => {
      if (error) {
        console.error('Помилка читання директорії');

        return res.status(500).json({ error:'Не вдалося отримати список файлів'});
      }
      
      res.json(files);
    });
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})