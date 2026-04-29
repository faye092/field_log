import { useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import ProjectHeader from '../components/ProjectHeader'
import NextAction from '../components/NextAction'
import Timeline from '../components/Timeline'
import ActivityFeed from '../components/ActivityFeed'
import GenerateReport from '../components/GenerateReport'

const projectsData = {
  'Schwabing West Renovation': {
    name: 'Schwabing West Renovation',
    location: 'Munich',
    startDate: 'Jan 2026',
    duration: 20,
    currentWeek: 12,
    status: 'cost-risk',
    currentPhase: 'MEP Installation',
    nextAction: 'Review cost change · kitchen plumbing conflict with contractor',
    activities: [
      {
        week: 12,
        type: 'change',
        title: 'Kitchen plumbing conflict',
        by: 'Contractor',
        cost: '+€2,000',
        status: 'in-review',
        note: null,
      },
      {
        week: 11,
        type: 'visit',
        title: 'Inspection completed',
        by: 'Architect',
        cost: null,
        status: 'completed',
        note: 'minor alignment issue noted',
      },
      {
        week: 10,
        type: 'change',
        title: 'Handrail colour change',
        by: 'Architect',
        cost: null,
        status: 'approved',
        note: 'no cost impact',
      },
      {
        week: 9,
        type: 'visit',
        title: 'Routine check',
        by: 'Architect',
        cost: null,
        status: 'completed',
        note: 'no issues found',
      },
    ],
  },
  'Neumann Office Fit-out': {
    name: 'Neumann Office Fit-out',
    location: 'Munich',
    startDate: 'Mar 2026',
    duration: 20,
    currentWeek: 6,
    status: 'on-track',
    currentPhase: 'Structure',
    nextAction: 'Schedule next site visit for Week 7',
    activities: [
      {
        week: 5,
        type: 'visit',
        title: 'Routine check',
        by: 'Architect',
        cost: null,
        status: 'completed',
        note: 'no issues found',
      },
    ],
  },
  'Giesing Residential Block': {
    name: 'Giesing Residential Block',
    location: 'Munich',
    startDate: 'Nov 2025',
    duration: 20,
    currentWeek: 18,
    status: 'in-review',
    currentPhase: 'Finishing',
    nextAction: 'Review floor material cost change with client',
    activities: [
      {
        week: 17,
        type: 'visit',
        title: 'Inspection completed',
        by: 'Architect',
        cost: null,
        status: 'completed',
        note: null,
      },
      {
        week: 17,
        type: 'change',
        title: 'Floor material upgrade',
        by: 'Client',
        cost: '+€5,000',
        status: 'in-review',
        note: null,
      },
      {
        week: 15,
        type: 'change',
        title: 'Window spec change',
        by: 'Architect',
        cost: null,
        status: 'approved',
        note: 'no cost impact',
      },
    ],
  },
}

function ProjectDetail() {
  const { id } = useParams()
  const project = projectsData[decodeURIComponent(id)]

  if (!project) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <TopBar />
        <div style={{
          padding: '40px 24px',
          textAlign: 'center',
          color: 'rgba(0,0,0,0.4)',
        }}>
          Project not found
        </div>
      </div>
    )
  }

  const changes = project.activities.filter(a => a.type === 'change')

  return (
    <div style={{ minHeight: '100vh' }}>
      <TopBar backTo="/" backLabel="Dashboard" />
      <div style={{
        padding: '20px 24px',
        background: 'linear-gradient(180deg, #EEF1EC 0%, #F4F6F2 60px)',
        minHeight: 'calc(100vh - 60px)',
      }}>

        {/* Project Info */}
        <div style={{
          background: 'rgba(255,255,255,0.82)',
          borderRadius: '14px',
          border: '0.5px solid rgba(0,0,0,0.07)',
          padding: '18px 22px',
          marginBottom: '12px',
        }}>
          <div style={{ marginBottom: '14px' }}>
            <ProjectHeader
              name={project.name}
              location={project.location}
              startDate={project.startDate}
              duration={project.duration}
              status={project.status}
              currentPhase={project.currentPhase}
              showNewVisitButton={true}
            />
          </div>
          <NextAction text={project.nextAction} />
        </div>

        {/* Timeline */}
        <div style={{
          background: 'rgba(255,255,255,0.82)',
          borderRadius: '14px',
          border: '0.5px solid rgba(0,0,0,0.07)',
          padding: '22px 24px 26px',
          marginBottom: '12px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4px',
          }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '500',
              color: '#111',
            }}>
              Project timeline
            </div>
            <div style={{
              background: '#8A6320',
              color: '#fff',
              fontSize: '11px',
              fontWeight: '500',
              padding: '4px 12px',
              borderRadius: '20px',
            }}>
              Week {project.currentWeek} of {project.duration}
            </div>
          </div>
          <Timeline
            currentWeek={project.currentWeek}
            totalWeeks={project.duration}
            currentPhase={project.currentPhase}
          />
        </div>

        {/* Activity Feed */}
        <div style={{ marginBottom: '12px' }}>
          <ActivityFeed activities={project.activities} />
        </div>

        {/* Generate Site Report */}
        <GenerateReport
          changes={changes}
          projectName={project.name}
        />

      </div>
    </div>
  )
}

export default ProjectDetail