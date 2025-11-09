#!/bin/bash

echo "🚀 Setting up CollabHire..."
echo "═══════════════════════════════════════"

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "📦 Installing Backend Dependencies..."
cd backend
npm install
cd ..

echo "📦 Installing Frontend Dependencies..."
cd frontend  
npm install
cd ..

echo ""
echo "✅ Setup Complete!"
echo "═══════════════════════════════════════"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Add your OpenAI API key to backend/.env"
echo "   Edit: backend/.env"
echo "   Add: OPENAI_API_KEY=your_key_here"
echo ""
echo "2. Start the application:"
echo "   Run: ./start.sh"
echo ""
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "═══════════════════════════════════════"
