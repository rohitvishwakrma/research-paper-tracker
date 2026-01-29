# Quick Start Guide

## Research Paper Reading Tracker - Get Started in 5 Minutes

### Prerequisites Check
```bash
node --version  # Should be v14 or higher
npm --version   # Should be v6 or higher
mongod --version  # MongoDB should be installed
```

### Step 1: Clone and Install (2 minutes)
```bash
# Clone the repository
git clone https://github.com/rohitvishwakrma/research-paper-tracker.git
cd research-paper-tracker

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 2: Configure Environment (30 seconds)
```bash
# Copy environment example
cp .env.example .env

# Edit .env if needed (default values work for local MongoDB)
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/research-paper-tracker
```

### Step 3: Start MongoDB (1 minute)

**Option A: Local MongoDB**
```bash
# Linux/Mac
mongod

# Or with systemd
sudo systemctl start mongod
```

**Option B: Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option C: MongoDB Atlas (Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string
- Update `.env` with: `MONGODB_URI=your-atlas-connection-string`

### Step 4: Start the Application (1 minute)

**Terminal 1 - Backend Server:**
```bash
npm start
# Server will run on http://localhost:5000
```

**Terminal 2 - Frontend (in a new terminal):**
```bash
npm run client
# React app will run on http://localhost:3000
```

### Step 5: Use the Application! 🎉

Open your browser to **http://localhost:3000**

#### First Actions:
1. Click **"+ Add Paper"** button
2. Fill in paper details:
   - Title: "Your First Research Paper"
   - Authors: "Your Name"
   - Year: 2024
   - (Other fields are optional)
3. Click **"Add Paper"**
4. Your paper appears in the grid!

#### Try These Features:
- ✅ Search for papers
- ✅ Filter by reading stage
- ✅ Change reading stage using dropdown
- ✅ Rate papers with stars
- ✅ Add personal notes
- ✅ View analytics dashboard

---

## Troubleshooting

### MongoDB Connection Error
**Problem:** `MongoDB connection error: connect ECONNREFUSED`

**Solution:**
- Make sure MongoDB is running: `mongod`
- Check MongoDB status: `sudo systemctl status mongod`
- Verify connection string in `.env`

### Port Already in Use
**Problem:** `Error: listen EADDRINUSE: address already in use`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port in .env
PORT=5001
```

### React Build Errors
**Problem:** npm install fails in client directory

**Solution:**
```bash
cd client
rm -rf node_modules package-lock.json
npm install
```

---

## Production Deployment

### Build Frontend
```bash
cd client
npm run build
cd ..
```

The build folder contains optimized production files.

### Serve Static Files
Update `server/server.js` to serve React build:
```javascript
// Add this after other middleware
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
```

Then start with:
```bash
NODE_ENV=production npm start
```

---

## Testing the API

### Manual Testing with cURL
```bash
# Test server is running
curl http://localhost:5000/

# Get all papers
curl http://localhost:5000/api/papers

# Add a paper
curl -X POST http://localhost:5000/api/papers \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Paper",
    "authors": "Test Author",
    "publicationYear": 2024
  }'

# Get analytics
curl http://localhost:5000/api/papers/analytics/stats
```

### Automated Testing
```bash
# Make sure server is running first
npm start

# In another terminal, run the test suite
npm run test-api
```

---

## Next Steps

1. **Customize**: Modify colors, layout, or add new fields
2. **Backup**: Set up MongoDB backups for your data
3. **Deploy**: Deploy to Heroku, AWS, or your preferred platform
4. **Extend**: Add features like:
   - User authentication
   - File attachments (PDFs)
   - Citation export
   - Collaboration features
   - Reading time tracking

---

## Quick Reference

### Common Commands
```bash
npm start              # Start backend server
npm run client         # Start frontend dev server
npm run build-client   # Build frontend for production
npm run test-api       # Run API tests
```

### Important Files
```
server/server.js       # Backend entry point
server/models/Paper.js # Database schema
server/routes/papers.js # API endpoints
client/src/App.js      # React main component
.env                   # Configuration (don't commit!)
```

### Default URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: See API_DOCUMENTATION.md

---

**Happy researching! 📚✨**
