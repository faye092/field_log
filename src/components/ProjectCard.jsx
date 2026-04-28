import { useNavigate } from "react-router-dom";
import ProjectHeader from "./ProjectHeader";
import Timeline from "./Timeline";
import ActivityStrip from "./ActivityStrip";

function ProjectCard({ name, location, startDate, duration, currentWeek, status, currentPhase, activities}) {
  const navigate = useNavigate()

  return (
        <div 
          onClick={() => navigate(`/project/${name}`)}
          style={{
            background:'rgba(255,255,255,0.82)',
            borderRadius:'14px',
            border:'0.5px solid rgba(0,0,0,0.07)',
            marginBottom:'10px',
            overflow:'hidden',
            cursor:'pointer',
            transition:'box-shadow 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.22)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
          <ProjectHeader 
            name={name}
            location={location}
            startDate={startDate}
            duration={duration}
            status={status}
          />
          <div style={{padding:'14px 20px 12px', borderBottom:'0.5px solid rgba(0,0,0,0.05)'}}>
            <div style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between',
                marginBottom:'4px',
            }}>
              <div style={{fontSize:'12px', fontWeight:'500',letterSpacing:'0.06em',color:'rgba(0,0,0,0.32)'}}>PROGRESS</div>
              <div style={{
                display:'flex',alignItems:'center',gap:'6px',
                background:'#1B4332', color:'#6EE7B7',
                fontSize:'11px', fontWeight:'500',
                padding:'4px 10px', borderRadius:'20px',
              }}>
                <div style={{width:'5px', height:'5px', borderRadius:'50%', background:'#6EE7B7'}} />
                {currentPhase}
              </div>
            </div>
            <Timeline 
                currentWeek={currentWeek}
                totalWeeks={duration}
                currentPhase={currentPhase}
            />
          </div>
          <ActivityStrip activities={activities}/>
        </div>
    )
}

export default ProjectCard