import axios from "axios";

const API = "http://localhost:8000";

export const getRoles = () => axios.get(`${API}/roles`);
export const getJobCount = () => axios.get(`${API}/job-count`);
export const getTopSkills = () => axios.get(`${API}/top-skills`);
export const getJobSkills = (role) =>
  axios.get(`${API}/job-skills?role=${encodeURIComponent(role)}`);

export const getSkillGap = (skills) =>
  axios.get(`${API}/skill-gap?user_skills=${encodeURIComponent(skills)}`);