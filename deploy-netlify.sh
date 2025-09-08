#!/bin/bash

# Netlify Deployment Script for POS Application
echo "🚀 Preparing POS Application for Netlify Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d "client" ] || [ ! -d "api" ] || [ ! -f "netlify.toml" ]; then
    echo -e "${RED}❌ Error: Please run this script from the root directory of the POS app${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installing Frontend Dependencies...${NC}"
cd client
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

echo -e "${YELLOW}🔨 Building Frontend for Production...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to build frontend${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installing Netlify Function Dependencies...${NC}"
cd ../netlify/functions
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install function dependencies${NC}"
    exit 1
fi

cd ../..

echo -e "${GREEN}✅ Build completed successfully!${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Configure Environment Variables in Netlify:"
echo "   - MONGO_URI (your MongoDB Atlas connection string)"
echo "   - JWT_SECRET (secure random string)"
echo "   - NODE_ENV=production"
echo ""
echo "2. Deploy Options:"
echo "   ${YELLOW}Option A: Netlify Dashboard${NC}"
echo "   - Go to https://app.netlify.com"
echo "   - Import your GitHub repository"
echo "   - Set build settings:"
echo "     - Base directory: client"
echo "     - Build command: npm run build"
echo "     - Publish directory: client/dist"
echo ""
echo "   ${YELLOW}Option B: Netlify CLI${NC}"
echo "   - netlify login"
echo "   - netlify init"
echo "   - netlify deploy --prod"
echo ""
echo "3. Test locally with:"
echo "   netlify dev"
echo ""
echo -e "${GREEN}🎉 Your POS application is ready for Netlify deployment!${NC}"
