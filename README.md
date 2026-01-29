# Research Paper Reading Tracker

A full-stack web application designed to help researchers efficiently manage, track, and analyze their academic reading progress. The application allows users to store research papers with structured metadata, monitor reading stages, and gain insights through interactive analytics.

## 🎯 Features

- **Paper Management**: Add, edit, and delete research papers with comprehensive metadata
- **Structured Metadata**: Track title, authors, publication year, journal, DOI, URL, abstract, and keywords
- **Reading Stage Tracking**: Monitor papers through different stages (To Read, Reading, Completed, Archived)
- **Priority System**: Organize papers by priority (Low, Medium, High)
- **Rating System**: Rate papers from 1-5 stars
- **Notes**: Add personal notes for each paper
- **Search & Filter**: Quickly find papers using search and filter by reading stage
- **Analytics Dashboard**: Visualize reading progress with interactive statistics
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

### Backend
- **Node.js** with **Express.js** - Server framework
- **MongoDB** with **Mongoose** - Database and ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with responsive design

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

### MongoDB Setup Options

**Option 1: Local MongoDB**
- Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB: `mongod` or `sudo systemctl start mongod`

**Option 2: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Update `.env` with your Atlas connection string

**Option 3: Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

> **Note:** The application requires a running MongoDB instance. Without it, the API server won't be able to store or retrieve papers. Make sure MongoDB is running before starting the server.

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/rohitvishwakrma/research-paper-tracker.git
cd research-paper-tracker
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### 4. Set Up Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/research-paper-tracker
```

For MongoDB Atlas, use:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/research-paper-tracker?retryWrites=true&w=majority
```

### 5. Start MongoDB
If using local MongoDB:
```bash
mongod
```

## 🎮 Running the Application

### Development Mode

**Option 1: Run Backend and Frontend Separately**

Terminal 1 - Backend:
```bash
npm start
```
The server will run on `http://localhost:5000`

Terminal 2 - Frontend:
```bash
npm run client
```
The React app will run on `http://localhost:3000`

**Option 2: Using Concurrently (if installed)**
```bash
npm run dev
```

### Production Mode

Build the frontend:
```bash
npm run build-client
```

Start the server:
```bash
npm start
```

## 📚 API Endpoints

### Papers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/papers` | Get all papers |
| GET | `/api/papers/:id` | Get a specific paper |
| POST | `/api/papers` | Create a new paper |
| PUT | `/api/papers/:id` | Update a paper |
| DELETE | `/api/papers/:id` | Delete a paper |
| GET | `/api/papers/analytics/stats` | Get analytics statistics |

### Request Body Example (POST/PUT)
```json
{
  "title": "Deep Learning for Natural Language Processing",
  "authors": "John Doe, Jane Smith",
  "publicationYear": 2024,
  "journal": "Journal of AI Research",
  "doi": "10.1234/example",
  "url": "https://example.com/paper",
  "abstract": "This paper explores...",
  "keywords": ["deep learning", "NLP", "transformers"],
  "readingStage": "to-read",
  "priority": "high",
  "notes": "Important for my research",
  "rating": 5
}
```

## 📱 Usage Guide

### Adding a Paper
1. Click the "+ Add Paper" button
2. Fill in the required fields (Title, Authors, Publication Year)
3. Optionally add additional metadata (journal, DOI, abstract, etc.)
4. Set the reading stage and priority
5. Click "Add Paper"

### Managing Papers
- **Edit**: Click the "Edit" button on any paper card
- **Delete**: Click the "Delete" button (confirmation required)
- **Update Stage**: Use the dropdown on each card to change reading stage
- **Search**: Use the search bar to find papers by title, authors, or keywords
- **Filter**: Use the filter dropdown to show papers by reading stage

### Viewing Analytics
1. Click the "Analytics" tab in the navigation
2. View statistics including:
   - Total number of papers
   - Papers by reading stage
   - Papers by priority
   - Average rating

## 🎨 Application Structure

```
research-paper-tracker/
├── server/
│   ├── models/
│   │   └── Paper.js          # MongoDB schema
│   ├── routes/
│   │   └── papers.js         # API routes
│   └── server.js             # Express server setup
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PaperForm.js  # Form for adding/editing papers
│   │   │   ├── PaperCard.js  # Paper display card
│   │   │   └── Analytics.js  # Analytics dashboard
│   │   ├── services/
│   │   │   └── api.js        # API service layer
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Styles
│   │   └── index.js          # React entry point
│   └── package.json
├── .env.example              # Example environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🔒 Data Model

### Paper Schema
- `title` (String, required) - Paper title
- `authors` (String, required) - Comma-separated authors
- `publicationYear` (Number, required) - Year of publication
- `journal` (String) - Journal name
- `doi` (String) - Digital Object Identifier
- `url` (String) - Link to paper
- `abstract` (String) - Paper abstract
- `keywords` (Array of Strings) - Keywords/tags
- `readingStage` (String) - Current reading stage (to-read, reading, completed, archived)
- `priority` (String) - Priority level (low, medium, high)
- `notes` (String) - Personal notes
- `rating` (Number, 1-5) - Paper rating
- `dateAdded` (Date) - When paper was added
- `dateStarted` (Date) - When reading started
- `dateCompleted` (Date) - When reading completed
- `timestamps` - createdAt and updatedAt

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Rohit Vishwakarma

## 🙏 Acknowledgments

- Built with React and Express.js
- MongoDB for data persistence
- Inspired by the need for better academic paper organization

---

**Happy Reading! 📚**