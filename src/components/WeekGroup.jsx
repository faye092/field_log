import ActivityItem from "./ActivityItem";

function WeekGroup({week, activities, isCurrentWeek}) {
    return (
        <div>
            {/* Week header */}
            <div style={{
                display:'flex',
                alignItems:'center',
                gap:'12px',
                padding:'14px 0 8px',
            }}>
                <div style={{
                    fontSize:'14px',
                    color:'rgba(0,0,0,0.55)',
                    fontWeight:'500',
                    whiteSpace:'nowrap',
                }}>
                    Week {week}
                </div>

                {/* Current badge */}
                {isCurrentWeek && (
                    <div style={{
                        fontSize:'12px',
                        color:'#8A6320',
                        background:'rgba(138,99,32,0.08)',
                        border:'0.5px solid rgba(138,99,32,0.15)',
                        padding:'1px 7px',
                        borderRadius:'20px',
                        whiteSpace:'nowrap',
                    }}>
                        Current
                    </div>
                )}

                {/* cut line */}
                <div style={{
                    flex:1,
                    height:'0.5px',
                    background:'rgba(0,0,0,0.1)'
                }}/>
            </div>
            {/* week activity */}
            {activities.map((activity, index) => (
                <ActivityItem 
                  key={index}
                  type={activity.type}
                  title={activity.title}
                  by={activity.by}
                  cost={activity.cost}
                  status={activity.status}
                  note={activity.note}
                />
            ))}
        </div>
    )
}

export default WeekGroup