import requests
import time
import os
import re
from supabase import create_client
from dotenv import load_dotenv
load_dotenv()

print("Python:", os.sys.version)
print("SERPAPI key exists:", bool(os.getenv("SERPAPI_KEY")))
print("SUPABASE_URL exists:", bool(os.getenv("SUPABASE_URL")))


SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


SKILL_MAP = {
    "Python": [r"\bpython\b"],
    "Java": [r"\bjava\b(?!script)"],
    "JavaScript": [r"\bjavascript\b|\bjs\b"],
    "TypeScript": [r"\btypescript\b"],
    "SQL": [r"\bsql\b"],
    "PostgreSQL": [r"\bpostgresql\b|\bpostgres\b"],
    "AWS": [r"\baws\b"],
    "Azure": [r"\bazure\b"],
    "Docker": [r"\bdocker\b"],
    "Kubernetes": [r"\bkubernetes\b|\bk8s\b"],
    "Git": [r"\bgit\b"],
    "React": [r"\breact\b"],
    "Angular": [r"\bangular\b"],
    "Node.js": [r"\bnode\.?js\b|\bnode\b"],
}


def extract_skills_rule(text: str):
    text = text.lower()
    found = set()

    for skill, patterns in SKILL_MAP.items():
        for pattern in patterns:
            if re.search(pattern, text):
                found.add(skill)

    return list(found)


def extract_skills(text: str):
    skills = extract_skills_rule(text)

    cleaned = set()
    for s in skills:
        s = s.strip().title()
        if len(s) > 2:
            cleaned.add(s)

    return list(cleaned)


def normalize_job_title(title: str):
    t = title.lower()

    
    if "software engineer" in t:
        if "principal" in t:
            return "Software Engineer (Principal)"
        if "lead" in t:
            return "Software Engineer (Lead)"
        if "senior" in t or "sr" in t:
            return "Software Engineer (Senior)"
        return "Software Engineer"

    if "data scientist" in t or "data science" in t or "analytics" in t:
        return "Data Scientist"

    if "devops" in t:
        return "DevOps Engineer"

    if "cloud" in t:
        return "Cloud Engineer"

    if "machine learning" in t or "ai" in t or "ml" in t:
        return "ML/AI Engineer"

    if "frontend" in t or "front end" in t:
        return "Frontend Developer"

    if "backend" in t:
        return "Backend Developer"

    if "full stack" in t:
        return "Full Stack Developer"

    return "Other"


def clean_skills(skills):
    stopwords = {"experience", "work", "job", "team", "company", "role"}
    return [s for s in skills if s.lower() not in stopwords]


def fetch_jobs(query):
    url = "https://serpapi.com/search"
    params = {
        "engine": "google_jobs",
        "q": query,
        "hl": "en",
        "gl": "us",
        "api_key": os.getenv("SERPAPI_KEY")
    }

    res = requests.get(url, params=params).json()

    return res.get("jobs_results", [])


def process_job(job):
    title = job.get("title", "")
    desc = job.get("description", "")
    company = job.get("company_name", "")

    skills = extract_skills(desc)
    skills = clean_skills(skills)

    return {
        "title": title,
        "company": company,
        "normalized_title": normalize_job_title(title),
        "skills": skills
    }


def save_to_db(rows):
    if not rows:
        return

    supabase.table("jobs").upsert(
        rows,
        on_conflict="title,company"
    ).execute()


def run_scraper(query):
    print(f"\n🔍 Scraping: {query}")

    jobs = fetch_jobs(query)

    print(f"Jobs fetched: {len(jobs)}")

    processed = []

    for job in jobs:
        if not job.get("description"):
            continue

        data = process_job(job)

        print(f"➡️ {data['title']} → {data['normalized_title']}")

        processed.append(data)

    save_to_db(processed)

    print(f"💾 Saved {len(processed)} jobs")



if __name__ == "__main__":

    queries = [
        "Software Engineer jobs",
        "Data Science jobs",
        "Cloud DevOps jobs",
        "AI ML jobs",
        "Web Development jobs"
    ]

    for q in queries:
        run_scraper(q)
        time.sleep(5)
