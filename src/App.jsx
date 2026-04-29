import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import NewSiteVisit from "./pages/NewSiteVisit";
import ProjectDetail from "./pages/ProjectDetail";
import ReportPreview from "./pages/ReportPreview";

function ScrollToTop(){
  const {pathname} = useLocation()
  useEffect(() => {
    window.scrollTo(0,0)
  },[pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/project/:id" element={<ProjectDetail />}/>
          <Route path="/new-site-visit" element={<NewSiteVisit />}/>
          <Route path="/projects" element={<div>Projects Page</div>}/>
          <Route path="/reports" element={<div>Reports Page</div>}/>
          <Route path="/report/:id" element={<ReportPreview />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App