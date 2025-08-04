# LMS (Learning Management System)

A full-stack Learning Management System built with React.js frontend and Node.js/Express.js backend with MongoDB Atlas database.

## 🚀 Features

- **User Authentication**: Signup, login, password reset with OTP verification
- **Role-based Access**: Student, Instructor, and Admin roles
- **Course Management**: Create, edit, and manage courses
- **Payment Integration**: Secure payment processing
- **Cart System**: Add/remove courses from cart
- **Profile Management**: User profile editing and management
- **Admin Dashboard**: Course approval, user management, coupon system
- **Instructor Dashboard**: Course creation and management

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- JWT Authentication
- bcrypt for password hashing

## 📁 Project Structure

```
LMS/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── Pages/         # Page components
│   │   └── assets/        # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── utils/            # Utility functions
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/traincapetech/LMS-Web.git
   cd LMS-Web
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5001
   JWT_SECRET=your_jwt_secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin_password
   ```

4. **Start the application**
   ```bash
   # Start server (from server directory)
   cd server
   npm start
   
   # Start client (from client directory in new terminal)
   cd client
   npm run dev
   ```

## 🔧 Configuration

### MongoDB Atlas Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Add your IP address to Network Access
4. Create a database user
5. Get your connection string and add it to `.env`

### Environment Variables
- `MONGO_URI`: MongoDB Atlas connection string
- `PORT`: Server port (default: 5001)
- `JWT_SECRET`: Secret key for JWT tokens
- `ADMIN_EMAIL`: Admin user email
- `ADMIN_PASSWORD`: Admin user password

## 📱 Available Scripts

### Server
- `npm start`: Start the server
- `npm run dev`: Start server in development mode

### Client
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset
- `POST /api/auth/reset-password` - Set new password

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update course

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **TrainCape Technology** - Initial work

## 📞 Support

For support, email support@traincape.com or create an issue in this repository. 