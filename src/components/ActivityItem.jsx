function ActivityItem({type, title, by, cost, status, note}) {
    const typeConfig = {
        change:{
            color:'#6B5010',
            bg:'rgba(110,85,20,0.07)',
            dotColor:'#8A6320',
            label:'Change',
        },
        visit:{
            color:"#2A4270",
            bg:'rgba(40,65,110,0.07)',
            dotColor:'#4A6090',
            label:'Site visit',
        },
    }

    const statusConfig = {
        'in-review':{
            color:'#4A3878',
            bg:'rgba(70,55,110,0.07)',
            border:'rgba(70,55,110,0.12)',
            label:'In review',
        },
        'approved':{
            color:'#1B4332',
            bg:'rgba(27,67,50,0.07)',
            border:'rgba(27,67,50,0.12)',
            label:'Approved',
        },
        'completed':{
            color:'#1B4332',
            bg:'rgba(27,67,50,0.07)',
            border:'rgba(27,67,50,0.12)',
            label:'Completed',
        },
    }

    const t = typeConfig[type]
    const s = statusConfig[status]

    return (
        <div style={{
            display: 'flex',
            gap: '12px',
            padding: '11px 0',
            borderTop: '0.5px solid rgba(0,0,0,0.04)',
            alignItems: 'flex-start',
        }}>
            {/* Icon */}
            <div style={{
                width:'32px',
                height:'32px',
                borderRadius:'8px',
                background:t.bg,
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                
            }}>
                {type === 'change' ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M4 7h6M7 4v6" stroke={t.dotColor} strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="4" stroke={t.dotColor} strokeWidth="1.5"/>
                        <circle cx="7" cy="7" r="1.5" fill={t.dotColor}/>
                    </svg>
                )}
            </div>

            {/* content */}
            <div style={{flex: 1, minHeight: 0}}>
                {/* Type tag + cost */}
                <div style={{
                    display:'flex',
                    alignItems:'center',
                    gap:'6px',
                    marginBottom:'4px',
                    flexWrap:'wrap',
                }}>
                    <span style={{
                        fontSize:'12px',
                        fontWeight:'500',
                        padding:'2px 8px',
                        borderRadius:'20px',
                        color: t.color,
                        background: t.bg,
                        border:`0.5px solid ${t.dotColor}33`,
                        display:'inline-flex',
                        alignItems:'center',
                        gap:'4px',
                    }}>
                        <span style={{
                            width:'4px',
                            height:'4px',
                            borderRadius:'50%',
                            background:t.dotColor
                        }}/> 
                        {t.label}
                    </span>

                    {cost && (
                        <span style={{
                            fontSize:'12px',
                            color:'#6B5010',
                            background:'rgba(110,85,20,0.06)',
                            border:'0.5px solid rgba(110,85,20,0.2)',
                            padding:'2px 7px',
                            borderRadius:'20px'
                        }}>
                            {cost}
                        </span>
                    )}
                </div>

                {/* Title */}
                <div style={{
                    fontSize:'13px',
                    fontWeight:'500',
                    color:'#111',
                    marginBottom:'3px'
                }}>
                </div>

                
                {/* Meta */}
                <div style={{
                    fontSize:'12px',
                    color:'rgba(0,0,0,0.55)',
                    fontWeight:'500',
                    marginBottom:'6px',
                }}>
                    by {by} {note && `· ${note}`}
                </div>

                {/* Status */}
                <div style={{
                    display:'inline-flex',
                    alignItems:'center',
                    gap:'4px',
                    fontSize:'11px',
                    padding:'2px 8px',
                    borderRadius:'20px',
                    color:s.color,
                    background:s.bg,
                    border:`0.5px solid ${s.border}`,
                }}>
                    <span style={{
                        width:'4px',
                        height:'4px',
                        borderRadius:'50%',
                        background:s.color,
                    }}/>
                    {s.label}
                </div>
            </div>

        </div>
    )

}

export default ActivityItem