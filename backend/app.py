from fastapi import FastAPI
import pandas as pd

app=FastAPI()

df=pd.read_csv("data.csv")

@app.get("/")
def home():
    return {"status": "API running"}

@app.get("/top-skills")
def top_skills():
    skills = df['skills'].str.split(',').explode()
    top = skills.value_counts().head(5)
    return top.to_dict()

@app.get("/skill-gap")
def skill_gap(user_skills: str):

    user = set(user_skills.lower().split(','))

    skills = df['skills'].str.lower().str.replace(" ", "").str.split(',').explode()
    top = set(skills.value_counts().head(5).index)

    missing = list(top - user)

    return {
        "your_skills": list(user),
        "missing_skills": missing
    }

@app.get("/job-count")
def job_count():
    return df['title'].value_counts().to_dict()

@app.get("/job-skills")
def job_skills(role: str):
    filtered = df[df['title'].str.lower() == role.lower()]

    skills = filtered['skills'].str.split(',').explode()
    return skills.value_counts().to_dict()