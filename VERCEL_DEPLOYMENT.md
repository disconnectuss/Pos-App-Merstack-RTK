# 🚀 Vercel Deployment Guide for POS Application

## 📋 Prerequisites

1. **MongoDB Atlas Account**: Set up a cloud MongoDB database
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **GitHub Repository**: Push your code to GitHub

## 🔧 Step-by-Step Deployment

### 1. MongoDB Atlas Setup
1. Create a MongoDB Atlas cluster
2. Create a database user with read/write permissions
3. Whitelist your IP (or use 0.0.0.0/0 for all IPs)
4. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@ac-tffesw6-shard-00-01.p2pezel.mongodb.net/posapp?retryWrites=true&w=majority
   ```

### 2. Deploy to Vercel

#### Option A: Via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and log in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it as a monorepo

#### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: pos-app-merstack-rtk
# - Directory: ./
# - Override settings? No
```

### 3. Configure Environment Variables
In your Vercel project dashboard, go to Settings → Environment Variables and add:

```
MONGO_URI=mongodb+srv://yourUsername:yourPassword@ac-tffesw6-shard-00-01.p2pezel.mongodb.net/posapp?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-random-jwt-secret-key
NODE_ENV=production
VITE_SERVER_URL=https://your-vercel-app.vercel.app
```

### 4. Update Production URLs
After deployment, update the `VITE_SERVER_URL` in environment variables with your actual Vercel URL.

## 🔍 Common Vercel Deployment Issues & Fixes

### Issue 1: `FUNCTION_INVOCATION_FAILED`
**Cause**: API route errors
**Fix**: Check your MongoDB connection string and environment variables

### Issue 2: `DEPLOYMENT_NOT_READY_REDIRECTING`
**Cause**: Build is still in progress
**Fix**: Wait for build to complete

### Issue 3: `NOT_FOUND` for API routes
**Cause**: Incorrect routing configuration
**Fix**: Ensure `vercel.json` is properly configured

### Issue 4: Database Connection Errors
**Cause**: MongoDB Atlas configuration
**Fix**: 
- Verify connection string
- Check IP whitelist
- Ensure database user has proper permissions

### Issue 5: CORS Errors
**Cause**: Frontend and backend on different domains
**Fix**: Update CORS configuration in your API

## 🧪 Testing Your Deployment

1. **API Health Check**: `https://your-app.vercel.app/api`
2. **Frontend**: `https://your-app.vercel.app`
3. **Database**: Try logging in and creating test data

## 📊 Performance Optimization

1. **Enable Edge Caching**: Add cache headers to your API responses
2. **Optimize Images**: Use Vercel's image optimization
3. **Bundle Analysis**: Check your bundle size

## 🔒 Security Checklist

- [ ] Use strong JWT secret
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Validate environment variables
- [ ] Use MongoDB Atlas IP whitelist
- [ ] Regular dependency updates

## 🆘 Troubleshooting

If you encounter errors:

1. **Check Vercel Functions tab** for error logs
2. **Verify environment variables** are set correctly
3. **Test API endpoints** individually
4. **Check MongoDB Atlas** connection and logs
5. **Review build logs** for any build-time errors

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Error Reference**: [vercel.com/docs/errors](https://vercel.com/docs/errors)

---

Your POS application will be available at: `https://your-project-name.vercel.app`

🎉 **Happy Deploying!**
