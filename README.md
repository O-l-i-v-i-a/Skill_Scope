# SkillScope - Job Market Skill Gap Analyzer

## Overview

SkillScope is a full-stack web application that helps users analyze the skills required for different job roles based on current job postings. Users can compare their existing skills with industry requirements to identify skill gaps and understand which technologies are most in demand.

The application periodically collects job listings, extracts relevant technical skills, stores them in a Supabase database, and provides interactive insights through a React frontend and FastAPI backend.

---

## Features

- 🔍 Search and explore different job roles
- 📊 View the most in-demand technical skills
- 💼 Display job counts for different roles
- 🧩 Analyze skill gaps based on user input
- 📋 View skills required for a selected job role
- 🔄 Automated weekly job data updates using GitHub Actions
- ☁️ Cloud deployment with Vercel and Render

---

## Tech Stack

### Frontend
- React
- Axios
- HTML
- CSS
- JavaScript

### Backend
- FastAPI
- Python

### Database
- Supabase (PostgreSQL)

### Job Data Collection
- SerpAPI
- GitHub Actions

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## Project Structure

```
SkillScope/
│
├── backend/
│   ├── main.py
│   ├── scrapper.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── .github/
    └── workflows/
        └── scraper.yml
```

---

## How It Works

1. GitHub Actions automatically runs the scraper every week.
2. The scraper fetches job listings using SerpAPI.
3. Technical skills are extracted from job descriptions.
4. Job and skill data are stored in Supabase.
5. FastAPI exposes REST APIs.
6. React consumes the APIs and displays analytics to users.

---

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/roles` | Get available job roles |
| `/job-count` | Get job count statistics |
| `/top-skills` | Get the most frequently required skills |
| `/job-skills?role=` | Get required skills for a selected role |
| `/skill-gap?user_skills=` | Get missing skills based on user input |

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/<your-username>/SkillScope.git
cd SkillScope
```

### Backend

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux/macOS
source .venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

### Backend (.env)

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
SERPAPI_API_KEY=your_serpapi_key
```

### Frontend (.env)

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Deployment

### Backend (Render)

Build Command

```bash
pip install -r requirements.txt
```

Start Command

```bash
gunicorn main:app -k uvicorn.workers.UvicornWorker
```

### Frontend (Vercel)

- Import the React project
- Add the `VITE_API_URL` environment variable
- Deploy

---

## Automated Weekly Scraping

The scraper is executed automatically every week using GitHub Actions.

Workflow location:

```
.github/workflows/scraper.yml
```

---

## Future Enhancements

- User authentication
- Resume upload and analysis
- Skill trend visualization
- Learning resource recommendations
- Salary insights
- Interactive dashboard improvements

---
