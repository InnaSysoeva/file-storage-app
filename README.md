# file-storage-app
This is a Node.js server for uploading, storing, viewing, and downloading files.
## Technologies
- Node.js
- Express.js
- Docker
- Docker Compose
## Project Structure
file-storage-app/
├── public/          # Static files (HTML, JS)
├── uploads/         # Files uploaded by users
├── constants/       # Constants (e.g., Messages)
├── utils/           # Utilities (file comparison, extension validation)
├── routes/          # Routing
├── index.js         # Server entry point
├── Dockerfile       # Docker image build instructions
├── docker-compose.yml # Docker configuration for deployment
├── README.md        # Instructions (this file)
├── package.json     # Dependency descriptions
## How to run locally
Ensure that you have Node.js, npm, Docker and Docker Compose installed.
1. Clone the repository
git clone https://github.com/InnaSysoeva/file-storage-app.git
cd file-storage-app
2. Install dependencies
npm install
3. Start the server locally
node index.js
The server will start at http://localhost:3000 (or on the port specified in .env or the PORT environment variable).
## How to run with Docker
1. Build and run with Docker Compose 
docker compose up --build
2. Build and run with Dockerfile
docker build -t file-storage-app
docker run -p 3000:3000 file-storage-app
## How to test the system
1. Go to http://localhost:3000
2. You will see a file upload page.
3. Test the following scenarios: 
Upload a new file.
Try uploading a file with the same name.
Try uploading a file with identical content.
Upload files with allowed extensions.
Download (retrieve) files.
## Configuration 
Static files are served from /public
Uploaded files are stored in /uploads
Default port: 3000, but it can be changed via the PORT environment variable.
## Additional Notes
Data (uploaded files) is stored in Docker volumes, so it is preserved even after the container is restarted.
When uploading a file with an invalid extension, duplicate name, or identical content, the app responds with the appropriate error messages.