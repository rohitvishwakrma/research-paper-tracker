### Built a full-stack Research Paper Reading Tracker using React, Node.js, and MongoDB, enabling researchers to manage papers, track reading progress, and analyze insights through interactive dashboards.

## System Architecture

1. Frontend
  React.js
  UI Library: ShadCN / Material-UI
  Chart Library: Recharts / Chart.js

2. Backend
  Node.js with Express.js
  RESTful API design

3. Database
  MongoDB for data storage
  Mongoose for data modeling  

4. Authentication
  JWT-based authentication

5. Deployment
  Frontend: Vercel / Netlify
  Backend: Render / Railway
  Database: MongoDB Atlas / Supabase

### Frontend (React)
1. client
research-paper-tracker/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── PaperLibrary/
│   │   │   ├── PaperCard.jsx
│   │   │   ├── FilterSection.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── AddPaper/
│   │   │   └── PaperForm.jsx
│   │   ├── Analytics/
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── FunnelChart.jsx
│   │   │   ├── ScatterChart.jsx
│   │   │   ├── StackedBarChart.jsx
│   │   │   └── DomainCitations.jsx
│   │   └── Common/
│   │       ├── Button.jsx
│   │       ├── Modal.jsx
│   │       └── Badge.jsx
│   ├── hooks/
│   │   ├── usePapers.js
│   │   └── useAnalytics.js
│   ├── utils/
│   │   ├── data.js
│   │   └── constants.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md

### Backend (Node + Express)
 2. ## backend
  ├── src/
  │   ├── config/
  │   │   └── db.js
  │   │
  │   ├── models/
  │   │   └── Paper.model.js
  │   │
  │   ├── controllers/
  │   │   ├── paper.controller.js
  │   │   └── analytics.controller.js
  │   │
  │   ├── routes/
  │   │   ├── paper.routes.js
  │   │   └── analytics.routes.js
  │   │
  │   ├── utils/
  │   │   └── dateFilters.js
  │   │
  │   ├── app.js
  │   └── server.js
  │
  ├── .env
  ├── package.json
  └── README.md

### Database (paper)
3. Paper {
    title: String
    firstAuthor: String
    domain: Enum
    readingStage: Enum
    citationCount: Number
    impactScore: Enum
    dateAdded: Date
  }
## Frontend ↔ Backend Mapping
   1. Frontend → Backend API Mapping
   _________________________________________________________________________
  | Frontend Hook / Component | Backend Endpoint                            |
  | ------------------------  | ------------------------------------------- |
  | `usePapers.js`            | `GET /api/papers`                           |
  | `PaperForm.jsx`           | `POST /api/papers`                          |
  | `FilterSection.jsx`       | Query params → `/api/papers?domain=&stage=` |
  | `useAnalytics.js`         | `GET /api/analytics`                        |
  | `FunnelChart.jsx`         | `analytics.funnel`                          |
  | `ScatterChart.jsx`        | `analytics.scatter`                         |
  | `StackedBarChart.jsx`     | `analytics.stacked`                         |
  | `SummaryCards.jsx`        | `analytics.summary`                         |
  | `DomainCitations.jsx`     | `analytics.avgCitations`                    |
  |___________________________|_____________________________________________|
  ## Paper Management
  - POST /api/papers - Add new paper
  - GET /api/papers - Get all papers (with filters)
  - GET /api/papers/:id - Get single paper
  - PUT /api/papers/:id - Update paper
  - DELETE /api/papers/:id - Delete paper
  - GET /api/papers/stats - Get paper statistics
## Analytics
- GET /api/analytics/funnel - Funnel analytics by reading stage
- GET /api/analytics/scatter - Scatter plot data (impact vs citations)
- GET /api/analytics/stacked - Stacked bar by domain and impact
- GET /api/analytics/summary - Summary dashboard data
- GET /api/analytics/filters - Get available filter options

## Get papers with filters:
- GET /api/papers?search=neural&domain=AI&stage=Reading&page=1&limit=10

## Date Range Filters
- `today` - Current day
- `thisWeek` - Current week
- `thisMonth` - Current month
- `last3Months` - Last 3 months
- `last6Months` - Last 6 months
- `thisYear` - Current year
- `allTime` - All records

## Example Queries
- `GET /api/analytics/funnel?dateFilter=thisMonth`
- `GET /api/analytics/summary?dateFilter=last3Months`
- `GET /api/analytics/scatter?dateFilter=thisYear`

