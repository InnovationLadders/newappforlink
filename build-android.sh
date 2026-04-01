#!/bin/bash

# Build Android APK script

echo "🔨 Building Android APK..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Step 2: Build web app
echo "🌐 Building web app..."
npm run build

# Step 3: Sync Capacitor
echo "⚡ Syncing Capacitor..."
npx cap sync android

# Step 4: Build APK
echo "📱 Building APK..."
cd android
chmod +x gradlew
./gradlew assembleDebug --stacktrace

# Check if build succeeded
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    echo "✅ APK built successfully!"
    echo "📍 Location: android/app/build/outputs/apk/debug/app-debug.apk"
else
    echo "❌ APK build failed!"
    exit 1
fi
