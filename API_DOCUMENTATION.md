# API Documentation

## Research Paper Tracker API

Base URL: `http://localhost:5000/api`

### Endpoints

#### 1. Get All Papers
```http
GET /papers
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Deep Learning for NLP",
    "authors": "John Doe, Jane Smith",
    "publicationYear": 2024,
    "journal": "Journal of AI",
    "readingStage": "completed",
    "priority": "high",
    "rating": 5,
    "dateAdded": "2024-01-15T10:30:00.000Z",
    ...
  }
]
```

#### 2. Get Paper by ID
```http
GET /papers/:id
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Deep Learning for NLP",
  ...
}
```

#### 3. Create Paper
```http
POST /papers
```

**Request Body:**
```json
{
  "title": "Paper Title",
  "authors": "Author Names",
  "publicationYear": 2024,
  "journal": "Journal Name",
  "doi": "10.1234/example",
  "url": "https://example.com",
  "abstract": "Paper abstract...",
  "keywords": ["keyword1", "keyword2"],
  "readingStage": "to-read",
  "priority": "medium",
  "notes": "My notes",
  "rating": 4
}
```

**Required fields:**
- `title` (String)
- `authors` (String)
- `publicationYear` (Number)

**Response:** Created paper object with `_id`

#### 4. Update Paper
```http
PUT /papers/:id
```

**Request Body:** Same as Create (partial updates allowed)

**Special Behavior:**
- Setting `readingStage` to "reading" automatically sets `dateStarted` if not already set
- Setting `readingStage` to "completed" automatically sets `dateCompleted` if not already set

**Response:** Updated paper object

#### 5. Delete Paper
```http
DELETE /papers/:id
```

**Response:**
```json
{
  "message": "Paper deleted successfully"
}
```

#### 6. Get Analytics
```http
GET /papers/analytics/stats
```

**Response:**
```json
{
  "totalPapers": 10,
  "byStage": {
    "to-read": 3,
    "reading": 2,
    "completed": 4,
    "archived": 1
  },
  "byPriority": {
    "low": 2,
    "medium": 5,
    "high": 3
  },
  "averageRating": 4.2
}
```

### Field Enumerations

#### Reading Stages
- `to-read` - Paper is in the reading queue
- `reading` - Currently reading the paper
- `completed` - Finished reading the paper
- `archived` - Paper has been archived

#### Priority Levels
- `low` - Low priority
- `medium` - Medium priority
- `high` - High priority

#### Rating
- Integer from 1 to 5

### Error Responses

#### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

#### 404 Not Found
```json
{
  "message": "Paper not found"
}
```

#### 500 Internal Server Error
```json
{
  "message": "Error message"
}
```

## Data Model

### Paper Schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| title | String | Yes | - | Paper title |
| authors | String | Yes | - | Comma-separated author names |
| publicationYear | Number | Yes | - | Year of publication |
| journal | String | No | - | Journal name |
| doi | String | No | - | Digital Object Identifier |
| url | String | No | - | Link to paper |
| abstract | String | No | - | Paper abstract |
| keywords | [String] | No | [] | Array of keywords |
| readingStage | String | No | 'to-read' | Current reading stage |
| priority | String | No | 'medium' | Priority level |
| notes | String | No | - | Personal notes |
| rating | Number | No | - | Rating from 1-5 |
| dateAdded | Date | No | Now | When paper was added |
| dateStarted | Date | No | - | When reading started |
| dateCompleted | Date | No | - | When reading completed |
| createdAt | Date | Auto | Now | Record creation timestamp |
| updatedAt | Date | Auto | Now | Record update timestamp |

## Example Usage

### Using cURL

```bash
# Get all papers
curl http://localhost:5000/api/papers

# Create a paper
curl -X POST http://localhost:5000/api/papers \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Example Paper",
    "authors": "John Doe",
    "publicationYear": 2024,
    "readingStage": "to-read",
    "priority": "high"
  }'

# Update a paper
curl -X PUT http://localhost:5000/api/papers/PAPER_ID \
  -H "Content-Type: application/json" \
  -d '{"readingStage": "reading"}'

# Delete a paper
curl -X DELETE http://localhost:5000/api/papers/PAPER_ID

# Get analytics
curl http://localhost:5000/api/papers/analytics/stats
```

### Using JavaScript (Axios)

```javascript
const axios = require('axios');
const API_URL = 'http://localhost:5000/api';

// Get all papers
const papers = await axios.get(`${API_URL}/papers`);

// Create paper
const newPaper = await axios.post(`${API_URL}/papers`, {
  title: "Example Paper",
  authors: "John Doe",
  publicationYear: 2024
});

// Update paper
const updated = await axios.put(`${API_URL}/papers/${paperId}`, {
  readingStage: "completed"
});

// Delete paper
await axios.delete(`${API_URL}/papers/${paperId}`);

// Get analytics
const analytics = await axios.get(`${API_URL}/papers/analytics/stats`);
```
