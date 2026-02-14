# Advanced Backend

A Node.js backend application with authentication system built using Express.js, MongoDB, and JWT.

**🚧 Work in Progress** - This repository is under active development. More features and endpoints are coming soon!

## Features

- **User Authentication**: Register and login functionality with JWT tokens
- **Password Security**: Bcrypt password hashing
- **Email Notifications**: Registration email service
- **Cookie-based Authentication**: Secure token storage
- **MongoDB Integration**: Mongoose ODM for database operations
- **Environment Configuration**: dotenv for secure environment variables

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Cookie-parser** - Cookie handling

## Project Structure

```
advanced-backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── config/
│   │   └── db.js             # Database connection
│   ├── controllers/
│   │   └── auth.controller.js # Authentication logic
│   ├── models/
│   │   └── user.model.js     # User schema and methods
│   ├── routes/
│   │   └── auth.routes.js    # Authentication routes
│   └── services/
│       └── email.service.js  # Email functionality
├── server.js                  # Server entry point
├── package.json              # Dependencies and scripts
└── .env                      # Environment variables
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will run on port 3000 by default.

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/auth/register`
- **Body**: `{ "email": "user@example.com", "name": "User Name", "password": "password123" }`
- **Response**: User data with JWT token

#### Login User
- **POST** `/api/auth/login`
- **Body**: `{ "email": "user@example.com", "password": "password123" }`
- **Response**: User data with JWT token

## User Model

The user model includes the following fields:
- `email` (unique, required)
- `name` (required)
- `password` (hashed, required, 6-20 characters)
- `timestamps` (auto-generated)

## Security Features

- Password hashing with bcrypt (salt rounds: 10)
- JWT token authentication (expires in 1 day)
- Input validation and sanitization
- Secure cookie handling

## Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cookie-parser` - Cookie parsing
- `dotenv` - Environment variables
- `nodemailer` - Email service

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with file watching
- `npm test` - Run tests (placeholder)

## License

ISC

## Upcoming Features

This project is actively being developed. Features that will be added soon:

- [ ] User profile management
- [ ] Password reset functionality
- [ ] Email verification system
- [ ] Role-based access control
- [ ] API rate limiting
- [ ] Input validation middleware
- [ ] Error handling middleware
- [ ] Logging system
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Docker configuration
- [ ] CI/CD pipeline setup

## Contributing

Since this is a work in progress, contributions are welcome! Please feel free to submit issues and enhancement requests.
