import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewChange from "./pages/NewChange";
import NewSiteVisit from "./pages/NewSiteVisit";
import ProjectDetail from "./pages/ProjectDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/project/:id" element={<ProjectDetail />}/>
        <Route path="/new-site-visit" element={<NewSiteVisit />}/>
        <Route path="/new-change" element={<NewChange />}/>
        <Route path="/projects" element={<div>Projects Page</div>}/>
        <Route path="/reports" element={<div>Reports Page</div>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App