import fs from 'fs';

export async function saveFile(filePath, buffer) {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(filePath);
        writeStream.write(buffer);
        writeStream.end();
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    })
}