#!/bin/bash

# Deployment script for Food & Beverage E-commerce Website

echo "🚀 Starting deployment process..."

# Check if required commands are available
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting." >&2; exit 1; }

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check environment variables
echo "🔍 Checking environment variables..."
if [ ! -f ".env.local" ]; then
    print_warning ".env.local file not found. Creating from .env.example..."
    cp .env.example .env.local
    print_warning "Please update .env.local with your actual API keys before deploying."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi
print_status "Dependencies installed successfully"

# Build the project
echo "🔨 Building the project..."
npm run build
if [ $? -ne 0 ]; then
    print_error "Build failed"
    exit 1
fi
print_status "Build completed successfully"

# Run tests (if available)
echo "🧪 Running tests..."
npm test 2>/dev/null || print_warning "No tests found or tests failed"

# Check if Vercel CLI is installed
if command -v vercel >/dev/null 2>&1; then
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    if [ $? -eq 0 ]; then
        print_status "Successfully deployed to Vercel!"
    else
        print_error "Vercel deployment failed"
        exit 1
    fi
else
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "🚀 Deploying to Vercel..."
    vercel --prod
fi

# Optional: Deploy to other platforms
print_status "Deployment process completed!"
echo ""
echo "📋 Next steps:"
echo "1. Set up your environment variables in your deployment platform"
echo "2. Configure your database (Supabase)"
echo "3. Set up Stripe webhooks"
echo "4. Test the payment flow"
echo "5. Add your products to the database"
echo ""
echo "🔗 Useful links:"
echo "- Vercel Dashboard: https://vercel.com/dashboard"
echo "- Stripe Dashboard: https://dashboard.stripe.com"
echo "- Supabase Dashboard: https://app.supabase.com"