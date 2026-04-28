import { useNavigate } from "react-router-dom"

function ProjectHeader({ name, location, startDate, duration, status, currentPhase, showNewVisitButton}) {
    const navigate = useNavigate()
    // according status to decide the color and text of badge
    const statusConfig = {
        'cost-risk':{label:'Cost risk', color:'#7A2828', bg:'rgba(120,40,40,0.07)', border:'rgba(120,40,40,0.14)'},
        'on-track':{label:'On track', color:'#1B4332', bg:'rgba(27,67,50,0.07)', border:'rgba(27,67,50,0.14)'},
        'in-review':{label:'In review', color:'#4A3878', bg:'rgba(70,55,110,0.07)', border:'rgba(70,55,110,0.14)'},
    }

    const currentStatus = statusConfig[status]

    return(
      <div>
        <div style={{
            padding:'14px 20px 12px',
            display:'flex',
            alignItems:'flex-start',
            justifyContent:'space-between',
            borderBottom:'0.5px solid rgba(0,0,0,0.05)',
            marginBottom: currentPhase ? '0' : '0',
        }}>
            <div>
                <div style={{fontSize:'18px', fontWeight:'500',color:'#111', marginBottom:'4px'}}>
                    {name}
                </div>
                <div style={{fontSize:'12px',fontWeight:'500',color:'(0,0,0,0.35)'}}>
                    {location} · {startDate} · {duration} weeks
                </div>
            </div>
            {/* status badge + phase badge */}
            <div style={{
                display:'flex',
                gap:'8px',
                alignItems:'center',
                flexShrink:0,
                marginLeft:'16px',
            }}>
                {/* Status badge */}
                <div style={{
                    fontSize:'12px',
                    fontWeight:'500',
                    padding:'3px 10px',
                    borderRadius:'20px',
                    color:currentStatus.color,
                    background:currentStatus.bg,
                    border:`0.5px solid ${currentStatus.border}`,
                }}>
                    {currentStatus.label}
                </div>

                {/* currentPhase */}
                {currentPhase && (
                    <div style={{
                        display:'flex',alignItems:'center',gap:'6px',
                        background:'#1B4332', color:'#6EE7B7',
                        fontSize:'12px', fontWeight:'500',
                        padding:'4px 10px', borderRadius:'20px',
                    }}>
                    <div style={{width:'5px', height:'5px', borderRadius:'50%', background:'#6EE7B7'}} />
                    {currentPhase}
                </div>
                )}
            </div>
        </div>

        {/* New site visit */}
        {showNewVisitButton && (
            <div style={{
                display:'flex',
                justifyContent:'flex-end',
                marginTop:'12px',
            }}>
                <button
                  onClick={() => navigate(`/new-site-visit?project=${encodeURIComponent(name)}`)}
                  style={{
                    display:'flex',
                    alignItems:'center',
                    gap:'6px',
                    background:'#1B4332',
                    color:'#fff',
                    fontSize:'14px',
                    fontWeight:'500',
                    padding:'7px 14px',
                    borderRadius:'20px',
                    border:'none',
                    cursor:'pointer'
                  }}
                >
                    + New site visit
                </button>
            </div>
        )}
      </div>
    )
}

export default ProjectHeader