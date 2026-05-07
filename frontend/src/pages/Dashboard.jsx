import { useEffect, useState } from "react";
import {
  getRoles,
  getJobCount,
  getTopSkills,
  getJobSkills,
  getSkillGap,
} from "../api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const [jobCount, setJobCount] = useState({});
  const [topSkills, setTopSkills] = useState({});
  const [roleSkills, setRoleSkills] = useState({});
  const [skillInput, setSkillInput] = useState("");
  const [gap, setGap] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const r1 = await getRoles();
      const r2 = await getJobCount();
      const r3 = await getTopSkills();

      setRoles(r1.data);
      setJobCount(r2.data);
      setTopSkills(r3.data);

      setLoading(false);
    }

    load();
  }, []);

  useEffect(() => {
    if (!selectedRole) return;

    async function loadRoleSkills() {
      const res = await getJobSkills(selectedRole);
      setRoleSkills(res.data);
    }

    loadRoleSkills();
  }, [selectedRole]);

  async function handleGap() {
    const res = await getSkillGap(skillInput);
    setGap(res.data);
  }

  const chartData = Object.entries(topSkills).map(([k, v]) => ({
    name: k,
    value: v,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading SkillScope Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative z-10 p-6 md:p-10 space-y-8">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              SkillScope Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              Real-time skill and job market insights
            </p>
          </div>
        </div>

        {/* TOP SKILLS */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">
              Top Skills in Demand
            </h2>

            <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-sm border border-cyan-400/20">
              Current week Insights
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
              />

              <YAxis stroke="#9ca3af" />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
                fill="#06b6d4"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* JOB CATEGORIES */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">

          <h2 className="text-2xl font-bold mb-5">
            Job Categories Covered
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">

            {Object.entries(jobCount).map(([k, v]) => (
              <div
                key={k}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:-translate-y-1 transition duration-300"
              >
                <div className="text-lg font-semibold">
                  {k}
                </div>

                <div className="text-3xl font-black mt-3 text-cyan-400">
                  {v}
                </div>

                <div className="text-gray-400 text-sm mt-1">
                  Available Jobs
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* ROLE BASED SKILLS */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-5">

          <div>
            <h2 className="text-2xl font-bold">
              Role-based Skills
            </h2>

            <p className="text-gray-400 mt-1">
              Explore the most demanded skills for each role
            </p>
          </div>

          <select
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-cyan-400"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">
              Select Role
            </option>

            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          {selectedRole && (
            <div className="flex flex-wrap gap-3">

              {Object.entries(roleSkills).map(([k, v]) => (
                <div
                  key={k}
                  className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300"
                >
                  {k}
                </div>
              ))}

            </div>
          )}
        </div>

        {/* SKILL GAP */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-5">

          <div>
            <h2 className="text-2xl font-bold">
              Skill Gap Analysis
            </h2>

            <p className="text-gray-400 mt-1">
              Compare your skills against industry demand
            </p>
          </div>

          <input
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-400"
            placeholder="Example: Python, SQL, React"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />

          <button
            onClick={handleGap}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition duration-300 font-semibold"
          >
            Analyze Skills
          </button>

          {gap && (
            <div className="grid md:grid-cols-2 gap-5">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-lg mb-3 text-cyan-300">
                  Your Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {gap.your_skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-lg mb-3 text-purple-300">
                  Missing Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {gap.missing_skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}