# 🚀 Backend Deployment Guide

## Prerequisites
- MongoDB database (MongoDB Atlas recommended)
- Git repository
- Render account (or other hosting platform)

## Step 1: Prepare Environment Variables

Create a `.env` file in your server directory with these variables:

```env
# Database Configuration
MONGO_URI=your_mongodb_connection_string_here

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Admin Configuration
ADMIN_EMAIL=admin@traincape.com
ADMIN_PASSWORD=Admin@123

# Server Configuration
PORT=5000
NODE_ENV=production
```

## Step 2: Deploy to Render

### Method 1: Connect GitHub Repository

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Sign up/Login
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure the service**
   - **Name**: `lms-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server` (if your backend is in a server folder)

4. **Add Environment Variables**
   - Click on "Environment" tab
   - Add all the variables from your `.env` file
   - Make sure to use your actual MongoDB connection string

### Method 2: Deploy from Local Directory

1. **Install Render CLI**
   ```bash
   npm install -g @render/cli
   ```

2. **Login to Render**
   ```bash
   render login
   ```

3. **Deploy**
   ```bash
   cd server
   render deploy
   ```

## Step 3: Alternative Platforms

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Heroku
```bash
# Install Heroku CLI
# Create Procfile
echo "web: npm start" > Procfile

# Deploy
heroku create your-app-name
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
```

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## Step 4: Update Frontend

After deployment, update your frontend API base URL:

```javascript
// In client/src/utils/api.js
const api = axios.create({
  baseURL: 'https://your-new-backend-url.onrender.com/api',
  // ... rest of config
});
```

## Step 5: Test Deployment

1. **Check if server is running**
   ```bash
   curl https://your-backend-url.onrender.com/api/courses
   ```

2. **Test authentication**
   ```bash
   curl -X POST https://your-backend-url.onrender.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"test123"}'
   ```

## Common Issues & Solutions

### Issue 1: CORS Errors
- Make sure CORS is properly configured in server.js
- Add your frontend domain to allowed origins

### Issue 2: MongoDB Connection
- Ensure your MongoDB URI is correct
- Check if your IP is whitelisted in MongoDB Atlas

### Issue 3: Environment Variables
- Double-check all environment variables are set
- Restart the service after adding new variables

### Issue 4: Build Failures
- Check if all dependencies are in package.json
- Ensure Node.js version is compatible

## Monitoring & Maintenance

1. **Set up logging**
   - Use Render's built-in logs
   - Consider adding Winston for better logging

2. **Monitor performance**
   - Check Render's metrics dashboard
   - Set up alerts for downtime

3. **Database backups**
   - Enable MongoDB Atlas backups
   - Set up automated backup schedules

## Security Checklist

- [ ] Use strong JWT secrets
- [ ] Enable HTTPS (automatic on Render)
- [ ] Set up proper CORS origins
- [ ] Use environment variables for sensitive data
- [ ] Enable MongoDB authentication
- [ ] Set up rate limiting (optional)

## Cost Optimization

- **Render**: Free tier available
- **Railway**: $5/month minimum
- **Heroku**: $7/month minimum
- **Vercel**: Free tier available

Choose based on your needs and budget! 