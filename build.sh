#!/bin/bash

# POS Application Build Script
echo "🚀 Building POS Application..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d "api" ] || [ ! -d "client" ]; then
    echo -e "${RED}❌ Error: Please run this script from the root directory of the POS app${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installing Backend Dependencies...${NC}"
cd api
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installing Frontend Dependencies...${NC}"
cd ../client
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

echo -e "${GREEN}✅ Build completed successfully!${NC}"
echo -e "${GREEN}📁 Frontend build files are in: client/dist/${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "1. Set up your environment variables:"
echo "   - Copy api/.env.example to api/.env"
echo "   - Update MONGO_URI with your MongoDB connection string"
echo ""
echo "2. Start MongoDB service (if using local MongoDB)"
echo ""
echo "3. Seed demo data (optional):"
echo "   cd api && node seedDemoUser.js && node seedSampleData.js"
echo ""
echo "4. Start the application:"
echo "   Backend:  cd api && npm start"
echo "   Frontend: cd client && npm run preview (for production build)"
echo "   or        cd client && npm run dev (for development)"
echo ""
echo -e "${GREEN}🎉 Your POS application is ready to deploy!${NC}"
