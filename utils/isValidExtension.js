const allowedExtensions = ['png', 'jpg', 'jpeg', 'mp4'];

export function isValidExtension(fileName) {
  return allowedExtensions.includes(fileName.split('.').pop().toLowerCase());
}