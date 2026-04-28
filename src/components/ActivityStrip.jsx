function ActivityStrip({ activities }){
    return (
        <div style={{padding:'10px 20px 14px'}}>
            <div style={{
                fontSize:'12px',
                fontWeight:'500',
                color:'rgba(0,0,0,0.32)',
                letterSpacing:'0.06em',
                textTransform:'uppercase',
                marginBottom:'8px'
            }}>
                RECENT ACTIVITY
            </div>
            <div style={{display:'flex', flexWrap:'wrap', gap:'6px'}}>
                {activities.map((activity, index) => (
                    <span key={index} style={{
                        display:'flex',
                        alignItems:'center',
                        gap:'5px',
                        fontSize:'11px',
                        fontWeight:'500',
                        padding:'4px 10px',
                        borderRadius:'20px',
                        color:activity.type === 'visit'
                          ? '#2A4270'
                          : activity.type === 'cost'
                          ? '#6B5010'
                          : 'rgba(0,0,0,0.42)',
                        background:activity.type === 'visit'
                          ? 'rgba(40,65,110,0.06)'
                          : activity.type === 'cost'
                          ? 'rgba(110,85,20,0.06)'
                          : 'rgba(0,0,0,0.03)',
                        border:`0.5px solid ${
                            activity.type === 'visit'
                            ? 'rgba(40,65,110,0.12)'
                            : activity.type === 'cost'
                            ? 'rgba(110,85,20,0.12)'
                            : 'rgba(0,0,0,0.07)'
                        }`
                    }}>
                        <span style={{
                            width:'5px',
                            height:'5px',
                            borderRadius:'50%',
                            flexShrink:0,
                            background: activity.type === 'visit'
                              ? '#4A6090'
                              : activity.type === 'cost'
                              ? '#8A6320'
                              : 'rgba(0,0,0,0.22)'
                        }}/>
                        {activity.label}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default ActivityStrip