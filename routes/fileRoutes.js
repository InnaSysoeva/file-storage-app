import express from 'express';
import fs from 'fs';
import path from 'path';
import { isDuplicate, compareFileWithBuffer } from '../utils/fileCompareUtils.js';
import { isValidExtension } from '../utils/isValidExtension.js';
import { StatusCodes } from '../constants/statusCodesConst.js';
import { Messages } from '../constants/messagesConst.js';
import { saveFile } from '../utils/saveFile.js';

const router = express.Router();
const uploadsDir = path.join(process.cwd(), 'uploads');

router.get('/files', (req, res) => {
    fs.readdir(uploadsDir, (error, files) => {
      if (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: Messages.FAILED_TO_READ_DIRECTORY});
      }
      
      res.json(files);
    }); 
});

router.post('/upload', (req, res) => {
    const fileName = req.headers['file-name'];

    if (!isValidExtension(fileName)) {
      return res.status(StatusCodes.BAD_REQUEST).send(Messages.INVALID_FILE_TYPE);
    }

    const chunks = [];
  
    req.on('data', (chunk) => {chunks.push(chunk)});
  
    req.on('end', async () => {
      const fileBuffer = Buffer.concat(chunks);
      const filePath = path.join(uploadsDir, fileName);

      try {
        if (fs.existsSync(filePath)) {
          const isSameContent = await compareFileWithBuffer(filePath, fileBuffer);
        
          return res.status(StatusCodes.CONFLICT).send(
            isSameContent ? Messages.FILE_CONTENT_DUPLICATE : Messages.FILE_ALREADY_EXISTS
          );          
        }
        
        const duplicateExists = await isDuplicate(uploadsDir, fileBuffer);
        
        if (duplicateExists) {
          return res.status(StatusCodes.CONFLICT).send(Messages.FILE_CONTENT_DUPLICATE);
        }

        await saveFile(filePath, fileBuffer);

        return res.status(StatusCodes.OK).send(Messages.FILE_UPLOAD_SUCCESS);
      } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(Messages.INTERNAL_SERVER_ERROR);
      }
    });
  
    req.on('error', (err) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(Messages.FILE_UPLOAD_FAILED);
    });
});

export default router;