import fs from 'fs';
import path from 'path';

export async function compareFileWithBuffer(filePath, buffer, chunkSize = 64 * 1024) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath, { highWaterMark: chunkSize });
    let offset = 0;

    stream.on('data', (chunk) => {
      const bufferChunk = buffer.slice(offset, offset + chunk.length);

      if (!chunk.equals(bufferChunk)) {
        stream.destroy();

        return resolve(false);
      }
      offset += chunk.length;
    });

    stream.on('end', () => {
      if (offset !== buffer.length) {
        return resolve(false); 
      }

      resolve(true);
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
}

export async function isDuplicate(directoryPath, buffer) {
  const files = await fs.promises.readdir(directoryPath);

  for (const file of files) {
    const isSame = await compareFileWithBuffer(path.join(directoryPath, file), buffer);

    if (isSame) {
      return true;
    }
  }

  return false;
}