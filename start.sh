#!/bin/bash

echo "🚀 Starting CollabHire..."
echo "═══════════════════════════════════════"

# Check if .env exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: backend/.env not found"
    echo "Creating from .env.example..."
    cp backend/.env.example backend/.env
    echo "Please edit backend/.env and add your OpenAI API key"
    echo "Then run ./start.sh again"
    exit 1
fi

# Kill any existing processes
echo "🛑 Stopping any existing instances..."
pkill -f "node.*server.js" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 2

echo "Starting Backend..."
cd backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

echo "Starting Frontend..."
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait a moment for servers to start
sleep 3

echo ""
echo "✅ CollabHire is running!"
echo "═══════════════════════════════════════"
echo "📡 Backend:  http://localhost:5000"
echo "🌐 Frontend: http://localhost:3000"
echo "═══════════════════════════════════════"
echo ""
echo "Press Ctrl+C to stop the servers"
echo ""

# Wait for user interrupt
trap "echo ''; echo 'Shutting down CollabHire...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

# Keep script running
wait
