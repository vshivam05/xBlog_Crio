# XBlog MERN Application

## Project Description
XBlog is a full-stack MERN (MongoDB, Express, React, Node.js) application designed as a blogging platform. It allows users to create accounts, write posts, comment on posts, and interact with other users. The project demonstrates a modern web application architecture with a React frontend and an Express backend connected to a MongoDB database.

## Technologies Used
- **Frontend:** React, Vite, React Router, Axios, Firebase, FontAwesome
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer, Firebase Admin
- **Other:** Nodemon, CORS, dotenv, bcrypt, ESLint

## Backend Setup

### Prerequisites
- Node.js installed
- MongoDB instance running (local or cloud)
- Environment variable `MONGODB_URI` set with your MongoDB connection string
- Optional: `PORT` environment variable to specify server port (default is 5000)

### Installation and Running
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server (with nodemon for auto-restart on changes):
   ```bash
   npm start
   ```
4. To reset the database (if needed):
   ```bash
   npm run reset-db
   ```

The backend server will start on `http://localhost:5000` (or the port specified in your environment).

## Frontend Setup

### Prerequisites
- Node.js installed

### Installation and Running
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000` (default Vite port).

## API Endpoints Overview

- **Authentication:** `/api/auth`
- **Users:** `/api/users`
- **Posts:** `/api/posts`
- **Comments:** `/api/comments`

Static files such as uploaded images are served from `/uploads`.

## Folder Structure

```
root
├── client/          # React frontend source code
├── server/          # Express backend source code
│   ├── config/      # Configuration files (DB, admin seeder, reset DB)
│   ├── controllers/ # Route controllers
│   ├── middlewares/ # Express middlewares
│   ├── models/      # Mongoose models
│   ├── routes/      # Express routes
│   ├── service/     # Business logic services
│   ├── uploads/     # Uploaded files storage
│   └── app.js       # Express app setup
│   └── server.js    # Server entry point
├── assessment/      # Testing and assessment scripts
└── README.md        # This file
```

## Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Testing

Automated tests and assessment scripts are located in the `assessment` directory. Refer to those scripts for running tests.

## License

This project is licensed under the ISC License.

## Contact

For any questions or issues, please contact the project maintainer.
