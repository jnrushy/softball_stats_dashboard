#!/bin/bash

# Vercel Deployment Script for SDYS Softball Dashboard
echo "🏟️  Deploying SDYS Softball Dashboard to Vercel"
echo "================================================"

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    echo ""
    echo "🎉 Deployment complete!"
    echo "🌐 Your dashboard is now live!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to https://vercel.com/dashboard"
    echo "2. Select your project: diamond-dream-dashboards"
    echo "3. Go to Settings → Domains"
    echo "4. Add custom domain: softball.jasonrush.info"
    echo ""
    echo "🔗 Current URL: https://diamond-dream-dashboards-57upcvvwm-jason-rushs-projects.vercel.app"
else
    echo "❌ Build failed! Please check for errors."
    exit 1
fi 