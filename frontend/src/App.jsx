import { BrowserRouter, Routes, Route } from "react-router-dom";

import SkillScopeLanding from "./pages/SkillScopeLanding";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SkillScopeLanding />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;