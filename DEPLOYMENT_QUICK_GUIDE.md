# 🚀 Quick Deployment Guide

## Prerequisites
1. MongoDB Atlas account
2. Netlify account
3. GitHub repository

## Method 1: Automatic Deployment (Recommended)

```bash
# Run the deployment script
./deploy.sh
```

## Method 2: Manual Deployment

### Step 1: Build the application
```bash
# Install and build client
cd client
npm install
npm run build
cd ..

# Install API dependencies
cd api
npm install
cd ..

# Install function dependencies
cd netlify/functions
npm install
cd ..
```

### Step 2: Deploy to Netlify
```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Step 3: Configure Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables, add:

```
MONGO_URI=mongodb+srv://yourUsername:yourPassword@your-cluster.mongodb.net/posapp?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-key
NODE_ENV=production
```

### Step 4: Update Client Environment

After deployment, update `client/.env.production` with your actual site URL:
```
VITE_SERVER_URL=https://your-actual-site.netlify.app/.netlify/functions/api
```

## Troubleshooting

### Common Issues:
1. **Build fails**: Check dependencies with `npm install`
2. **API not working**: Verify environment variables in Netlify
3. **Database connection**: Ensure MongoDB Atlas credentials are correct
4. **CORS errors**: Check API CORS configuration

### Testing Locally:
```bash
# Start API
cd api
npm start

# Start client (in another terminal)
cd client
npm run dev
```

## 🎉 Your POS app should now be live!
