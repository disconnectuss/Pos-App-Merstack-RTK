#!/bin/bash

echo "🚀 Building and Deploying POS App to Netlify..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "client" ] && [ ! -d "api" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Starting deployment process..."

# Step 1: Install dependencies
print_status "Installing client dependencies..."
cd client
if npm install; then
    print_success "Client dependencies installed"
else
    print_error "Failed to install client dependencies"
    exit 1
fi

# Step 2: Build the client
print_status "Building client for production..."
if npm run build; then
    print_success "Client built successfully"
else
    print_error "Failed to build client"
    exit 1
fi

cd ..

# Step 3: Install API dependencies
print_status "Installing API dependencies..."
cd api
if npm install; then
    print_success "API dependencies installed"
else
    print_error "Failed to install API dependencies"
    exit 1
fi

cd ..

# Step 4: Install Netlify function dependencies
print_status "Installing Netlify function dependencies..."
cd netlify/functions
if npm install; then
    print_success "Function dependencies installed"
else
    print_error "Failed to install function dependencies"
    exit 1
fi

cd ../..

# Step 5: Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    print_warning "Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Step 6: Login to Netlify (if not already logged in)
print_status "Checking Netlify authentication..."
if ! netlify status &> /dev/null; then
    print_warning "Please login to Netlify..."
    netlify login
fi

# Step 7: Deploy to Netlify
print_status "Deploying to Netlify..."
if netlify deploy --prod; then
    print_success "🎉 Deployment successful!"
    print_status "Your app is now live!"
    
    # Get site URL
    SITE_URL=$(netlify status | grep -o 'https://[^"]*\.netlify\.app' | head -1)
    if [ ! -z "$SITE_URL" ]; then
        print_success "Site URL: $SITE_URL"
        
        # Update client .env.production with actual URL
        print_status "Updating client environment with actual URL..."
        echo "VITE_SERVER_URL=$SITE_URL/.netlify/functions/api" > client/.env.production
        print_success "Environment updated"
    fi
else
    print_error "Deployment failed"
    exit 1
fi

echo ""
print_status "🚀 Deployment Complete!"
print_warning "Don't forget to:"
echo "  1. Set up MongoDB Atlas credentials in Netlify environment variables"
echo "  2. Add JWT_SECRET in Netlify environment variables"
echo "  3. Test all functionality in production"
echo ""
