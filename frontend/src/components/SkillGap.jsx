import { useState } from "react";
import { getSkillGap } from "../api";

export default function SkillGap() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const analyze = async () => {
    const res = await getSkillGap(input);
    setResult(res.data);
  };

  return (
    <div>
      <input
        placeholder="Enter skills (comma separated)"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={analyze}>Analyze</button>

      {result && (
        <div>
          <h4>Missing Skills:</h4>
          <ul>
            {result.missing_skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}