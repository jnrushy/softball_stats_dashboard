#!/bin/bash

# SDYS Softball Dashboard Deployment Script
echo "🏟️  SDYS Softball Dashboard Deployment"
echo "======================================"

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Deployment Options:"
    echo ""
    echo "1. NETLIFY (Recommended):"
    echo "   - Go to https://netlify.com"
    echo "   - Drag the 'dist' folder to deploy"
    echo "   - Set custom domain: softball.jasonrush.info"
    echo ""
    echo "2. VERCEL:"
    echo "   - Install: npm i -g vercel"
    echo "   - Run: vercel"
    echo "   - Add domain in Vercel dashboard"
    echo ""
    echo "3. TRADITIONAL HOSTING:"
    echo "   - Upload contents of 'dist' folder to your web server"
    echo "   - Configure server to serve index.html for all routes"
    echo "   - Point softball.jasonrush.info to your server"
    echo ""
    echo "📁 Built files are in the 'dist' directory"
    echo "🌐 Your site will be available at: https://softball.jasonrush.info"
else
    echo "❌ Build failed! Please check for errors."
    exit 1
fi 