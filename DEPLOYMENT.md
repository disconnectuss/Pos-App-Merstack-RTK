# POS Application - Deployment Guide

## 🚀 Quick Start

### Option 1: Using the Build Script (Recommended)
```bash
# Make sure you're in the project root directory
chmod +x build.sh
./build.sh
```

### Option 2: Manual Build
```bash
# Install and build backend
cd api
npm install
cd ..

# Install and build frontend
cd client
npm install
npm run build
cd ..
```

### Option 3: Docker Deployment
```bash
# Start all services with Docker Compose
docker-compose up -d

# Or build and run individually
docker build -t pos-api ./api
docker build -t pos-client ./client
```

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB** (local installation or cloud service)
3. **npm** or **yarn**

## 🔧 Configuration

### Environment Setup
1. Copy the environment file:
   ```bash
   cp api/.env.example api/.env
   ```

2. Update `api/.env` with your configuration:
   ```
   MONGO_URI=mongodb://localhost:27017/pos-app
   PORT=3000
   JWT_SECRET=your-secure-secret-key
   ```

### MongoDB Setup
- **Local MongoDB**: Make sure MongoDB service is running
- **MongoDB Atlas**: Use your Atlas connection string in MONGO_URI
- **Docker**: Use the provided docker-compose.yml

## 🗃️ Database Seeding (Optional)
```bash
cd api
node seedDemoUser.js
node seedSampleData.js
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
# Terminal 1 - Backend
cd api
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

### Production Mode
```bash
# Backend
cd api
npm start

# Frontend (serve built files)
cd client
npm run preview
```

## 📁 Build Output
- Frontend build files: `client/dist/`
- Ready for deployment to any static hosting service

## 🌐 Deployment Options

### 1. Static Hosting (Frontend)
- **Netlify**: Drag and drop `client/dist` folder
- **Vercel**: Connect repository and set build command to `npm run build`
- **AWS S3**: Upload `client/dist` contents

### 2. Backend Hosting
- **Heroku**: Use provided Dockerfile
- **Railway**: Connect repository
- **DigitalOcean**: Use docker-compose.yml
- **AWS EC2**: Manual deployment or Docker

### 3. Full Stack Deployment
- **Docker**: Use provided docker-compose.yml
- **Kubernetes**: Create k8s manifests from Docker images

## 🔍 Troubleshooting

### Common Issues
1. **CORS errors**: Update CORS settings in api/server.js
2. **MongoDB connection**: Verify MONGO_URI in .env
3. **Build failures**: Clear cache with `npm cache clean --force`

### Performance Optimization
- Enable gzip compression
- Use CDN for static assets
- Implement Redis for sessions (optional)
- Database indexing for better performance

## 📊 Monitoring
- Check application logs
- Monitor MongoDB connection
- Set up health checks for production

## 🔒 Security Checklist
- [ ] Use strong JWT secret
- [ ] Enable HTTPS in production
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Regular security updates

---

## Features Included
- ✅ Menu Management
- ✅ Table Management  
- ✅ Cart System
- ✅ Invoice Generation
- ✅ Statistics Dashboard
- ✅ User Authentication
- ✅ Admin Panel

Your POS application is now ready for production! 🎉
