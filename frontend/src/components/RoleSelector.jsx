import { useEffect, useState } from "react";
import { getRoles, getRoleSkills } from "../api";

export default function RoleSelector() {
  const [roles, setRoles] = useState([]);
  const [selected, setSelected] = useState("");
  const [skills, setSkills] = useState({});

  useEffect(() => {
    getRoles().then((res) => setRoles(res.data));
  }, []);

  const handleChange = async (role) => {
    setSelected(role);
    const res = await getRoleSkills(role);
    setSkills(res.data);
  };

  return (
    <div>
      <select onChange={(e) => handleChange(e.target.value)}>
        <option>Select Role</option>
        {roles.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>

      <ul>
        {Object.entries(skills).map(([skill, count]) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}