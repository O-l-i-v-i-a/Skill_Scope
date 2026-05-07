import { useEffect, useState } from "react";
import { getTopSkills } from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function TopSkillsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTopSkills().then((res) => {
      const formatted = Object.entries(res.data).map(([k, v]) => ({
        skill: k,
        count: v,
      }));
      setData(formatted);
    });
  }, []);

  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="skill" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#4f46e5" />
    </BarChart>
  );
}