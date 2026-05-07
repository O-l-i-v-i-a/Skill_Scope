from fastapi import FastAPI
from supabase import create_client
from collections import Counter
from dotenv import load_dotenv
import os

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://skill-scope.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ----------------------
# HOME
# ----------------------
@app.get("/")
def home():
    return {"status": "API running"}

# ----------------------
# JOB COUNT (FIXED)
# ----------------------
@app.get("/job-count")
def job_count():
    try:
        res = supabase.table("jobs").select("normalized_title").execute()

        titles = [
            r.get("normalized_title")
            for r in res.data
            if r.get("normalized_title")
        ]

        return dict(Counter(titles))

    except Exception as e:
        return {"error": str(e)}

# ----------------------
# TOP SKILLS (ROBUST ARRAY HANDLING)
# ----------------------
@app.get("/top-skills")
def top_skills():
    try:
        res = supabase.table("jobs").select("skills").execute()

        skills = []

        for row in res.data:
            s = row.get("skills")

            # handle list (correct case)
            if isinstance(s, list):
                skills.extend(s)

            # handle old string format (fallback safety)
            elif isinstance(s, str):
                skills.extend([x.strip() for x in s.split(",") if x.strip()])

        return dict(Counter(skills).most_common(5))

    except Exception as e:
        return {"error": str(e)}


@app.get("/roles")
def get_roles():
    try:
        res = supabase.table("jobs").select("normalized_title").execute()

        roles = set()

        for row in res.data:
            if row.get("normalized_title"):
                roles.add(row["normalized_title"])

        return sorted(list(roles))

    except Exception as e:
        return {"error": str(e)}
    

# ----------------------
# JOB SKILLS BY ROLE (FIXED LOGIC)
# ----------------------
@app.get("/job-skills")
def job_skills(role: str):
    try:
        res = supabase.table("jobs") \
            .select("skills") \
            .eq("normalized_title", role) \
            .execute()

        skills = []

        for row in res.data:
            if isinstance(row.get("skills"), list):
                skills.extend(row["skills"])

        return dict(Counter(skills))

    except Exception as e:
        return {"error": str(e)}

# ----------------------
# SKILL GAP (FIXED + CLEAN)
# ----------------------
@app.get("/skill-gap")
def skill_gap(user_skills: str):
    try:
        user = set([s.strip().lower() for s in user_skills.split(",") if s.strip()])

        res = supabase.table("jobs").select("skills").execute()

        all_skills = []

        for row in res.data:
            s = row.get("skills")

            if isinstance(s, list):
                all_skills.extend([x.lower() for x in s])

        top = set([k for k, _ in Counter(all_skills).most_common(5)])

        missing = list(top - user)

        return {
            "your_skills": list(user),
            "missing_skills": missing
        }

    except Exception as e:
        return {"error": str(e)}