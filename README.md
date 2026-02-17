# Advanced Backend

A Node.js backend application with authentication system built using Express.js, MongoDB, and JWT.

**🚧 Work in Progress** - This repository is under active development. More features and endpoints are coming soon!

## Features

- **User Authentication**: Register and login functionality with JWT tokens
- **Account Management**: Create and manage user accounts
- **Transaction System**: Secure money transfers with idempotency
- **Ledger System**: Double-entry bookkeeping with debit/credit tracking
- **Balance Calculation**: Real-time balance computation
- **Password Security**: Bcrypt password hashing
- **Email Notifications**: Transaction and registration email service
- **Cookie-based Authentication**: Secure token storage
- **MongoDB Integration**: Mongoose ODM for database operations
- **Environment Configuration**: dotenv for secure environment variables
- **CI/CD Pipeline**: Automated testing, building, and deployment

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
│   ├── app.js                    # Express app configuration
│   ├── config/
│   │   └── db.js                # Database connection
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── account.controller.js # Account management
│   │   └── transaction.controller.js # Transaction logic
│   ├── models/
│   │   ├── user.model.js        # User schema and methods
│   │   ├── account.model.js     # Account schema and balance methods
│   │   ├── transaction.model.js # Transaction schema
│   │   └── ledger.model.js      # Ledger entry schema
│   ├── routes/
│   │   ├── auth.routes.js       # Authentication routes
│   │   ├── account.routes.js    # Account routes
│   │   └── transaction.routes.js # Transaction routes
│   ├── middlewares/
│   │   └── auth.middleware.js   # JWT authentication middleware
│   └── services/
│       └── email.service.js     # Email functionality
├── .github/workflows/
│   └── ci-cd.yml               # GitHub Actions pipeline
├── server.js                    # Server entry point
├── package.json                 # Dependencies and scripts
├── Dockerfile                   # Docker configuration
├── docker-compose.yml           # Docker Compose setup
├── nginx.conf                   # Nginx configuration
├── healthcheck.js               # Container health check
└── .env                         # Environment variables
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

### Account Management

#### Create Account
- **POST** `/api/account/create`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Created account details

#### Get Account Balance
- **GET** `/api/account/balance/:accountId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Account balance information

### Transactions

#### Create Transaction
- **POST** `/api/transaction/create`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "amount": 1000, "fromAccount": "accountId1", "toAccount": "accountId2", "idempotencyKey": "unique-key" }`
- **Response**: Transaction details

#### Create Initial Transaction (System)
- **POST** `/api/transaction/initial`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "amount": 1000, "toAccount": "accountId", "idempotencyKey": "unique-key" }`
- **Response**: Initial transaction details

## Data Models

### User Model
- `email` (unique, required)
- `name` (required)
- `password` (hashed, required, 6-20 characters)
- `systemUser` (boolean, default false)
- `timestamps` (auto-generated)

### Account Model
- `userId` (ObjectId, references User)
- `status` (ACTIVE, FROZEN, CLOSED)
- `currency` (default: INR)
- `timestamps` (auto-generated)
- **Methods**: `getBalance()` - calculates current balance

### Transaction Model
- `fromAccount` (ObjectId, references Account)
- `toAccount` (ObjectId, references Account)
- `amount` (Number, required, min: 0.01)
- `status` (PENDING, COMPLETED, FAILED, REVERSED)
- `idempotencyKey` (String, unique, required)
- `timestamps` (auto-generated)

### Ledger Model
- `account` (ObjectId, references Account)
- `transaction` (ObjectId, references Transaction)
- `amount` (Number, required)
- `type` (DEBIT, CREDIT)
- **Immutable**: Cannot be modified after creation

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

## Contributing

Since this is a work in progress, contributions are welcome! Please feel free to submit issues and enhancement requests.
