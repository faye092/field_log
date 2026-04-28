import TopBar from "../components/TopBar"
import KpiCard from "../components/KpiCards"
import ProjectCard from "../components/ProjectCard"

const kpiData = [
  {label:'Active projects', value:'4', sub:'all running', color:'#3A6152'},
  {label:'Open changes', value:'7', sub:'2 awaiting review', color:'#8A6320'},
  {label:'Site visits', value:'3', sub:'this month', color:'#3A5070'},
  {label:'Cost alerts', value:'2', sub:'action needed', color:'#7A3030'},
]

const projectsData = [
  {
    name: 'Schwabing West Renovation',
    location: 'Munich',
    startDate: 'Jan 2026',
    duration: 20,
    currentWeek: 12,
    status: 'cost-risk',
    currentPhase: 'MEP Installation',
    activities: [
      { type: 'visit', label: 'Site visit · W11' },
      { type: 'cost', label: 'Cost change · Kitchen +€2k' },
      { type: 'design', label: 'Design change · Handrail' },
    ],
  },
  {
    name: 'Neumann Office Fit-out',
    location: 'Munich',
    startDate: 'Mar 2026',
    duration: 20,
    currentWeek: 6,
    status: 'on-track',
    currentPhase: 'Structure',
    activities: [
      { type: 'visit', label: 'Site visit · W5' },
      { type: 'none', label: 'No open changes' },
    ],
  },
  {
    name: 'Giesing Residential Block',
    location: 'Munich',
    startDate: 'Nov 2025',
    duration: 20,
    currentWeek: 18,
    status: 'in-review',
    currentPhase: 'Finishing',
    activities: [
      { type: 'visit', label: 'Site visit · W17' },
      { type: 'cost', label: 'Cost change · Floor +€5k' },
      { type: 'design', label: 'Design change · Window spec' },
    ],
  },
]

function Dashboard() {
    return (
      <div style={{minHeight:'100vh'}}>
        <TopBar />
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(180deg, #EEF1EC 0%, #F4F6F2 60px)',
          minHeight: 'calc(100vh - 60px)',
          }}>

            {/* KPI Cards */}
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(4, 1fr)',
              gap:'10px',
              marginBottom:'20px'
            }}>
              {kpiData.map((kpi) => (
                <KpiCard 
                  key={kpi.label}
                  label={kpi.label}
                  value={kpi.value}
                  sub={kpi.sub}
                  color={kpi.color}
                />
              ))}
            </div>
            
            {/* Section label */}
            <div style={{
              fontSize:'14px',
              fontWeight:'500',
              color:'rgba(0,0,0,0.32)',
              letterSpacing:'0.07em',
              textTransform:'uppercase',
              marginBottom:'12px',
            }}>
              Projects
            </div>

            {/* Project Cards */}
            {projectsData.map((project) => (
              <ProjectCard 
                key={project.name}
                {...project}
              />
            ))}
        </div>
      </div>
    )
}

export default Dashboard